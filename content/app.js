// const axios = require('axios')
const API = "https://tw.rter.info/capi.php";


let select1 = document.getElementById('From')
let select2 = document.getElementById('To');
let defaultIdx;

axios.get('./currencies.json')
    .then( response => response.data)
    .then(async data => {
        await data.forEach(el => {
            let options = document.createElement('option');
            options.value = el.CurrencyCode;
            options.text = el.CurrencyCnName;
            // console.log(options);
            // select1.appendChild(options);
            select2.appendChild(options);
        })
    })
axios.get('./currencies.json')
    .then( response => response.data)
    .then(async data => {
        await data.forEach((el, i) => {
            let options = document.createElement('option');
            options.value = el.CurrencyCode;
            options.text = el.CurrencyCnName;
            if (options.value == "NTD") defaultIdx = i;
            select1.appendChild(options);
        })
    }).then(()=>{
        select1.options[defaultIdx].selected = true;
    })



const changeCurrency = async () => {
    let From = select1.options[select1.selectedIndex].value;
    let To = select2.options[select2.selectedIndex].value;
    let FromN = document.getElementById("FromNum").value;
    let tmpTo;
    let rate;
    console.log(`From: ${From}, To: ${To}`)
    if (From != "USD") {
        tmpTo = From;
        From = "USD"
        rate = await getRate(From, tmpTo);
        console.log(rate)
        FromN = parseInt(FromN) / parseFloat(rate);
    }
    tmpTo = To;
    rate = await getRate(From, tmpTo);
    document.getElementById('ToNum').value = parseFloat(FromN) * parseFloat(rate);
}

const getRate = async (from, to) => {
        return await axios(API)
            .then( response => response.data)
            .then( data => data[from+to].Exrate)
            .then(exrate=> exrate)
}

document.getElementById('changebtn').addEventListener('click', (e)=> {
    let tmpIndex = select2.selectedIndex;
    select2.options[select1.selectedIndex].selected = true;
    select1.options[tmpIndex].selected = true;
    changeCurrency();
})