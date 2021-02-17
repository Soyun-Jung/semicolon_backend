import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchPost: async (_, args) => {
            const { term } = args;
            try {
                return prisma.posts({
                    where: {
                        OR: [
                            { location_starts_with: term },
                            {
                                hashes_some: {
                                    tag: term
                                }
                            }
                        ]
                    }
                })
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
}