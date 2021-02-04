import { prisma } from "../../../generated/prisma-client";

export default {
  Story: {
    files: ({ id }) => prisma.story({ id }).files(),
    user: ({ id }) => prisma.story({ id }).user(),
    seenUsers: ({ id }) => prisma.story({ id }).user(),
    tagUser: ({ id }) => prisma.story({ id }).user(),
  }
};