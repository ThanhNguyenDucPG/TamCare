import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  user: firebase.User;
  authState: Observable<firebase.User>;

  constructor(public api: Api, public afAuth: AngularFireAuth,
     public afd: AngularFireDatabase) {
      this.authState = afAuth.authState;
      
         this.authState.subscribe(user => {
            this.user = user;
          });
      }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(accountInfo.email, accountInfo.password);
    
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(email: any, password: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * Log the user out, which forgets the session
   */
  
}
