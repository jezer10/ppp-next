import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const data = Array.from({ length: 4 }, (_, idx) => ({
    id: idx + 1,
    code: 201910523,
    fullName: faker.person.fullName(),
    cycle: faker.helpers.arrayElement(["VI", "VII", "VIII", "IX", "X"]),
    show: false,
    status: faker.helpers.arrayElement([0, 1, 2, 3]),
    jobTitle: faker.person.jobTitle(),
    supervisor: faker.person.fullName(),
    documents: [
      {
        name: "Carta de presentación",
        status: 0,
      },
      {
        name: "Carta de aceptación",
        status: 1,
      },
      {
        name: "Contrato",
        status: 2,
      },
    ],
  }));
  return NextResponse.json(data);
}
