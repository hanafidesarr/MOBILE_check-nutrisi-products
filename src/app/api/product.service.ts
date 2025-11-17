import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://world.openfoodfacts.org/cgi/search.pl';
  private api_v2 = 'https://world.openfoodfacts.org/api/v2';
  private myBackend = 'https://nutricheck-backend.fly.dev';

  private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage) {}

  // Init storage → jangan di constructor langsung
  async initStorage() {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
  }

  // =================================================
  // Search product
  // =================================================
  products(data: any) {
    let params = new HttpParams()
      .set('search_terms', data.keyword)
      .set('fields', 'code,product_name,quantity,brands,nutriscore_grade,ecoscore_grade,image_small_url,countries,countries_tags,manufacturing_places,origins')
      .set('page', data.page)
      .set('countries_tags', data.country || '')
      .set('page_size', data.page_size)
      .set('sort_by', 'last_modified_t')
      .set('json', '1');

    return this.http.get<MyResponse>(this.apiUrl, { params });
  }

  products_count() {
    let params = new HttpParams();
    params = params.set('search_terms', '');
    params = params.set('fields', 'code');
    params = params.set('page', 1);
    params = params.set('page_size', '');
    params = params.set('json', 1);

    return this.http.get<MyResponse>(this.apiUrl, { params: params });
  }

  product(data: any){
    return this.http.get<any>(this.api_v2 + '/product/' + data.barcode_id);
  }
  // =================================================
  // Add product
  // =================================================
  async addProduct(data: { code: string, product_name: string, brands: string, lang?: string }): Promise<any> {
    await this.initStorage();
    try {
      const res: any = await this.http.post<any>(`${this.myBackend}/add_product`, data).toPromise();
      const products = (await this._storage?.get('my_products')) || [];
      products.push({ ...data, synced: res.status === 1 });
      await this._storage?.set('my_products', products);
      return res;
    } catch (error) {
      const products = (await this._storage?.get('my_products')) || [];
      products.push({ ...data, synced: false });
      await this._storage?.set('my_products', products);
      throw error;
    }
  }

  async getLocalProducts(): Promise<LocalProduct[]> {
    await this.initStorage();
    return (await this._storage?.get('my_products')) || [];
  }
  

  async editProduct(data: { code: string, product_name?: string, brands?: string, lang?: string }): Promise<any> {
    await this.initStorage();

    // Hanya buat payload untuk backend, jangan include synced
    const payload = {
      product: {
        code: data.code,
        product_name: data.product_name,
        brands: data.brands,
        lang: data.lang || 'en'
      }
    };

    const res: any = await this.http.post<any>(`${this.myBackend}/edit_product`, payload).toPromise();

    // update lokal storage
    const products = (await this._storage?.get('my_products')) || [];
    const index = (products as LocalProduct[]).findIndex(p => p.code === data.code);

    if (index >= 0) {
      products[index] = { ...products[index], ...data, synced: res.status === '200' }; // cek res.status string dari Rails
      await this._storage?.set('my_products', products);
    }

    return res;
  }

  async updateLocalProduct(data: LocalProduct): Promise<void> {
    await this.initStorage();
    const products = (await this._storage?.get('my_products')) || [];
    const index = (products as LocalProduct[]).findIndex(p => p.code === data.code);

    if (index >= 0) {
      products[index] = { ...products[index], ...data };
    } else {
      products.push({ ...data, synced: false });
    }

    await this._storage?.set('my_products', products);
  }



  // product.service.ts
  async deleteLocalProduct(code: string): Promise<void> {
    await this.initStorage();
    const products = (await this._storage?.get('my_products')) || [];
    const index = (products as any[]).findIndex(p => p.code === code);

    if (index >= 0) {
      // soft delete: tandai sebagai deleted
      products[index].deleted = true;

      // update storage
      await this._storage?.set('my_products', products);
    }
  }

}

export interface LocalProduct {
  code: string;
  product_name: string;
  brands: string;
  lang?: string;
  synced: boolean;
}

export interface MyResponse {
  count?: number;
  code?: any[];
  products?: any[];
}
