import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";
import { isAuthenticated } from "../../../middlewares";

export default {
    Query: {
        me: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const userProfile = await prisma.user({ id: user.id })
            const posts = await prisma.user({ id: user.id }).posts();
            const followings = await prisma.user({ id: user.id }).following();
            const followers = await prisma.user({ id: user.id }).followers();

            return { user:userProfile, posts,followings, followers }
        }  
    }
}

//Fragment 사용할 때
// export default {
//     Query: {
//         me: async (_, __, { request }) => {
//             isAuthenticated(request);
//             const { user } = request;
//             const userProfile = await prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
//             return userProfile;
//         }
//     }
// }