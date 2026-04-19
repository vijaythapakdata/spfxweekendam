import * as React from 'react';
import styles from './FirstWebPart.module.scss';
import type { IFirstWebPartProps } from './IFirstWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import UseStateHook from './ReactHooksComponent/UseStateHook';
import UseEffectHook from './ReactHooksComponent/UseEffectHook';
import StopWatchTimer from './ReactHooksComponent/stopWatchtimer';
import UseCallBackHook from './ReactHooksComponent/UseCallBackhook';
import UseMemoHook from './ReactHooksComponent/useMemoHook';
import { ServiceApiClass } from '../../../Service/ServiceApi';
import { ISharePointList2Columns } from '../../../CommonMethods/ISharePointListCoulmns';
const FirstWebPart:React.FC<IFirstWebPartProps>=(props)=>{
// variables in react-> to store the value and to update the value we have useState hook in react
const [formdata,setFormdata]=React.useState<ISharePointList2Columns>({
    Title:"",
    Description:"",
    Created:new Date()
})
// three ways to create  variable in react.

// 1. Const -> we can not change the value of const variable once we assign the value to it. it is read only variable.

const name:string="pavan kumer";

console.log(name);
// name="aman kumar " // This will cause a compile error since name is a const variable


//let -> we can change the value of let variable once we assign the value to it. it is read and write variable.

let age:number =34;
console.log(age);
age =90;
console.log("Updated age:",age);

//var -> we can change the value of var variable once we assign the value to it. it is read and write variable. but it is function scoped variable.

var city:string="hyderabad";
console.log(city);
city="bangalore";
console.log("Updated city:",city);

// data types in react -> we have to specify the data type of the variable in react. it is a good practice to specify the data type of the variable in react. it will help us to avoid the errors in our code.
  
let num1:number=45;
let fullName:string="Vijay thapak";
let isTrue:boolean=true;

let fruits:string[]=["apple","banana","orange"];

console.log(num1);
console.log(fullName);
console.log(isTrue);
console.log(fruits);

//loops in react -> we can use loops in react to iterate over the array and to display the data in the UI. we can use for loop, while loop, do while loop, for in loop, for of loop in react.
//foreach loop in react -> we can use foreach loop in react to iterate over the array and to display the data in the UI. it is a good practice to use foreach loop in react to iterate over the array and to display the data in the UI.
console.log("***I am foreach loop***");
fruits.forEach((fruit)=>{
  console.log(fruit);
});

console.log("***I am for loop***")

//for loop in react -> we can use for loop in react to iterate over the array and to display the data in the UI. it is a good practice to use for loop in react to iterate over the array and to display the data in the UI.

for(let i=0;i<fruits.length;i++){
  console.log(fruits[i]);
}

//while loop in react -> we can use while loop in react to iterate over the array and to display the data in the UI. it is a good practice to use while loop in react to iterate over the array and to display the data in the UI.
console.log("***I am While loop***")
let j=0;
while(j<fruits.length){
  console.log(fruits[j]);
  j++;
}

//do while loop in react -> we can use do while loop in react to iterate over the array and to display the data in the UI. it is a good practice to use do while loop in react to iterate over the array and to display the data in the UI.
console.log("***I am do while loop***")
let k=0;
do{
  console.log(fruits[k]);
  k++;
}
while(k<fruits.length);

// function in react -> we can use function in react to perform the specific task. it is a good practice to use function in react to perform the specific task.

const add=(a:number,b:number)=>{
  return a+b;
}


const mydata=()=>{
  console.log("I am a function in react");

  //conditional Statements in react -> we can use conditional statements in react to perform the specific task based on the condition. it is a good practice to use conditional statements in react to perform the specific task based on the condition.
// Switch case

let day:number=3;
let dayName:string="";

switch(day){
  case 1:
    dayName="Sunday";
    break;
  case 2:
    dayName="Monday";
    break;
  case 3:
    dayName="Tuesday";
    break;
  case 4:
    dayName="Wednesday";
    break;
  default:
    dayName="Invalid day";
}
console.log("Day name is:",dayName);

}

const additems=async()=>{
  try{
const _service=new ServiceApiClass(props.siteurl);
const result=await _service.createFormdata(formdata);
console.log("Form data created successfully:",result);
  }
  catch(err){
    console.error("Error creating form data:", err);
  }
}
return(
    <>
    <h4> hello world!!</h4>

    {/* Map function */}
    {fruits.map((item)=>{
      return<p>{item}</p>
    })}
    {/* calling function */}
    {mydata()}
    {add(10,30)}

    <p>{props.currentUserName}</p>
    <p>{props.siteurl}</p>
    <UseStateHook/>
    <UseEffectHook/>
    <StopWatchTimer/>
    <UseCallBackHook/>
    <UseMemoHook/>
    </>
  )
}
export default FirstWebPart;


// export default class FirstWebPart extends React.Component<IFirstWebPartProps> {
//   public render(): React.ReactElement<IFirstWebPartProps> {
  

//     return (
//     <>
//     <h4> hello wordl!!</h4>
//     </>
//     );
//   }
// }
