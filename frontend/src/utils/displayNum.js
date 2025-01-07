const displayNum = (num) => {
    if (typeof(num) === 'number'){
        if (Math.log10(num) < 3) {
            return num;
        } else if (Math.log10(num) >= 3 && Math.log10(num) < 6) {
            return `${(num / (10 ** 3)).toFixed(1)}K`;
        } else if (Math.log10(num) >= 6 && Math.log10(num) < 9) {
            return `${(num / (10 ** 6)).toFixed(1)}M`;
        } else if (Math.log10(num) >= 9 && Math.log10(num) < 12) {
            return `${(num / (10 ** 9)).toFixed(1)}B`;
        } else {
            return "N/A";
        }
    } else {
        return num;
    }
}

export default displayNum;