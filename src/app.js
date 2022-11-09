import axios from "axios";

const countryList = document.getElementById('country-list');
// const countryImage = document.getElementById('country-flag')

//1. data fetchen

async function fetchDataCountries() {
    const URI = 'https://restcountries.com/v2/all'
    // const ENDPOINT = 'name'
    try {
        const response = await axios.get(URI)
        console.log(response.data);

        response.data.sort ((a, b) => (a.population - b.population));

            response.data.map((country) => {
                const itemName = document.createElement('li');
                const itemFlag = document.createElement('img');
                const itemPopulation = document.createElement('li');
                //maakt die een class element aan die je in styles kunt gebruiken
                itemName.setAttribute('class', 'countryName');
                itemFlag.setAttribute('class', 'countryImage');
                itemPopulation.setAttribute('class', 'countryPopulation');
                itemFlag.setAttribute('src', country.flag);
                itemPopulation.textContent = "population of : " + country.population;
                // sortPopulation(country.population)

                switch(country.region) {
                    case "Africa":
                        itemName.setAttribute('id', 'africa')
                        break;
                    case "Americas":
                        itemName.setAttribute('id', 'america')
                        break;
                    case "Asia":
                        itemName.setAttribute('id', 'asia')
                        break;
                    case "Europe":
                        itemName.setAttribute('id', 'europe')
                        break;
                    case "Oceania":
                        itemName.setAttribute('id', 'oceania')
                        break;
                    default:
                        itemName.setAttribute('id', 'notValid')
                    }

                itemName.textContent = country.name;

                // voeg alle items toe aan list
                countryList.appendChild(itemName);
                countryList.appendChild(itemFlag);
                countryList.appendChild(itemPopulation);

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
fetchDataCountries()