import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        upload: async (_, args, { request }) => {
            isAuthenticated(request);

            const { caption, files, tagUser } = args;
            const { user } = request;

            const story = await prisma.createStory({
                tagUser: {
                    connect: {
                        username:tagUser
                    }
                },
                caption,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            });
            files.forEach( async file => await prisma.createFile({
                url: file,
                story: {
                    connect: {
                        id:story.id
                    }
                }
            }));
            return story;
        }
    }
}
