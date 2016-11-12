# tan-ionic-calendar
calendar module for ionic 2 and angular 2

# Installation
download the zip and extract it into your project src folder

open app.module.ts and import TanModalCalendar and TanCalendar and add it to declarations and entryComponents array

import TanCalendarModal,ModalController in the page where you want to use it.
 
 for example
 in pages/home.ts 

```
import { TanModalCalendar } from 'tan-calendar/tan-modal-calendar/tan-modal-calendar';
import { Component } from '@angular/core';

import { ModalController, NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public departureDate:any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    let dt =  new Date();
    this.departureDate = {
      day:dt.getDate(),
      month:dt.getMonth() + 1,
      year:dt.getFullYear(), 
      dayName: this.util.getDayName(dt.getDay() + 1),
      monthName: this.util.getMonthName(dt.getMonth() + 1),
      formattedDate: dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear()
    }
  }
  /**
   * Opens the calendar modal to select departure date
   */

    departureDateModal() {
      let modal = this.modalCtrl.create(TanCalendarModal,{ selectedDate: this.departureDate });
      modal.present();
      modal.onDidDismiss((data)=>{
            if(data){
                this.departureDate = data;
            }
        }
      });
    }
}
```
in pages/home.html
```
<a class="journey-date" (click)="departureDateModal()">select date</a>
```

# usage
