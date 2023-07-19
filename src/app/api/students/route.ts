import { faker } from '@faker-js/faker';

export async function GET(req: Request): Promise<any> {
  return Array.from({ length: 4 }, (_, idx) => ({
    id: idx + 1,
    code: 201910523,
    fullName: faker.person.fullName(),
    cycle: faker.helpers.arrayElement(['VI', 'VII', 'VIII', 'IX', 'X']),
    show: false,
    documents: [
      {
        name: 'Carta de presentación',
        status: 0,
      },
      {
        name: 'Carta de aceptación',
        status: 1,
      },
      {
        name: 'Contrato',
        status: 2,
      },
    ],
  }));
}
