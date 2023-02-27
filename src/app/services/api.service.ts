import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = 'https://fakestoreapi.com'

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.url}/products/categories`)
  }

  getProducts(amount: number, category: string = ''): Observable<Product[]> {
    console.log(category[0]?.length)
    return this.http.get<Product[]>(`https://fakestoreapi.com/products${category[0]?.length ? '/category/' + category : ''}?limit=${amount}`)
  }
}
