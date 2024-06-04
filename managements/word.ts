import prisma from '@prisma/prisma';

export default class WordManagement {
  static create() {}

  static async findByName(name: string) {
    return await prisma.words.findFirst({ where: { value: name } });
  }
}
