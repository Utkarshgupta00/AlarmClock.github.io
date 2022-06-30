const SelectMenu = document.querySelectorAll("select");
const AlarmButton = document.querySelector(".btn");
const content = document.querySelector(".inp");


let alarmTime,
isalarmStop=false,
ringtone = new Audio ("./ringtone.mp3");


for (let i = 59; i>=0; i--){
    i = i<10 ? "0"+i : i;
    let option = `<option value="${i}" >${i}</option>`;
    SelectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 12; i>=0; i--){
    i = i<10 ? "0"+i : i;
    let option = `<option value="${i}" >${i}</option>`;
    SelectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i>0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}" >${ampm}</option>`;
    SelectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//------------------------------------------------------------------------------------------

const setalarm = () =>{


    if (isalarmStop){
        alarmTime="";
        ringtone.pause();
        content.classList.remove("disable");
        AlarmButton.innerText = "Set Alarm";
        return isalarmStop = false;
    }




    let set = `${SelectMenu[0].value} : ${SelectMenu[1].value} : ${SelectMenu[2].value}`;

    if(set.includes("hour") || set.includes("minute") || set.includes("AM/PM")){
        return alert("please enter a valid time to set Alarm")
    }
    content.classList.add("disable");
    AlarmButton.innerText = "Clear Alarm";
    isalarmStop = true;
    alarmTime = set;

}

AlarmButton.addEventListener("click",setalarm)


//--------------------------------------------------------------------------------------------


function time(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ampm = "AM";

    if (h>=12){
        h = h-12;
        ampm = "PM";
    }

    h = h == 0 ? h = 12 : h;
    h = h<10 ? "0"+h : h;
    m = m<10 ? "0"+m : m;
    s = s<10 ? "0"+s : s;
    
    var res = (h + " : " + m + " : " + s + " : " + ampm);
    if(alarmTime == (h + " : " + m + " : " + ampm)){
        ringtone.play();
        ringtone.loop = true;
    };
    document.querySelector("#time").innerText = res;

    setTimeout(time,1000);
};

