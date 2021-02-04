import { prisma } from "../../../generated/prisma-client";

export default {
  story: {
    files: ({ id }) => prisma.story({ id }).files(),
    user: ({ id }) => prisma.story({ id }).user(),
    seenUser: ({ id }) => prisma.story({ id }).user(),
    tagUser: ({ id }) => prisma.story({ id }).user(),
  }
};