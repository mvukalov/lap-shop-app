import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
  customerAddress = '';
  totalPrice: number | null = null;
  laptopId: number | null = null;

  editingId: number | null = null;
  editFirstName = '';
  editLastName = '';
  editCustomerAddress = '';
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

  get selectedLaptopPrice(): number | null {
    const laptop = this.laptops.find((l) => l.id === this.laptopId);
    return laptop ? laptop.price : null;
  }

  get selectedEditLaptopPrice(): number | null {
    const laptop = this.laptops.find((l) => l.id === this.editLaptopId);
    return laptop ? laptop.price : null;
  }

  onLaptopChange(laptopId: number | null): void {
    this.laptopId = laptopId;
    const laptop = this.laptops.find((l) => l.id === laptopId);
    this.totalPrice = laptop ? laptop.price : null;
  }

  onEditLaptopChange(laptopId: number | null): void {
    this.editLaptopId = laptopId;
    const laptop = this.laptops.find((l) => l.id === laptopId);
    this.editTotalPrice = laptop ? laptop.price : null;
  }

  createOrder(orderForm: NgForm): void {
    if (
      orderForm.invalid ||
      this.totalPrice == null ||
      this.totalPrice <= 0 ||
      this.laptopId == null
    ) {
      return;
    }

    this.ordersService
      .createOrder({
        customerFirstName: this.firstName,
        customerLastName: this.lastName,
        customerAddress: this.customerAddress,
        totalPrice: this.totalPrice,
        laptopId: this.laptopId,
      })
      .subscribe((created) => {
        this.orders = [created, ...this.orders];

        this.firstName = '';
        this.lastName = '';
        this.customerAddress = '';
        this.totalPrice = null;
        this.laptopId = null;
        orderForm.resetForm();
      });
  }

  startEdit(order: ShopOrder): void {
    this.editingId = order.id;
    this.editFirstName = order.customerFirstName;
    this.editLastName = order.customerLastName;
    this.editCustomerAddress = order.customerAddress || '';
    this.editLaptopId = order.laptop.id;
    this.editTotalPrice = order.laptop.price;
  }

  saveEdit(): void {
    if (
      this.editingId == null ||
      !this.editFirstName ||
      !this.editLastName ||
      !this.editCustomerAddress ||
      this.editTotalPrice == null ||
      this.editTotalPrice <= 0 ||
      this.editLaptopId == null
    ) {
      return;
    }

    this.ordersService
      .updateOrder(this.editingId, {
        customerFirstName: this.editFirstName,
        customerLastName: this.editLastName,
        customerAddress: this.editCustomerAddress,
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
