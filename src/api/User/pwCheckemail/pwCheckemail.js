import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        pwCheckemail: async (_, args) => {
            const { email } = args;

            const exists = await prisma.$exists.userLogin({ email });
            if (exists) {
                return true;
            } else {
                return false
            }
        }
    }
}