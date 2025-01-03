function valEmail(e){
    const emailRegex = /^.{4,64}@.{4,256}\..{2,8}$/;
    return emailRegex.test(e);
}

function valName(n){
    const nameRegex = /^[a-zA-Z0-9]{4,16}$/;
    return nameRegex.test(n);
}

function valPw(p){
    const pwRegex = /^[a-zA-Z0-9]{8,64}$/;
    return pwRegex.test(p);
}


export { valEmail, valName, valPw };