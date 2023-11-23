import Image from "next/image";

export default function ValidateDocumentEmail(props: any) {
  const { fullName, observaciones } = props;
  return (
    <div>
      <h2>Aceptación de Documento</h2>
      <p>Estimado/a {fullName},</p>

      <p>Felicitaciones, simplemente bendiciones {observaciones}</p>

      <blockquote>
        <strong>Observaciones:</strong>
        <p>${observaciones ?? "No Cuentas Con Observaciones"}</p>
      </blockquote>

      <p>
        Por favor, realiza las correcciones necesarias y vuelve a enviar el
        documento. Si tienes alguna pregunta o necesitas asistencia adicional,
        no dudes en ponerte en contacto con nosotros.
      </p>

      <p>Gracias por tu comprensión y cooperación.</p>

      <p>Atentamente, David Reyna Prácticas Pre Profesionales</p>

      <div className="flex w-full">
        <img
          src="https://upeu.edu.pe/wp-content/uploads/2022/04/logo-upeu-dark-svg.svg"
          alt="Logo UPeU"
          className="w-1/2"
        />
        <img
          src="https://sites.google.com/a/upeu.pe/darwin/_/rsrc/1472783564060/inicio/LOGO-SISTEMAS0.png"
          alt="Logo Sistemas"
          className="w-1/2"
        />
      </div>
    </div>
  );
}
