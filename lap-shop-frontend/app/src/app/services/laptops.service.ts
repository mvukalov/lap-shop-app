import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

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
  private apiUrl = `${environment.apiUrl}/api/laptops`;

  constructor(private http: HttpClient) {}

  getLaptops(): Observable<Laptop[]> {
    return this.http.get<Laptop[]>(this.apiUrl);
  }
}
