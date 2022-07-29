import {REQUEST_URL} from "./config.js";

const isRequired = value => value === '' ? false : true; // Check if value is empty
const isSpecifiedLength = (length, required) => length != required ? false : true; // Check if the length of value match the requirement

/**
 * get card informations from input box
 * verify data and call api
 * @param {*} event 
 */
function getInfo(event){
    event.preventDefault(); // Prevent submit button from submitting a form
    document.getElementById('result').innerText = ""; // clear result message

    // Verify data
    const isCardNumberValid = checkCardNumber(),
        isCSVValid = checkCSV(),
        isExpiryDataValid = checkExpiryData(),
        isPhoneNumberValid = checkPhoneNumber();

        const isFormValid = isCardNumberValid && isCSVValid && isExpiryDataValid && isPhoneNumberValid;

    //If data is valid make api call
    if(isFormValid){
        const cardInfo = {
            cardnumber: document.getElementById('cardNumber').value,
            csv: document.getElementById('csv').value,
            expirydata: document.getElementById('expiryData').value,
            phonenumber: document.getElementById('phoneNumber').value
        }
        callApi(cardInfo);
    }
}

/**
 * make a post api call and return result
 * @param {object} body 
 */
function callApi(body){
    fetch(REQUEST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        displayMsg(res.status);
    }).catch(err => {
        console.log(err)
    });
}


/**
 * assign value to result tag according to parameter
 * @param {number} msg 
 */
function displayMsg(msg){

    const result = document.getElementById('result');

    switch(msg){
        case 200:
            result.classList.remove('error');
            result.innerText = "Activation succes!!!";
            document.querySelector('form').reset();
            break;
        case 400:
            result.classList.add('error');
            result.innerText = "Activation failed, credit card information is not valid.";
            break;
        case 401:
            result.classList.add('error');
            result.innerText = "Activation failed, authkey is not valid.";
            break;
        default:
            result.classList.add('error');
            result.innerText = "Activation failed, Some error happend.";
            console.log(msg);
    }
}

/**
 * check if card number is valid
 * @return {Boolean}
 */
function checkCardNumber(){

    const cardNumberMsg = document.getElementById('cardNumberMsg');
    const value = document.getElementById('cardNumber').value;

    // Return false if number is empty
    if(!isRequired(value)){
        cardNumberMsg.classList.add('error');
        cardNumberMsg.innerText = "Card number is required";
        return false;
    }else if(!isSpecifiedLength(value.length, 16)){ // Return false if length of number is not 16
        cardNumberMsg.classList.add('error');
        cardNumberMsg.innerText = "Card number is not valid";
        return false;
    }else{
        cardNumberMsg.classList.remove('error');
        cardNumberMsg.innerText = "";
        return true;
    }
}

/**
 * check if card's CSV is valid
 * @return {Boolean}
 */
function checkCSV(){

    const csvMsg = document.getElementById('csvMsg');
    const value = document.getElementById('csv').value;

    // Return false if CSV is empty
    if(!isRequired(value)){
        csvMsg.classList.add('error');
        csvMsg.innerText = "CSV is required";
        return false;
    }else if(!isSpecifiedLength(value.length, 3)){ // Return false if length of CSV is not 3
        csvMsg.classList.add('error');
        csvMsg.innerText = "CSV is not valid";
        return false;
    }else{
        csvMsg.classList.remove('error');
        csvMsg.innerText = "";
        return true;
    }
}

/**
 * check if expiry data is valid
 * @return {Boolean}
 */

function checkExpiryData(){

    const expiryDataMsg = document.getElementById('expiryDataMsg');
    const value = document.getElementById('expiryData').value;

    const regex = /^(0[1-9]|1[0-2])([\d]{2})$/;

    // Return false if expiry data is empty
    if(!isRequired(value)){
        expiryDataMsg.classList.add('error');
        expiryDataMsg.innerText = "Expiry date is required";
        return false;
    }else if(!isSpecifiedLength(value.length, 4)){ // Return false if length of expiry data is not 4
        expiryDataMsg.classList.add('error');
        expiryDataMsg.innerText = "Expiry date is not valid";
        return false;
    }else if(!value.match(regex)){ // Return false if format of expiry data is match the regex
        expiryDataMsg.classList.add('error');
        expiryDataMsg.innerText = "Expiry date is not valid";
    }else{
        expiryDataMsg.classList.remove('error');
        expiryDataMsg.innerText = "";
        return true;
    }
}

/**
 * check if phone number is valid
 * @return {Boolean}
 */
function checkPhoneNumber(){

    const phoneNumberMsg = document.getElementById('phoneNumberMsg');
    const value = document.getElementById('phoneNumber').value;

    // Return false if phone number is empty
    if(!isRequired(value)){
        phoneNumberMsg.classList.add('error');
        phoneNumberMsg.innerText = "Phone number is required";
        return false;
    }else if(!isSpecifiedLength(value.length, 10)){ // Return false if length of phone number is not 10
        phoneNumberMsg.classList.add('error');
        phoneNumberMsg.innerText = "Phone number is not valid";
        return false;
    }else{
        phoneNumberMsg.classList.remove('error');
        phoneNumberMsg.innerText = "";
        return true;
    }
}

// Add event listener to HTML elements
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnActive').addEventListener('click', getInfo);
    document.getElementById('cardNumber').addEventListener('blur', checkCardNumber);
    document.getElementById('csv').addEventListener('blur', checkCSV);
    document.getElementById('expiryData').addEventListener('blur', checkExpiryData);
    document.getElementById('phoneNumber').addEventListener('blur', checkPhoneNumber);
});