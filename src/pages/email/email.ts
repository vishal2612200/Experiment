import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer';


import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {



  constructor(public navCtrl: NavController, public navParams: NavParams, public EmailComposer:EmailComposer
  ,private document:DocumentViewer,private file:File
  ,private platform:Platform,private transfer:FileTransfer) {
}
To:string;
subject:string;
body:string;

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailPage');
  }
sendemail(){
  let email ={
    to: this.To,
    cc:[],
    bcc:[],
    attachment:[],
    subject:this.subject,
    body:this.body,
    app:"Gmail"

  }
  this.EmailComposer.open(email);
}
 
openpdf(){
  const options:DocumentViewerOptions={
    title:'my PDF'

  };
  this.document.viewDocument('assets/ionic-framework.pdf','application/pdf',options);

}
downloadpdf(){
  let path = null;
  if(this.platform.is('ios')){
  path = this.file.documentsDirectory;
  }
  else{
    path = this.file.dataDirectory;
  }
  
  const transfer = this.transfer.create();
  transfer.download('https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&uact=8&ved=0ahUKEwizxqvFqqjcAhUBq48KHVhTCbQQFghDMAI&url=https%3A%2F%2Fwww.tutorialspoint.com%2Fionic%2Fionic_tutorial.pdf&usg=AOvVaw0VGCZVvPt_j5uwmy79pW9u',path + 'myfile.pdf').then(entry=>
{
  let url = entry.toURL();
  this.document.viewDocument(url,'application/pdf',{})
})

}

}
