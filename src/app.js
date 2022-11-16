import axios from "axios";

const countryList = document.getElementById('country-list');
// const countryImage = document.getElementById('country-flag')

//1. data fetchen

console.log("test tekst")

// const usernameInputField = document.getElementById('input-search');

async function fetchDataCountries() {
    const URI = 'https://restcountries.com/v2/all'
    // const ENDPOINT = 'name'
    try {
        const response = await axios.get(URI)
        console.log(response.data);

        response.data.sort ((a, b) => (a.population - b.population));


            response.data.map((country) => {

                const container = document.createElement('li')
                container.setAttribute('class', 'container-list')
                //country names;
                const itemName = document.createElement('p');
                itemName.setAttribute('class', 'countryName');
                //flags
                const itemPopulation = document.createElement('p');
                itemPopulation.setAttribute('class', 'countryPopulation');
                itemPopulation.textContent = "population of : " + country.population;
                // sortPopulation(country.population)
                const itemFlag = document.createElement('img');
                itemFlag.setAttribute('class', 'countryImage');
                itemFlag.setAttribute('src', country.flag);


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
                container.appendChild(itemName);
                container.appendChild(itemFlag);
                container.appendChild(itemPopulation);

                countryList.appendChild(container)

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