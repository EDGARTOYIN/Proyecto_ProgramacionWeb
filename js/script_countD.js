const countdown = () =>{

const countDate = new Date("May 28,2022 00:00:00").getTime();
const now = new Date().getTime();
const gap = countDate-now;


const seconds = 1000;
const minutes = seconds*60;
const hour = minutes*60;
const day = hour *24


const textDay = Math.floor(gap /day);
const textHour = Math.floor((gap%day) /hour);
const textMinute = Math.floor((gap%hour) /minutes);
const textSecond = Math.floor((gap%minutes) /seconds);

document.querySelector(".day").innerHTML=textDay;
document.querySelector(".hour").innerText =textHour;
document.querySelector(".minutes").innerText =textMinute;
document.querySelector(".seconds").innerText =textSecond;



};


setInterval(countdown, 1000);
