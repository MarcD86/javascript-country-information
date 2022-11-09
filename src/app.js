import axios from 'axios';

// Async - await Full data
async function fetchData() {
    try {
        const result = await axios.get('https://restcountries.com/v2/all');
        console.log(result)
    } catch(error) {
        console.error(error);
    }
}
fetchData();
