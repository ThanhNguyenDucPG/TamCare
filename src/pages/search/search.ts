import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];
  province: String;
  district: String;
  provinces: Array<Object> = [];
  districts: Array<Object> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public dataProvider: DataProvider) {
    dataProvider.getProvince().subscribe(data => {
      this.provinces = data;
      this.province = "01";
      this.loadDistrict(this.province);
    })
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  selectProvince (province: String) {
    this.loadDistrict(province);
  }

  loadDistrict (provinceId: String) {
    this.dataProvider.getDistrictByProvince(provinceId).subscribe(data => {
      this.districts = data;
      this.district = data[0]['districtid'];
    })
  } 

}
