import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { LandingComponent } from './landingModule/landingComponent';
import { ReceipeService } from './services/receipeService';
import { CartModalComponent } from './modals/cartModal';
@NgModule({
  declarations: [
    AppComponent, LandingComponent, CartModalComponent
  ],
  imports: [
    BrowserModule, CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes)
  ],
  providers: [ ReceipeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
