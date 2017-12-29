import { User } from './../providers/user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header color="green">
      <img src="assets/img/marty-avatar.png"/>
      <p class="name">Nguyễn Song Hào</p>
      <div class="btn-edit">Edit <ion-icon name="md-create"></ion-icon></div>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          <img class="icon-menu" src="assets/img/{{p.img}}"/>
          {{p.title}}
        </button>
        <button menuClose ion-item (click)="logout()">
          <img class="icon-menu" src="assets/img/logout.png"/>
          Logout
        </button>
      </ion-list>
      <div class="btn-phone">0975030714</div>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    // { title: 'Tutorial', component: 'TutorialPage' },
    // { title: 'Welcome', component: 'WelcomePage' },
    // { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage', img: 'card.png' },
    { title: 'Orders', component: 'OrdersPage', img: 'orders.png'},
    { title: 'Manage Posts', component: 'ManagePostsPage', img: 'post.png' },
    { title: 'List User', component: 'UsersPage', img: 'users.png' },
    // { title: 'Login', component: 'LoginPage' },
    // { title: 'Signup', component: 'SignupPage' },
    { title: 'List Jobs', component: 'ListMasterPage', img: 'job.png' },
    // { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage', img: 'settings.png' },
    { title: 'Search', component: 'SearchPage', img: 'search.png' }
  ]

  constructor(private translate: TranslateService, platform: Platform,
     settings: Settings, private config: Config,
      private statusBar: StatusBar, private splashScreen: SplashScreen,
    public user: User) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      user.authState.subscribe(user => {
        if (user) {
          this.rootPage = 'TabsPage';
        } else {
          this.rootPage = 'LoginPage';
        }
      });
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  logout(){
    this.user.logout().then(() =>{
      this.nav.setRoot("LoginPage");
    })
   }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
