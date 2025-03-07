const valEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const valPw = (pw) => {
    if (pw.length === 0) {
        return "";
    }

    const passwordConditions = [
        {
            test: (pw) => pw.length >= 8 && pw.length <= 64,
            errorMessage: "password must be 8-64 characters long."
        },
        {
            test: (pw) => /[A-Z]/.test(pw),
            errorMessage: "password must contain at least one uppercase letter."
        },
        {
            test: (pw) => /[a-z]/.test(pw),
            errorMessage: "password must contain at least one lowercase letter."
        },
        {
            test: (pw) => /[0-9]/.test(pw),
            errorMessage: "password must contain at least one numeral."
        },
        {
            test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
            errorMessage: "password must contain at least one special character."
        },
        {
            test: (pw) => !/\s/.test(pw),
            errorMessage: "password must not contain spaces."
        }
    ];

    for (const condition of passwordConditions) {
        if (!condition.test(pw)) {
            return condition.errorMessage;
        }
    }
    return "";
};

const valName = (n) => {
    const nameRegex = /^[a-zA-Z0-9_]{4,16}$/;
    return nameRegex.test(n);
}

export { valEmail, valPw, valName };