import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://world.openfoodfacts.org/cgi/search.pl';
  private api_v2 = 'https://world.openfoodfacts.org/api/v2';

  constructor(private http: HttpClient) { }

  products(data: any): Observable<MyResponse> {
    let keyword = data.keyword
    let country = data.country
    let page = data.page
    let page_size = data.page_size
    let params = new HttpParams();
    params = params.set('search_terms', keyword);
    params = params.set('page', page);
    params = params.set('countries_tags', country);
    params = params.set('page_size', page_size);
    params = params.set('sort_by', 'nutriscore_score');
    params = params.set('json', 1);

    return this.http.get<MyResponse>(this.apiUrl, { params: params });
  }


  product(data: any){
    return this.http.get<any>(this.api_v2 + '/product/' + data.barcode_id);
  }

}

interface MyResponse {
  code:  any[];
  products: any[]; // Change 'any' to the actual type of your products array
}