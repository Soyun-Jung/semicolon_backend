import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        feedStories: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            let thereisstory = false;
           
            const gotstory=[];

            const following = await prisma.user({ id: user.id }).following();
            console.log(following);
            following.map(async follow => {
                thereisstory = await prisma.$exists.story({ user: { id: follow.id } }); 
                console.log(thereisstory);
                if (thereisstory) {
                    gotstory.push(follow.username);
                    console.log(gotstory);
                }
            }     
            );

            if (gotstory !== null || gotstory !== []) {
                return prisma.users({ where:{ username_in: gotstory } });
           }
        }
    }
}; 

