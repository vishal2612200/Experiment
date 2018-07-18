import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


import { Geolocation } from '@ionic-native/geolocation';

import { Camera,CameraOptions } from '@ionic-native/camera';
import { SMS } from '@ionic-native/sms';
import { EmailComposer } from '@ionic-native/email-composer';
import { EmailPage } from '../email/email';



declare var google;




@IonicPage()
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html',
})
export class HomepagePage {

lng : any;
lat : any;
speed:number;
altitude:number;
baseImage:string;
text :any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth : AngularFireAuth
 , private toast:ToastController,public geolocation:Geolocation,
 public camera : Camera,
private sms:SMS,
public email:EmailComposer) {
  }




  @ViewChild('map') mapElement: ElementRef;
  map: any;

  loadMap(){

    let latLng = new google.maps.LatLng(28.59111,77.3944);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }
  //for adding marker
  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";         
   
    this.addInfoWindow(marker, content);
   
  }
  //this function is for making new content window
  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }










  ionViewDidLoad() {
    this.loadMap();
      
    this.afAuth.authState.subscribe(data =>{
      if(data && data.email && data.uid){
      this.toast.create({
        message :"welcome to the app",
        duration : 3000
      }).present();
    }
    else{
      this.toast.create({
        message :"incorrect user id or password",
        duration : 3000
      }).present();
    }
    }
    );

this.geolocation.getCurrentPosition().then(pos =>{
  this.lat =pos.coords.latitude;
  this.lng = pos.coords.longitude;
  this.speed = pos.coords.speed;
  this.altitude = pos.coords.altitude;
}).catch(e =>
  console.log(e)
);
  };


openCamera(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
  
   this.baseImage = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
  console.log(err);
  });
  
}

sendmsg(){
this.sms.send('phone','textmsg');
}


openemailpage(){
  this.navCtrl.push(EmailPage);
}
}
