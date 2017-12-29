import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ActionSheetController  } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {name: string, email: string, password: string, sex: string, sexStatus: boolean } = {
    name: '',
    email: '',
    password: '',
    sex: "Male",
    sexStatus: true
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public afDb: AngularFireDatabase,
    public actionSheetController: ActionSheetController) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    let updateProfile = {
      email: this.account.email,
      name: this.account.name,
      create_at: new Date()
    }
    // Attempt to login in through our User service
    this.user.signup(this.account.email, this.account.password).then(res => {
      this.afDb.list(`/userProfile`).update(res.uid, updateProfile);
      this.navCtrl.setRoot(MainPage);
    }, (err) => {

      // this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  changeSex (sex) {
    this.account.sex = sex ? "Male" : "Famale"
  }

  chooseAvatar () {
    let actionSheet = this.actionSheetController.create({
     title: 'Choose avatar',
     buttons: [
       {
         text: 'Get picture from gallery',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
         }
       },
       {
         text: 'Capture picture',
         handler: () => {
           console.log('Archive clicked');
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
  }
}
