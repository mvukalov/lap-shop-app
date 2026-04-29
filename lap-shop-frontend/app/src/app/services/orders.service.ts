import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface ShopOrder {
  id: number;
  customerFirstName: string;
  customerLastName: string;
  customerAddress: string;
  totalPrice: number;
  laptop: {
    id: number;
    brand: string;
    model: string;
    price: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<ShopOrder[]> {
    return this.http.get<ShopOrder[]>(this.apiUrl);
  }

  createOrder(order: {
    customerFirstName: string;
    customerLastName: string;
    customerAddress: string;
    totalPrice: number;
    laptopId: number;
  }): Observable<ShopOrder> {
    return this.http.post<ShopOrder>(this.apiUrl, order);
  }

  updateOrder(
    id: number,
    payload: {
      customerFirstName: string;
      customerLastName: string;
      customerAddress: string;
      totalPrice: number;
      laptopId: number | null;
    },
  ): Observable<ShopOrder> {
    return this.http.put<ShopOrder>(`${this.apiUrl}/${id}`, payload);
  }
}
