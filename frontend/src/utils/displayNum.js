const displayNum = (num) => {
    if (typeof(num) === 'number'){
        const numLogMag = Math.log10(Math.abs(num));
        if (numLogMag < 3) {
            return num;
        } else if (numLogMag >= 3 && numLogMag < 6) {
            return `${(num / (10 ** 3)).toFixed(1)}K`;
        } else if (numLogMag >= 6 && numLogMag < 9) {
            return `${(num / (10 ** 6)).toFixed(1)}M`;
        } else if (numLogMag >= 9 && numLogMag < 12) {
            return `${(num / (10 ** 9)).toFixed(1)}B`;
        } else {
            return "N/A";
        }
    } else {
        return num;
    }
}

console.log(displayNum(0))

export default displayNum;