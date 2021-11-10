import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from './storage.service';


export class AuthUserId {
  constructor(public uid: string) {}
}



@Injectable({
 providedIn: 'root'
 })
 export class AuthService {

  constructor(
    private storage: StorageService,
    private fireAuth: AngularFireAuth,
   private adb: AngularFirestore,
   ) { }

   async login(email: string, password: string): Promise<any> {
     // call login api
     try {
const response = await this.fireAuth.signInWithEmailAndPassword(email,password);
if(response.user){
  this.setUserData(response.user.uid);
}
     }
     catch(e){
       throw(e);
     }
     }

    // return await this.storage.setStorage('uid', 'ASKFNJSNddASDSADNSANDSDS');


   async getId() {
     return (await this.storage.getStorage('uid')).value;
   }

   setUserData(uid){
     this.storage.setStorage('uid',uid);
   }
 // async register(formValue) {
  //   return await this.storage.setStorage('uid', 'ASKFNJSNddASDSADNSANDSDS');

    async register(formValue) {
      try {
        const registeredUser = await this.fireAuth.createUserWithEmailAndPassword(formValue.email, formValue.password);
        console.log('registered user: ', registeredUser);
         const data = {
        uid:registeredUser.user.uid,
        email: formValue.email,
        phone: formValue.phone,
        name: formValue.name,
        type  : 'user',
        status:'active'
         };
       const user=  await this.adb.collection('users').doc(registeredUser.user.uid).set(data);
       console.log(user);

     await this.setUserData(registeredUser.user.uid);
     return (data);
      } catch(e) {
        throw(e);
      }
    }

  }

