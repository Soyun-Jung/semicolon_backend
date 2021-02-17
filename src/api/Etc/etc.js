import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        files: ({ id }) => prisma.post({ id }).files()
    }
}