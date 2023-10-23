import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://world.openfoodfacts.org/cgi/search.pl';
  constructor(private http: HttpClient) { }

  fetchData(data: any): Observable<MyResponse> {
    let x = data.brands_tags.name
    let country = data.brands_tags.country
    let page = data.page
    let params = new HttpParams();
    params = params.set('search_terms', x);
    params = params.set('page', page);
    params = params.set('countries_tags', country);
    params = params.set('json', 1);

    return this.http.get<MyResponse>(this.apiUrl, { params: params });
  }
}

interface MyResponse {
  products: any[]; // Change 'any' to the actual type of your products array
}