import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

//굳이 이렇게 써 줄 필요는 없지만 더 안정적임.
const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
    Mutation:{
        editPost: async (_, args, { request }) => {
            isAuthenticated(request);
            const { caption, location, id, action } = args;
            const { user } = request;
            
            const post = await prisma.$exists.post({                
                id,
                user: {
                    id: user.id
                }               
            });

            if (post) {
                if (action === EDIT) {
                    return prisma.updatePost(
                        {
                            data: {
                                location, caption
                            },
                            where: { id }
                        }
                    );
                } else if (action === DELETE) {
                    return prisma.deletePost({ id });
                }                
            } else {
                throw Error();
            }
        }
    }
}