const ellipsis = (s, maxLen) => {
    if (s.length > maxLen) {
        return s.substring(0, maxLen - 1) + "...";
    } else {
        return s;
    }
}

export default ellipsis