import { IDatePickerStrings } from "@fluentui/react";

export const DatePickerString:IDatePickerStrings={
    months:["January","February","March","April","May","June","July","August","Septemeber","October","Novemeber","December"],
    shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    goToToday:"Go to today",
    prevMonthAriaLabel:"Go to previous month",
    nextMonthAriaLabel:"Go to next month",
    prevYearAriaLabel:"Go to previous year",
    nextYearAriaLabel:"Go to next year"
};

export const DateFormate=(date:any):string=>{
    let date1=new Date(date);

    //year
    let year=date1.getFullYear();
    //month
    let month=(1+date1.getMonth()).toString();
    month=month.length>1?month:'0'+month;

    //day
    let day=date1.getDate().toString();
    day=day.length>1?day:'0'+day;

    return day+'/'+month+'/'+year
}