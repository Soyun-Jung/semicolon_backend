import { getRecommendation } from "../../../recommendation";
import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: { 
        getRecommendation: async(_, __, { request }) => { 
            isAuthenticated(request);
            const { user: { id } } = request;
            const data = await getRecommendation();
            const arr = data[id]
            const recoPosts = arr.map(async(a) => { 
               return await prisma.post({id:a})
            })
            
            return recoPosts;
        }
    }
}