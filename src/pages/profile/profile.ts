import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	account: {name: string, email: string, password: string, sex: string, sexStatus: boolean } = {
	    name: '',
	    email: '',
	    password: '',
	    sex: "Male",
	    sexStatus: true
	};

  	constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService) {

  	}

 	ionViewDidLoad() {
    	console.log('ionViewDidLoad ProfilePage');
  	}

  	changeSex (sex) {
	    this.account.sex = sex ? "Male" : "Famale"
	}
}
