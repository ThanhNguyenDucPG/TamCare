import { NavController } from 'ionic-angular';
import { User } from './../user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

/*
  Generated class for the JobInformationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JobInformationProvider {
  userId: any;
  listJob: any;

  constructor(public afDB: AngularFireDatabase, public userProvider: User) {
    console.log('Hello JobInformationProvider Provider');
    this.userProvider.authState.subscribe(res => {
      this.userId = res.uid;
    })

  }

  getJobs() {
    return this.afDB.list(`jobInformation`).snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  getJobDetail(jobId){
    return this.afDB.object(`jobInformation/${jobId}`).valueChanges();
  }

  // checkUser(){
  //   this.user = this.userProvider.authState.subscribe(res => {
  //     if (res) {
  //       return res.uid;
  //     } else {
  //       this.navCtrl.setRoot("LoginPage");
  //     }
  //   })
  // }

  createItem(jobInf) {
    jobInf.userId = this.userId;
    // this.userId = this.checkUser();
    return this.afDB.list(`jobInformation`).push(jobInf);
  }
}
