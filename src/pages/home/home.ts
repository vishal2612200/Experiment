import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';
import { AngularFireAuth } from 'angularfire2/auth';



import { User } from './../models/user';
import { HomepagePage } from '../homepage/homepage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /*
  UserName:any;
  UserPassword:any;
  Remember:boolean;
  */
 user ={} as User;
  constructor(public navCtrl: NavController,private afAuth:AngularFireAuth,public toast:ToastController
  ) {

  }

async login(user:User){
  try{
 const result =  this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
  if(result){
    this.navCtrl.push(HomepagePage);
    this.toast.create({
      message :"welocome to our app",
      duration : 3000
    }).present();
  }
  if(!result){
    this.toast.create({
      message :"incorrect user id or password",
      duration : 3000
    }).present();
  }
  }
  catch(e){
    console.log(e);
  }
}

/*
signin() {
  this.afAuth.authState.subscribe(user.email,user.password).then((res: any) => {
    if (!res.code)
      this.navCtrl.setRoot('TabsPage');
    else
      alert(res);
  })
}
*/
/*
saveLoginInfo(user.email,user.password){
  if(this.remember){
    this.storage.set("user.email",Useremail);
    this.storage.set("user.password",Userpassword);
  }
  else{
    this.storage.remove("user.email");
    this.storage.remove("user.password");
  }
}
*/
/*
saveLoginInfo(UserName,password){
  if(this.Remember){
    this.storage.set("User.email",UserName);//"keyname",parameter
    this.storage.set("User.email",password);//"keyname",parameter
   } 
  else{
    //remove the selected storage
    this.storage.remove("User.email");//keyname
    this.storage.remove("User.password");//keyname
    //if we want to remove all the data,then use below method
    //this.storage.clear();

   }
  
  };
 readLoginInfo(){
    this.Remember = false;

//for UserName purpose
    this.storage.get("User.email").then(data =>{
    if(data){
      this.UserName = data;//bug can happen there
      this.Remember = true;

    }
    else{
      this.Remember = false;
    }
    }).catch(err =>{
      this.UserName="-";
      this.Remember = false;
    });
    
  //for Password purpose
  this.storage.get("UserPassword").then(data =>{
    if(data){
      this.UserPassword = data;//bug can happen there
      //here we don't require this.remember as we are handling error in username case
      }
    
    }).catch(err =>{
      this.UserPassword="-";
      });
 
 
 }
*/





opensignuppage(){
  this.navCtrl.push(SignupPage);
}
openforgotpage(){
  this.navCtrl.push(ForgotPage);
}
}


