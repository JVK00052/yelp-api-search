import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../app/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Yelp API Search';
  yelpForm = new FormGroup({
  price: new FormControl(),
  city: new FormControl(),
  })
  restaurants: any;

  constructor(private _AS: ApiService) { }
  delivery: string;

  getData() {
    this._AS.getData(this.yelpForm.value.city, this.yelpForm.value.price).subscribe(res => {
    this.restaurants = res.businesses[Math.floor(Math.random()*res.businesses.length)]
    console.log(this.restaurants);
    let delivery = this.restaurants.transactions.indexOf('delivery')
    if (delivery > 0) {
      this.delivery = "Delivery and Pickup"
    } else {
      this.delivery = "Delivery and Dine-In Only"
    }
    return this.restaurants
    })
  }
}