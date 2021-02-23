// import { prisma } from '../../../../generated/prisma-client';
// import { generateSecret, sendSecretMail } from '../../../utils';



// export default {
//     Mutation: {
//         requestSecret: async (_, args) => {
//             const { email } = args;
//             const loginSecret = generateSecret();
//             console.log(loginSecret);
//             try {
//                 //await sendSecretMail(email, loginSecret);
//                 await prisma.updateUser({ data: { loginSecret }, where: { email } });
//                 return true;
//             } catch (error) {
//                 console.log(error)
//                 return false;
//             }
//         }
//     }
// }
import { prisma } from '../../../../generated/prisma-client';
import { generateSecret, sendSecretMail } from '../../../utils';

export default {
    Mutation: {
        findrequestSecret: async (_, args) => {
            const { email } = args;
            console.log(email);
            const loginSecret = generateSecret();
            await prisma.updateUserLogin({ data: { loginSecret }, where: { email } })
            return true;
        }
    }
}