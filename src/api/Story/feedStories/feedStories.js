import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        feedStories: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const sliejls=[];

            const following = await prisma.user({ id: user.id }).following();
            
            //const gotstory = await prisma.users({where:{}})
            const gotstory = await prisma.stories({ where: { user: { username_in: following.username } } }).user();
            
            gotstory.map(info => {
                if (info.user.id !== user.id) {
                    // if (같으면) {
                            sliejls.push(info.user)
                        // }
                  }  
            })
            //console.log(sliejls);
            const seen = new Set();
            const filteredArr = sliejls.filter(el => {
                const duplicate = seen.has(el.id);
                     seen.add(el.id);
                 return !duplicate;
           });
            console.log(filteredArr);
            return filteredArr;
        }
    }
}; 