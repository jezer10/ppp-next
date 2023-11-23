import { NextResponse } from "next/server";
import { Resend } from "resend";
import RejectDocumentEmail from "@/components/templates/RejectDocumentEmail";
const MAIN_EMAIL = "christianatencio@upeu.edu.pe";
const RESEND_KEY = "re_RD2L1uQK_MP9tuokbb2QumngwzYqLmQ2z";

const resend = new Resend(RESEND_KEY);

export async function POST(req: Request) {
  try {
    const { observaciones, fullName } = await req.json();
    const data = await resend.emails.send({
      from: `Prácticas <${MAIN_EMAIL}>`,
      to: ["jezerrazuri@upeu.edu.pe"],
      subject: "Documento Rechazado",
      react: RejectDocumentEmail({
        observaciones,
        fullName,
      }),
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
