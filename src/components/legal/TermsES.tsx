import { site } from "../../lib/site";

export default function TermsES() {
  return (
    <>
      <p>Plantilla en lenguaje claro. <strong>Reemplázala por términos revisados por tu abogado antes del lanzamiento.</strong></p>

      <h2>1. El producto</h2>
      <p>
        {site.name} es una plantilla de Google Sheet, un servicio opcional de setup y un
        add-on opcional mensual (Pro). No es un SaaS de contabilidad, asesoría legal ni
        fiscal. Tus datos viven en tu cuenta de Google.
      </p>

      <h2>2. Tu cuenta</h2>
      <p>Eres responsable de la exactitud de la información que nos das y de la seguridad de tu cuenta de Google.</p>

      <h2>3. Licencia</h2>
      <p>
        Al comprar recibes una licencia perpetua, mundial, no exclusiva e
        intransferible para usar, copiar y modificar la plantilla en tu negocio. No
        puedes revenderla como tu propio producto.
      </p>

      <h2>4. SMS / A2P 10DLC (solo Pro)</h2>
      <p>
        Los SMS comerciales automáticos en EE. UU. requieren registro A2P 10DLC. Al
        contratar el add-on autorizas el envío de mensajes en tu nombre dentro del
        volumen de tu plan.
      </p>

      <h2>5. Uso aceptable</h2>
      <p>No usarás {site.name} para mandar mensajes no solicitados, acosar clientes ni infringir leyes locales.</p>

      <h2>6. Reembolsos</h2>
      <p>Ver <a href="/es/refund/">Política de reembolso</a>.</p>

      <h2>7. Sin garantías</h2>
      <p>El producto se entrega "tal cual". Hacemos lo razonable por mantenerlo funcional pero no garantizamos que esté libre de errores.</p>

      <h2>8. Límite de responsabilidad</h2>
      <p>Hasta el máximo permitido por ley, nuestra responsabilidad total se limita a lo que pagaste en los últimos 12 meses.</p>

      <h2>9. Ley aplicable</h2>
      <p>Estos términos se rigen por las leyes de la jurisdicción donde está registrado {site.name}. Actualiza esta cláusula a tu jurisdicción real.</p>

      <h2>10. Contacto</h2>
      <p>Preguntas: <a href={`mailto:${site.emailContact}`}>{site.emailContact}</a>.</p>
    </>
  );
}
