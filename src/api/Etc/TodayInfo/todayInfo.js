import { getWeather } from "../../../weather";
import { covid19 } from "../../../covid19";

export default {
    Query: { 
        todayInfo: async (_, args) => { 
            const { location, latitude, longitude } = args;
            console.log(location,latitude,longitude)
            const covidData = await covid19();
            const { temp, weather } = await getWeather(latitude, longitude);
            const { newCase, countryName } = covidData[location];
            return { newCase, countryName, temp, weather };
        }
    }

}
