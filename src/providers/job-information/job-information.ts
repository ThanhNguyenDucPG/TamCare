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

  getJobDetail(jobId) {
    return this.afDB.object(`jobInformation/${jobId}`).valueChanges();
  }

  getManageJobs() {
    return this.afDB.list(`jobInformation`, ref => ref.orderByChild('userId').equalTo(this.userId)).snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }))
    })
  }

  getListFav() {
    return this.afDB.object(`userProfile/${this.userId}/listFav`).valueChanges();
    // .subscribe(listFav =>{
    //   for(let key in listFav){
    //     console.log(key)
    //     console.log(listFav[key])
    //   }
    // });
  }

  selectJob(id, countSelected) {
    this.afDB.object('/jobInformation/' + id).update({ count: countSelected + 1 });
    this.afDB.list('/jobInformation/' + id + '/listSelected/').update(this.userId, { userId: this.userId });
    this.afDB.list('/userProfile/' + this.userId + '/listFav/').update(id, { userId: id });
  }

  unSelectJob(id, countSelected) {
    this.afDB.object('/jobInformation/' + id).update({ count: countSelected - 1 });
    this.afDB.list('/jobInformation/' + id + '/listSelected/').remove(this.userId);
    this.afDB.list('/userProfile/' + this.userId + '/listFav/').remove(id);
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

  editItem(id, jobInf) {
    return this.afDB.object(`jobInformation/` + id).update(jobInf);
  }

  createItem(jobInf) {
    return this.afDB.list(`jobInformation`).push(jobInf);
  }

  deleteItem(jobId) {
    this.afDB.list('/jobInformation/').remove(jobId);
  }
}
