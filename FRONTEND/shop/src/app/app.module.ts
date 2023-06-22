import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './core/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AboutUsComponent } from './about/about-us/about-us.component';
import { ContactComponent } from './contact/contact/contact.component';
import { AuthService } from './core/auth.service';
import { PhoneNumberFormatPipe } from './shared/phone.pipe';
import { FilterTextboxComponent } from './customers/customers-list/filter-textbox.component';
import { IOrder, IProduct } from './shared/Interfaces';
import { Location } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    LoginPageComponent,
    AboutUsComponent,
    ContactComponent,   
    // PhoneNumberFormatPipe,
    PopupComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OrdersModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    GoogleMapsModule,
  ],
  providers: [DataService, AuthService, PhoneNumberFormatPipe],
  bootstrap: [AppComponent]
})




export class AppModule { }
