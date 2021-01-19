import { prisma } from  "../../../../generated/prisma-client"
export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName = "", lastName = "", bio = "" } = args;
            // const existsName = await prisma.$exists.user({ username });
            // const existsEmail = await prisma.$exists.user({ email });
            // if (existsEmail) {
            //     throw Error("This email is already taken");
            //     retrun;
            // }
            // else if (existsName) {
            //     throw Error("This username is already taken");
            //     retrun;
            // }

            const exists = await prisma.$exists.user({
                OR: [{
                    username
                },
                    { email }
            ]
            });
            if (exists) {
                throw Error("This username / email is already taken");
            }
             await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
}