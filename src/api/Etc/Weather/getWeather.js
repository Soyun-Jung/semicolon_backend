import { getWeather } from "../../../weather";

export default {
  Query: {
        weather: (_, arg) => {
          const { latitude, longitude } = arg; 
          console.log(latitude, longitude);
          return getWeather(latitude, longitude);
        },
  }
};