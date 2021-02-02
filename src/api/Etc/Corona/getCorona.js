import { covid19 } from "../../../covid19";

export default {
    Query: { 
        covid19: async (_, args) => { 
            const { location } = args;
            const data = await covid19();
             console.log(location);
            const { newCase, countryName } = data[location];
            console.log(newCase);
            return { newCase, countryName };
        }
    }

}