import { NavController } from 'ionic-angular';
import { User } from './../user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the JobInformationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JobInformationProvider {
  user: any;
  userId: any;

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase, public userProvider: User) {
    console.log('Hello JobInformationProvider Provider');
    
  }

  checkUser(){
    this.user = this.userProvider.authState.subscribe(res => {
      if (res) {
        return res.uid;
      } else {
        this.navCtrl.setRoot("LoginPage");
      }
    })
  }

  createItem(jobInf) {
    this.userId = this.checkUser();
    return this.afDB.list(`jobInformation`).push(
      jobInf.userId = this.userId
    );
  }
}
