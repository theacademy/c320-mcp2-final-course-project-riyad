import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { DataService } from '../core/data.service';
import { ICustomer, IOrder, IProduct } from '../shared/Interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  customersOrderTotal: number = 0;
  title: string = 'Orders';
  products: any[] = [];
  customer: ICustomer | undefined;
  orders!: any;
  image : string = './assets/images/placeholder.png';
  imageArr : string [] = [];
  orderCompletionStatus: any;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private http: HttpClient,
    public AuthService: AuthService
  ) {}

  ngOnInit() {
 

    this.title = 'Orders';
    this.route.paramMap.subscribe((params) => {
      const customerId = params.get('customerId');
      console.log('Customer ID:', customerId);
  
      if (customerId) {
        const id = parseInt(customerId, 10);
  
        this.dataService.getOrdersByCustomerId(id).subscribe((orders: IOrder[]) => {
          this.orders = orders;
          console.log('Orders:', this.orders); // Output the fetched orders
  
          // Extract the orderId list
          const orderIdList = this.orders.map((order: IOrder) => order.orderId);
          console.log('OrderId List:', orderIdList);
          this.callProductsApi(orderIdList)
        });
      }
    });
      }

      callProductsApi(orderIdList: number[]) {
        for (let id of orderIdList) {
          this.dataService.getProductsByOrder(id).subscribe((products: IProduct[]) => {
            const order = this.orders.find((o: IOrder) => o.orderId === id);
            if (order) {
              order.products = products;
              console.log(products);
            }
          });
        }
      }
      isExpanded(order: any): boolean {
        return order.hasOwnProperty('expanded') ? order.expanded : false;
      }
      
      toggleProducts(order: any): void {
        order.expanded = !this.isExpanded(order);
      }

      

      getImage(productCategoryName: string): string {
        if (!productCategoryName) {
          return "./assets/images/placeholder.png";
        } else {
          productCategoryName = productCategoryName.toLowerCase();
          switch (productCategoryName) {
            case "electronics":
              return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Arduino_ftdi_chip-1.jpg/320px-Arduino_ftdi_chip-1.jpg';
            case "food":
              return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/320px-Good_Food_Display_-_NCI_Visuals_Online.jpg';
            case 'clothing':
              return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Clothing_store_downtown_Boston.jpg/320px-Clothing_store_downtown_Boston.jpg';
            case 'books':
              return 'https://upload.wikimedia.org/wikipedia/commons/4/42/Otvorena_knjiga.JPG';
            case 'home appliances':
              return 'https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/b00/b0017/b0017492.jpg';
            case 'toys':
              return 'https://www.ikea.com/ca/en/images/products/lillabo-toy-vehicle-mixed-colors__0877081_pe611027_s5.jpg?f=xl';
            default:
              return './../../assets/images/placeholder.jpg';
          }
        }
      }
      
      
      
    }
    

     
// getImageUrl(productCategoryName: string): Observable<string> {
//   const unsplashAccessKey = 'YOUR_UNSPLASH_ACCESS_KEY';
//   const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
//     productCategoryName
//   )}&client_id=${unsplashAccessKey}`;

//   return this.http.get<any>(unsplashApiUrl).pipe(
//     map((response: any) => {
//       console.log('Unsplash API response:', response);
//       return response.urls.regular; // Access the "regular" URL from the "urls" property
//     }),
//     catchError((error: any) => {
//       console.error('Failed to retrieve image from Unsplash:', error);
//       return of(''); // Return an empty string in case of error
//     })
//   );
// }
      
      
      







  // getImageUrl(productName: string): string {
  //   const unsplashAccessKey = 'YOUR_UNSPLASH_ACCESS_KEY';
  //   const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(productName)}&client_id=${unsplashAccessKey}`;
  
  //   return this.http.get<any>(unsplashApiUrl).pipe(
  //     map((response: any) => {
  //       return response.urls.regular;
  //     }),
  //     catchError((error: any) => {
  //       console.error('Failed to retrieve image from Unsplash:', error);
  //       return ''; // Return a default image URL or handle the error case
  //     })
  //   ).toPromise(); // Convert the Observable to a Promise and return the result synchronously
  // }
  
  
  
  


  //     if (customerId) {
  //       const id = parseInt(customerId, 10);
  //       const orders$ = this.dataService.getOrdersByCustomerId(id);
  //       const products$ = this.dataService.getProductsByOrder(id);

  //       forkJoin([orders$, products$]).subscribe(
  //         ([orders, products]) => {
  //           this.orders = orders;
  //           this.products = products;

  //           this.calculateOrderTotal();
  //         },
  //         (error) => {
  //           console.error(error);
  //         }
  //       );

  //       this.dataService
  //         .getCustomer(id)
  //         .subscribe((customer: ICustomer | null) => {
  //           this.customer = customer || ({} as ICustomer);
  //         });
  //     }
  //   });
  // }

  // calculateOrderTotal() {
  //   this.customersOrderTotal = 0;
  //   for (const order of this.orders) {
  //     const product = this.products.find((p) => p.productId === order.productId);
  //     if (product) {
  //       this.customersOrderTotal += order.quantity * product.productPrice;
  //     }
  //   }
  // }
// }