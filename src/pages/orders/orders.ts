import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobInformationProvider } from '../../providers/job-information/job-information';
import { User } from '../../providers/providers';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  orders: any;
  listJobs: any;
  listFav: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public jobInf: JobInformationProvider) {
  
  }

  ionViewDidLoad() {
    this.getJobs();
  }

  getListFav() {
    this.listFav = [];
    this.jobInf.getListFav().subscribe(listFav => {
      for (let key in listFav) {
        let findJob = this.listJobs.findIndex(x=>x.key == key);
        let checkJob = this.listFav.findIndex(x=>x.key == key)
        if(findJob >= 0 && checkJob < 0){
          this.listFav.push(this.listJobs[findJob]);
        }
      }
    });
  }

  getJobs() {
    this.jobInf.getJobs().subscribe(jobs => {
      this.listJobs = jobs;
      this.getListFav();
    })
  }

  unSelectJob(keyId, count){
    this.jobInf.unSelectJob(keyId, count)
  }

  openItem(jobId) {
    this.navCtrl.push('ItemDetailPage', {
      jobId: jobId
    });
  }

}
