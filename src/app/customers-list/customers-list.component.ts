import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Customer } from '../shared/customer';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  isEditInfo: number|null = null;
  isChanged: boolean = false
  private tempCustomer: any;

  constructor(public httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getData()
  }
  editCustomer(i: number) {
    this.tempCustomer = this.resetCustomer()
    this.isEditInfo = i;
  }
  cancelEdit() {
    this.tempCustomer = this.resetCustomer()
    this.isEditInfo = null;
  }

  saveCustomer(customer: Customer, i: number) {
    const mergeCustomer: Customer = this.mergeCustomerProps(customer, this.tempCustomer);
    this.httpService.update(mergeCustomer, i)
    this.isChanged = false;
    this.isEditInfo = null;
  }

  deleteCustomer(customerDel: Customer) {
    this.httpService.delete(customerDel)
  }

  setValue(key: string, value: string, original: string): void {
    if (value !==original && value !== this.tempCustomer[key]) {
      this.tempCustomer[key] = value;
      this.isChanged = true;
    }
  }
  private resetCustomer (): any {
    return {
      key: null,
      name: null,
      email: null,
      phone: null,
      location: null
    }
  }

 private mergeCustomerProps(original: Customer, temp: any): Customer {
  const result = {...original};
  Object.keys(temp).forEach(key => { //key - это поля! name,email ...
    if (temp[key]) {
      (result as any)[key] = temp[key];
    }
  })
  return result
 }
}
