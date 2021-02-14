import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmUser: async (_, arg) => {
            const { email, password } = arg;
            const filterUser = {
                AND: [
                    {
                        email: email
                    },
                    {
                        password: password
                    }
                ]
            };
            try {
                const existingUser = await prisma.$exists.user(filterUser);
                if (existingUser) {
                    console.log(existingUser);
                    const user = await prisma.user({ email })
                    return generateToken(user.id);
                } else {
                    return "TryAgain"
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}