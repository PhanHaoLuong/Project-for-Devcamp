const displayTime = (timeSec) => {
    let timeUnit = "seconds";
    let time = 0;
    if (typeof(timeSec) === 'number'){
        if (timeSec < 60) {
            timeUnit = (timeSec === 1) ? "second" : "seconds"; 
            time = timeSec;
        } else if (timeSec >= 60 && timeSec < 60*60) {
            time = Math.floor(timeSec / 60);
            timeUnit = (time === 1) ? "minute" : "minutes"; 
        } else if (timeSec >= 60*60 && timeSec < 60*60*24){
            time = Math.floor(timeSec / (60*60));
            timeUnit = (time === 1) ? "hour" : "hours"; 
        } else if (timeSec >= 60*60*24 && timeSec < 60*60*24*30){
            time = Math.floor(timeSec / (60*60*24));
            timeUnit = (time === 1) ? "day" : "days"; 
        } else if (timeSec >= 60*60*24*30 && timeSec < 60*60*24*365){
            time = Math.floor(timeSec / (60*60*24*30));
            timeUnit = (time === 1) ? "month" : "months"; 
        } else {
            time = Math.floor(timeSec / (60*60*24*365));
            timeUnit = (time === 1) ? "year" : "years"; 
        }
        return `${time} ${timeUnit}`;
    } else {
        return "N/A";
    }
}

export default displayTime;