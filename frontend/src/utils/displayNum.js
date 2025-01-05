const displayNum = (num) => {
    if (Math.log10(num) < 3) {
        return num;
    } else if (3 <= Math.log10(num) < 6) {
        return `${(num / (10 ** 3)).toFixed(1)}K`;
    } else if (6 <= Math.log10(num) < 9) {
        return `${(num / (10 ** 6)).toFixed(1)}M`;
    } else if (9 <= Math.log10(num) < 12) {
        return `${(num / (10 ** 9)).toFixed(1)}B`;
    } 
}

export default displayNum;