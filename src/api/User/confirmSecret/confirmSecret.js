import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        comfirmSecret: async (_, args, { request }) => {
            console.log(request.user);
            const { email, secret } = args;
            const user = await prisma.user({ email });
            if (user.loginSecret === secret) {
                return generateToken(user.id);
            } else {
                throw Error("이메일이랑 비밀번호랑 다름 🤐");
            }
        }
    }
}
