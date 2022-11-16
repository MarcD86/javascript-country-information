import axios from "axios";

const countryList = document.getElementById('country-list');
// const countryImage = document.getElementById('country-flag')

//1. data fetchen

//
// const usernameInputField = document.getElementById('input-search');

async function fetchDataSearch(countryName) {

    // const URI = 'https://restcountries.com/v2/name/${countryName}'
    const response = await axios.get(`https://restcountries.com/v2/name/${countryName}`)


      try {

        // console.log(response.data);

        response.data.sort ((a, b) => (a.population - b.population));

        //empty after search
        countryList.replaceChildren();

        response.data.map((country) => {
            const {flags:{png}, name, capital, subregion, currencies, population, languages} = country;

            //country names;
            const itemName = document.createElement('p');
            itemName.setAttribute('class', 'countryName');
            itemName.textContent = name;

            //flags
            const itemPopulation = document.createElement('p');
            itemPopulation.setAttribute('class', 'countryPopulation');
            itemPopulation.textContent = "population of : " + population;

            // sortPopulation(country.population)
            const itemFlag = document.createElement('img');
            itemFlag.setAttribute('class', 'countryImage');
            itemFlag.setAttribute('src', png);

            //make array list of needed names.
            let coinString;
            const coinArray = currencies.map((coin) => {
                return coin.name;
            })
            // print strings
            if (currencies.length === 1) {
                coinString = `you can pay with ${coinArray[0]}`;
            }else if(currencies.length === 2) {
                coinString = `you can pay with ${coinArray[0]} and ${coinArray[1]}`;
            } else {
                coinString = `you can pay with ${coinArray[0]}, ${coinArray[1]} and ${coinArray[2]}`
            }
            // let languagesString;
            // const languagesArray= languages.map((lan) => {
            //     return lan.name;
            // })
            const itemCurrency = document.createElement('p');
            itemCurrency.textContent = coinString;


            // voeg alle items toe aan list
            countryList.appendChild(itemName);
            countryList.appendChild(itemFlag);
            countryList.appendChild(itemPopulation);
            countryList.appendChild(itemCurrency)


        })
    }
    catch (err) {
        console.error(err);
        const errorMessage = document.getElementById('error-message');
        //check welke error message van toepassing is
        if (err.response.status === 404) {
            errorMessage.textContent = "Page not found | 404";
        }
        if (err.response.status === 500) {
            errorMessage.textContent = "Internal Server Error | 500";
        }
    }
}

let value = "";
function textValue(input) {
    value = input.target.value;
}

const userInput = document.getElementById("input-search");
userInput.addEventListener("keyup", textValue);
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("button").click();
        fetchDataSearch(value);
        userInput.value = "";
    }
});

const button = document.getElementById("search");
button.addEventListener("click", ()=> {
    fetchDataSearch(value)
    userInput.value = "";
})




