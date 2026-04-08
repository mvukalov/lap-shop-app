import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LaptopsService, Laptop } from './services/laptops.service';
import { OrdersService, ShopOrder } from './services/orders.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private laptopsService = inject(LaptopsService);
  private ordersService = inject(OrdersService);

  laptops: Laptop[] = [];
  orders: ShopOrder[] = [];

  selectedBrand = '';
  selectedOrderBrand = '';
  selectedCustomer = '';
  orderSort: 'none' | 'desc' | 'asc' = 'none';

  firstName = '';
  lastName = '';
  totalPrice: number | null = null;
  laptopId: number | null = null;

  editingId: number | null = null;
  editFirstName = '';
  editLastName = '';
  editTotalPrice: number | null = null;
  editLaptopId: number | null = null;

  ngOnInit(): void {
    this.laptopsService.getLaptops().subscribe((data) => {
      this.laptops = data;
    });

    this.ordersService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  get laptopBrands(): string[] {
    return Array.from(new Set(this.laptops.map((l) => l.brand))).sort();
  }

  get filteredLaptops(): Laptop[] {
    if (!this.selectedBrand) return this.laptops;
    return this.laptops.filter((l) => l.brand === this.selectedBrand);
  }
  get filteredOrders(): ShopOrder[] {
    let result = this.orders.filter((o) => {
      const matchesCustomer =
        !this.selectedCustomer ||
        `${o.customerFirstName} ${o.customerLastName}` ===
          this.selectedCustomer;

      const matchesBrand =
        !this.selectedOrderBrand || o.laptop.brand === this.selectedOrderBrand;

      return matchesCustomer && matchesBrand;
    });

    if (this.orderSort === 'desc') {
      result = result.sort((a, b) => b.totalPrice - a.totalPrice);
    }

    if (this.orderSort === 'asc') {
      result = result.sort((a, b) => a.totalPrice - b.totalPrice);
    }

    return result;
  }
  get orderBrands(): string[] {
    return Array.from(new Set(this.orders.map((o) => o.laptop.brand))).sort();
  }

  get orderCustomers(): string[] {
    return Array.from(
      new Set(
        this.orders.map((o) => `${o.customerFirstName} ${o.customerLastName}`),
      ),
    ).sort();
  }

  createOrder(): void {
    if (
      !this.firstName ||
      !this.lastName ||
      this.totalPrice == null ||
      this.laptopId == null
    ) {
      return;
    }

    this.ordersService
      .createOrder({
        customerFirstName: this.firstName,
        customerLastName: this.lastName,
        totalPrice: this.totalPrice,
        laptopId: this.laptopId,
      })
      .subscribe((created) => {
        this.orders = [created, ...this.orders];

        this.firstName = '';
        this.lastName = '';
        this.totalPrice = null;
        this.laptopId = null;
      });
  }

  startEdit(order: ShopOrder): void {
    this.editingId = order.id;
    this.editFirstName = order.customerFirstName;
    this.editLastName = order.customerLastName;
    this.editTotalPrice = order.totalPrice;
    this.editLaptopId = order.laptop.id;
  }

  saveEdit(): void {
    if (this.editingId == null || this.editTotalPrice == null) {
      return;
    }

    this.ordersService
      .updateOrder(this.editingId, {
        customerFirstName: this.editFirstName,
        customerLastName: this.editLastName,
        totalPrice: this.editTotalPrice,
        laptopId: this.editLaptopId,
      })
      .subscribe((updated) => {
        this.orders = this.orders.map((o) =>
          o.id === updated.id ? updated : o,
        );

        this.editingId = null;
      });
  }

  cancelEdit(): void {
    this.editingId = null;
  }
}
