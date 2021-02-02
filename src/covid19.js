import axios from 'axios';

const covidKey = process.env.COVID_KEY;

export const covid19 = async () => { 
    try {
        const { data } = await axios.get(`https://api.corona-19.kr/korea/country/new/?serviceKey=${covidKey}`);
        return data;
    } catch (e) { 
        console.log(e)
    }
    return;
}