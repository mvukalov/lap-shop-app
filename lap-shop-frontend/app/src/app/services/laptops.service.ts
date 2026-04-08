import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Laptop {
  id: number;
  brand: string;
  model: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class LaptopsService {
  private apiUrl = 'http://localhost:8080/api/laptops';

  constructor(private http: HttpClient) {}

  getLaptops(): Observable<Laptop[]> {
    return this.http.get<Laptop[]>(this.apiUrl);
  }
}
