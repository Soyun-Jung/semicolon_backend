import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        uploadStory: async (_, args, { request }) => {
            isAuthenticated(request);

            const { caption, files, tagUser } = args;
            const { user } = request;

            try {
                //태그한 사람이 있을 때
                if (tagUser) {
                    const [tag] = await prisma.user({ id: user.id }).following({ where: { username_in: tagUser } })
            
                    console.log(tag.username);

                    const story = await prisma.createStory({
                        tagUser: {
                            connect: {
                                username: tag.username
                            }
                        },
                        caption,
                        user: {
                            connect: {
                                id: user.id
                            }
                        }
                    });
                    files.forEach(async file => await prisma.createFile({
                        url: file,
                        story: {
                            connect: {
                                id: story.id
                            }
                        }
                    }));
                    return true;
                }
                //태그한 사람이 없을 때
                else {
                    const story = await prisma.createStory({
                        caption,
                        user: {
                            connect: {
                                id: user.id
                            }
                        }
                    });
                    files.forEach(async file => await prisma.createFile({
                        url: file,
                        story: {
                            connect: {
                                id: story.id
                            }
                        }
                    }));
                    return true;
                }
            }

            //태그를 잘못했을 때
            catch {
                return false;
             }
            
        }
    }
}
