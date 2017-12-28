import { JobInformationProvider } from './../../providers/job-information/job-information';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  // @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;
  today = new Date().toISOString();
  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
     formBuilder: FormBuilder, public camera: Camera,
    public jobInf: JobInformationProvider) {
    this.form = formBuilder.group({
      // profilePic: [''],
      title: ['', Validators.required],
      workplace: ['', Validators.required],
      date: ['', Validators.required],
      timeFrom: ['', Validators.required],
      timeTo: ['', Validators.required],
      price: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      description: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  createItem(){
    if (!this.form.valid) { return; }
    let data = {
      title: this.form.value.title,
      workplace: this.form.value.workplace,
      date: this.form.value.date,
      timeFrom: this.form.value.timeFrom,
      timeTo: this.form.value.timeTo,
      price: this.form.value.price,
      phoneNumber: this.form.value.phoneNumber,
      description: this.form.value.description,
      count: 0
    }
    this.jobInf.createItem(data).then(res =>{
      this.viewCtrl.dismiss(this.form.value);
    })
  }
  // getPicture() {
  //   if (Camera['installed']()) {
  //     this.camera.getPicture({
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       targetWidth: 96,
  //       targetHeight: 96
  //     }).then((data) => {
  //       this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
  //     }, (err) => {
  //       alert('Unable to take photo');
  //     })
  //   } else {
  //     this.fileInput.nativeElement.click();
  //   }
  // }

  // processWebImage(event) {
  //   let reader = new FileReader();
  //   reader.onload = (readerEvent) => {

  //     let imageData = (readerEvent.target as any).result;
  //     this.form.patchValue({ 'profilePic': imageData });
  //   };

  //   reader.readAsDataURL(event.target.files[0]);
  // }

  // getProfileImageStyle() {
  //   return 'url(' + this.form.controls['profilePic'].value + ')'
  // }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
