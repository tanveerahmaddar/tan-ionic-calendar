
import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange, ElementRef} from '@angular/core';

import {MyDate, MyMonth} from './tan-calendar.interface';

@Component({
    selector: 'tan-calendar',
    templateUrl: 'tan-calendar.html'
})

export class TanCalendar implements OnInit, OnChanges {
    showSelector:boolean = false;
    visibleMonth:MyMonth = {monthTxt: '', monthNbr: 0, year: 0};
    selectedDate:MyDate = {year: 0, month: 0, day: 0};
    weekDays:Array<string> = [];
    dates:Array<Object> = [];
    selectionDayTxt:string = '';
    dayIdx:number = 0;
    today:Date = null;

    PREV_MONTH:number = 1;
    CURR_MONTH:number = 2;
    NEXT_MONTH:number = 3;

    // Default options
    dayLabels = {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'};
    dayLabelsArray = {1: 'Sun', 2: 'Mon', 3: 'Tue', 4: 'Wed', 5: 'Thu', 6: 'Fri', 7: 'Sat'};
    monthLabels = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' };
    todayBtnTxt:string = 'Today';
    
    @Input() CalWidth: string= '600px';
    @Input() headerBackground:string = "#699DE7";
    @Input() headerText:string = "#777";
    @Input() btnPrimary:string = "#699DE7";
    @Input() btnSecondary:string = "#99bDE7";
    @Input() btnText:string = "#fff";
    @Input() dateFormat: string = "mm-dd-yyyy";
    @Input() height:string = '34px';
    @Input() width:string = '600px';
    @Input() border:any;
    @Input() firstDayOfWeek:string = 'su';
    @Input() sunHighlight:boolean = true;
    @Input() deactivatePastDate:boolean = false;
    @Input() dateSelected:any;
      

    @Output() onDateSelect = new EventEmitter();
    constructor(public elem: ElementRef) {
        this.today = new Date();
                   
            
    }
  
    ngOnInit() {        
        this.openBtnClicked();
        // Custom Editing Pardeep
       
        this.border= 'none';
        let doc = document.getElementsByTagName('html')[0];
        doc.addEventListener('click', (event) => {true
            if (this.showSelector && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
                this.showSelector = true;
            }
        }, true);
       
        // Custom Editing Pardeep
        
        let days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.dayIdx = days.indexOf(this.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx = this.dayIdx;
        if(typeof this.dateFormat === 'undefined'){
            this.dateFormat = 'mm-dd-yyyy';
            console.log("defulat value init=>>",this.dateFormat);
        }
            for (var i = 0; i < days.length; i++) {
                this.weekDays.push(this.dayLabels[days[idx]]);
                idx = days[idx] === 'sa' ? 0 : idx + 1;
            }
        }
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        try{
         this.selectionDayTxt = changes['dateSelected'].currentValue;
            if(this.selectionDayTxt !== '') {
                if(this.dateSelected){
                    this.selectedDate.day = this.dateSelected.day;
                    this.selectedDate.month =  this.dateSelected.month;
                    this.selectedDate.year = this.dateSelected.year;
                    this.visibleMonth = {monthTxt: this.dateSelected.monthName, monthNbr: this.dateSelected.month, year: this.dateSelected.year}
                } 
                //let fmt =  this.dateFormat;
                // let dpos:number = fmt.indexOf('dd');
                // let mpos:number = fmt.indexOf('mm');
                // let ypos:number = fmt.indexOf('yyyy');
    
                //this.selectedDate = {day: dpos, month: mpos, year: ypos};
                //this.formatDate(this.dateFormat);
                //this.selectedDate = {day: parseInt(this.selectionDayTxt.substring(dpos, dpos + 2)),
                //month: parseInt(this.selectionDayTxt.substring(mpos, mpos + 2)),
                //year: parseInt(this.selectionDayTxt.substring(ypos, ypos + 4))};
            }
        }catch(e){
            console.log("error is->>",e);
        }
    }f
    // Function for get Events List API //
    // API_getEvent() {
	// 	let url_newEvent = this.base_path_service.base_path_event() + 'event/?year='+this.visibleMonth.year+'&month='+this.visibleMonth.monthNbr;
	// 	this.base_path_service.GetRequestbase_path_servic(url_newEvent)
	// 		.subscribe(res=> {
    //             this.EventsBooked = res[0].json;
    //             this.createEventCalendar();
	// 		},
	// 		err=> {
	// 			console.log(err);
	// 		})
	// }
    // Function for get Events List API //
    
    openBtnClicked():void {
        this.showSelector = !this.showSelector;
        if (this.showSelector) {
            let y = 0, m = 0;
            if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
                y = this.today.getFullYear();
                m = this.today.getMonth() + 1;
            }
            else {
                y = this.selectedDate.year;
                m = this.selectedDate.month;
            }
            // Set current month
            this.visibleMonth = {monthTxt: this.monthLabels[m], monthNbr: m, year: y};

            // Create current month
            this.createMonth(m, y);
        }
    }
    prevMonth():void {
        let m = this.visibleMonth.monthNbr;
        let y = this.visibleMonth.year;
        if (m === 1) {
            m = 12;
            y--;
        }
        else {
            m--;
        }
        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.createMonth(m, y);
        // this.API_getEvent();
    }

    nextMonth():void {
        let m = this.visibleMonth.monthNbr;
        let y = this.visibleMonth.year;
        if (m === 12) {
            m = 1;
            y++;
        }
        else {
            m++;
        }
        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.createMonth(m, y);
        // this.API_getEvent();
    }

    cellClicked(cell:any):void {
        // Cell clicked in the selector
        if(!this.isPast(cell.day,cell.month,cell.year,cell.cmo)){
            if (cell.cmo === this.PREV_MONTH) {
                // Previous month of day
                this.prevMonth();
            }
            else if (cell.cmo === this.CURR_MONTH) {
                // Current month of day
                this.selectDate(cell);
            }
            else if (cell.cmo === this.NEXT_MONTH) {
                // Next month of day
                this.nextMonth();
            }
        }
       
    }

    selectDate(date:any):void {
        this.selectedDate = {day: date.day, month: date.month, year: date.year};
        this.selectionDayTxt = this.formatDate(date);
        // Custom Editing Pardeep
        this.showSelector = true;
        // Custom Editing Pardeep
        let selD = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        //let epoAPI_getEventc = selD.getTime() / 1000.0;
        console.log( this.selectionDayTxt);
        
        this.onDateSelect.emit({
            day: this.preZero(date.day),
            month: this.preZero(date.month),
            year: date.year,
            dayName: this.dayLabelsArray[selD.getDay() + 1],
            monthName: this.monthLabels[date.month],
            formattedDate:this.selectionDayTxt
        });
    }

    preZero(val:string):string {
        // Prepend zero if smaller than 10
        return val < '10' ? '0' + val : val;
    }

    formatDate(val:any):string {
        return this.dateFormat.replace('yyyy', val.year)
            .replace('mm', this.preZero(val.month))
            .replace('dd', this.preZero(val.day));
    }

    monthText(m:number):string {
        // Returns mont as a text
        return this.monthLabels[m];
    }

    monthStartIdx(y:number, m:number):number {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m:number, y:number):number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m:number, y:number):number {
        // Return number of days of the previous month
        if (m === 1) {
            m = 12;
            y--;
        }
        else {
            m--;
        }
        return this.daysInMonth(m, y);
    }

    isCurrDay(d:number, m:number, y:number, cmo:any):boolean {
        // Check is a given date the current date
        return d === this.today.getDate() && m === this.today.getMonth() + 1 && y === this.today.getFullYear() && cmo === 2;
    }

    isSelectedDay(d:number, m:number, y:number, cmo:any):boolean {
        // Check is a given date the current date
        return d === this.dateSelected.day && m === this.dateSelected.month && y === this.dateSelected.year && cmo === 2;
    }


    isPast(d:number, m:number, y:number, cmo:any):boolean{
        if(this.deactivatePastDate){
            let month:number = m;
            switch(cmo)
            {
                case this.PREV_MONTH:
                    month=m-2;
                    break;
                case this.CURR_MONTH:
                    month=m-1;
                    break;
                default:
                    break;
            }
            let dt = new Date(y, month, d+1 );
            if (dt < this.today) {
                return true;
            }
            return false;
        }
        return false;
        
    }

    sundayIdx():number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    createMonth(m:number, y:number): void {
        this.dates.length = 0;
        let monthStart = this.monthStartIdx(y, m);
        let dInThisM = this.daysInMonth(m, y);
        let dInPrevM = this.daysInPrevMonth(m, y);
        let sunIdx = this.sundayIdx();

        let dayNbr = 1;
        let cmo = this.PREV_MONTH;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                // First week
                var pm = dInPrevM - monthStart + 1;
                // Previous month
                for (var j = pm; j <= dInPrevM; j++) {
                    week.push({day: j, month: m, year: y, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo), sun: week.length === sunIdx});
                }
                cmo = this.CURR_MONTH;
                // Current month
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    week.push({day: dayNbr, month: m, year: y, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), sun: week.length === sunIdx});
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks 
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.NEXT_MONTH;
                    }
                    week.push({day: dayNbr, month: m, year: y, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), sun: week.length === sunIdx});
                    dayNbr++;
                }
            }
            this.dates.push(week);
        }
    }
}