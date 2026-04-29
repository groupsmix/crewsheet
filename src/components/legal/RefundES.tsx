import { site } from "../../lib/site";

export default function RefundES() {
  return (
    <>
      <p>Plantilla en lenguaje claro. <strong>Ajusta a tu política real antes del lanzamiento.</strong></p>

      <h2>Plantilla DIY — $97</h2>
      <p>
        14 días, sin preguntas. Si la plantilla no es lo que esperabas, escribe a{" "}
        <a href={`mailto:${site.emailContact}`}>{site.emailContact}</a> y te
        reembolsamos.
      </p>

      <h2>Setup Hecho-Por-Nosotros — $497</h2>
      <ul>
        <li><strong>100%</strong> antes de la llamada de setup.</li>
        <li><strong>50%</strong> dentro de los 7 días posteriores.</li>
        <li>Después de 7 días el setup no es reembolsable, pero la licencia de la plantilla DIY queda tuya para siempre.</li>
      </ul>

      <h2>Suscripciones</h2>
      <p>
        Ninguna. {site.name} se vende como pagos únicos. No te cobramos recurrentemente
        por nada.
      </p>

      <h2>Disputas / contracargos</h2>
      <p>Por favor escríbenos primero — somos un equipo pequeño y reembolsamos rápido.</p>
    </>
  );
}
