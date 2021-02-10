import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        feedStories: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const sliejls=[];

            const following = await prisma.user({ id: user.id }).following();
            
            const gotstory = await prisma.stories({ where: { user: { username_in: following.username } } }).user();
            
            gotstory.map(info => {
                if (info.user.id !== user.id) {
                        sliejls.push(info.user)
                  }  
            })
            
            console.log(sliejls)
            return sliejls;
                
        }
    }
}; 