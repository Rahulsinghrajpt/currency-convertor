const BaseUrl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currcode of Object.keys(countryList)) {
        let newoption = document.createElement("option");
        newoption.innerHTML = currcode;
        newoption.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            newoption.selected = true;  // Set as boolean true
        } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = true;  // Set as boolean true
        } else {
            newoption.selected = false; // Make sure other options are not selected
        }

        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
   let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newsrc;
    

};
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    //console.log(fromcurr.value,tocurr.value);
    
     const URL=`${BaseUrl}/${fromcurr.value.toLowerCase()}.json`;

    let response=await fetch(URL);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalAmount = amtval * rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
    console.log(response);
    
});
