const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector(".exchange-btn");
const info = document.querySelector(".info");
const msg = info.querySelector("p");

for (let select of dropdowns){
    for (currcode in countryList){
        const newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD"){
            newOption.selected = true;
        } else if (select.name === "to" && currcode === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        upadateFlag(evt.target);
    });
}

/*The same event listener can be attached to multiple elements. 
The target property allows you to determine which specific element triggered the event.*/ 


const upadateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


const upadateExchangeRate = async () => {
    let amount = document.querySelector(".amt input");
    let amtVal = amount.value;
    if (amtVal==="" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    upadateExchangeRate();
});

window.addEventListener("load", () => {
    upadateExchangeRate();
});

