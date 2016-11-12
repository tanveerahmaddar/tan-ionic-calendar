import { Component, Input } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ModalCalendar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-calendar',
  templateUrl: 'modal-calendar.html'
})
export class TanModalCalendar {
  
   
  selectedDate:any = {
      day: 0, month: 0, year: 0, monthName: 'Jan', dayName: "Sun", formattedDate: '00-00-0000'
  }
  calendarStyling = {
    headerBackground : "#f05630",
    headerText : "#fff",
    btnPrimary:  "#f05630",
    btnSecondary: "#ffd4c9",
    btnText: "#fff",
    height: '34px',
    width: '600px',
    firstDayOfWeek: 'su',
    dateFormat:'dd-mm-yyyy',
    sunHighlight : true,
    deactivatePastDate:true
  }

  constructor(public navCtrl: NavController, private viewCtrl: ViewController,params: NavParams) {
    this.selectedDate = params.get('selectedDate');
    console.log("modal cal",this.selectedDate);
  }

  
  dismiss() {
    this.viewCtrl.dismiss();
  }


  dateSelected(event){
    this.selectedDate = event;
    this.viewCtrl.dismiss(this.selectedDate);
  }
}
