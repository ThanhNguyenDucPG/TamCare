import { JobInformationProvider } from './../../providers/job-information/job-information';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentJobs: any;
  listFav: any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,
    public jobInf: JobInformationProvider) {
    // this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.getJobs();
  }

  getJobs() {
    this.jobInf.getJobs().subscribe(list => {
      this.currentJobs = list;
      this.getListFav();
    })
  }

  getListFav() {
    this.listFav = [];
    this.jobInf.getListFav().subscribe(listFav => {
      for (let key in listFav) {
        let findJob = this.currentJobs.findIndex(x=>x.key == key);
        let checkJob = this.listFav.findIndex(x=>x.key == key)
        if(findJob >= 0 && checkJob < 0){
          this.currentJobs[findJob].selected = true;
        }
      }
    });
  }

  selectJob(keyId, count){
    this.jobInf.selectJob(keyId, count)
  }

  unSelectJob(keyId, count){
    this.jobInf.unSelectJob(keyId, count)
  }
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    // addModal.onDidDismiss(item => {
    //   if (item) {
    //     this.items.add(item);
    //   }
    // })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(jobId) {
    this.navCtrl.push('ItemDetailPage', {
      jobId: jobId
    });
  }
}
