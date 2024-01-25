import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

const url = 'https://app-firebase-deploy---20240121-default-rtdb.firebaseio.com/customers'
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  custromers: Customer[] = []

  constructor(private httpClient: HttpClient) { }


  // CRUD =>
  // create = POST
  createData(custromerTemp: any): void {
    this.httpClient.post<Customer>(`${url}.json`, custromerTemp, httpOptions)
    .subscribe(
     res => this.custromers.push({...{key: res.name}, ...custromerTemp}), //чтобы без перезгрузки страницы обновлялись данные о покупателе
     catchError(this.errorHandler<Customer>('POST'))
    )
  }


  // read = GET
  getData(): void {
    this.httpClient.get<Customer[]>(`${url}.json`, httpOptions).subscribe(
    (res) => Object.keys(res).forEach((key: any) => {this.custromers.push({key, ...res[key]})}), //деструктуризация, обширный вариант в конце
    catchError(this.errorHandler<Customer>('GET'))
    )
  }


  // update = PUT/PATCH
  update(customer: Customer, i: number): void {
    // грубо говоря выносим ключ чтобы он не записывался в базе
    const {key, ...data} = customer;
    this.httpClient.put<Customer>(`${url}/${key}.json`, data, httpOptions)
    .subscribe(
     () => this.custromers[i] = customer, //чтобы без перезгрузки страницы обновлялись данные о покупателе
     catchError(this.errorHandler<Customer>('PUT'))
    )
  }
  // delete = DELETE
  delete(customer: Customer): void {
    this.httpClient.delete<void>(`${url}/${customer.key}.json`, httpOptions)
    .subscribe(
     () => this.custromers.splice(this.custromers.indexOf(customer), 1), //склейка
     catchError(this.errorHandler<Customer>('DELETE'))
    )
  } 


  private errorHandler<T>(operation: string, res?: T): any {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed ${error}`);
      return of(res as T)
    }
  }
}





// createData(custromerTemp: any): void {
//   this.httpClient.post<Customer>(`${url}.json`, custromerTemp, httpOptions)
//   .subscribe(
//    res =>  {
//      custromerTemp.key = res.name;
//      this.custromers.push(custromerTemp); //чтобы без перезгрузки страницы обновлялись данные о покупателе
  
//   },
//     error => console.log(error)
//   )
// }

// getData(): void {
//   this.httpClient.get<Customer[]>(`${url}.json`, httpOptions).subscribe(
//   (res) => {
//     Object.keys(res).forEach(key => {
//       const obj = Object.assign({}, res[key]) //склейка пустого обьекта с тем, что находится в ключе
//       obj.key = key; //добавляется ключ
//       this.custromers.push(obj) //push применяется чтобЫ добавлять в массив
//       // key - ключ, в базе данных дается 'ключ' = id по нашему и мы его выводим
//       // res[key] - результат ключа, то что в нём хранится, то есть инфу о людях
//     })
//   }
//   )
//   console.log(this.custromers)
// }