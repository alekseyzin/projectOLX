const toggleError = (id: string, isValid: boolean) => {
    const elem = document.querySelector(`#${id}`);
    if (isValid) {
        elem?.classList.remove('invalid');
        elem?.classList.add('valid');
        return true
    } else {
        elem?.classList.add('invalid');
        elem?.classList.remove('valid');
        return false
    }
}

export const checkLengthInput = (
    inputValue: string,
    id: string,
    minLength: number,
    maxLength: number,
    setState: React.Dispatch<React.SetStateAction<string>>
) => {    
    if (maxLength) {
        inputValue.length < maxLength && setState(inputValue);
    } else {
        setState(inputValue);
    }
    const isValid = !(minLength && inputValue.length < minLength);
    return toggleError(id, isValid);
}

export const checkEmail = (id:string, email:string) => {
    const isEmail = !!email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
    return toggleError(id, isEmail);
}

export const checkPhones = (id:string, phones:string) => {
    const  phonesArr = phones.split(',');
    let isPhones = true;
    for (let phone of phonesArr) {
        if (!phone.trim().match(/^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)){
            isPhones = false;
        }  
    }
    return toggleError(id, isPhones);
}