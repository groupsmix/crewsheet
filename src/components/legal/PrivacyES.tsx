import { site } from "../../lib/site";

export default function PrivacyES() {
  return (
    <>
      <p>
        Esta Política de Privacidad es una plantilla en lenguaje claro. <strong>Sustitúyela
        por una redacción revisada por tu abogado antes del lanzamiento.</strong> La
        estructura cubre lo que la mayoría de las jurisdicciones (EE. UU., UE/GDPR,
        California/CPRA, Reino Unido) esperan ver.
      </p>

      <h2>1. Quiénes somos</h2>
      <p>
        {site.name} opera en <a href={site.url}>{site.url.replace(/^https?:\/\//, "")}</a>.
        Escríbenos a <a href={`mailto:${site.emailContact}`}>{site.emailContact}</a> para
        cualquier pregunta de privacidad o solicitud de derechos.
      </p>

      <h2>2. Qué recolectamos</h2>
      <ul>
        <li><strong>Datos de cuenta / compra</strong> — nombre, correo, dirección de facturación, ID de transacción. Procesados por Stripe.</li>
        <li><strong>Datos de lead</strong> — correo y entradas de la calculadora si envías el formulario.</li>
        <li><strong>Uso</strong> — analítica respetuosa con la privacidad (página, país, dispositivo, referente) vía Google Analytics 4 y/o Plausible.</li>
        <li><strong>Soporte</strong> — los correos que nos envías.</li>
      </ul>

      <h2>3. Qué NO recolectamos</h2>
      <ul>
        <li>Nunca vemos el contenido de tu Google Sheet — vive en tu cuenta de Google.</li>
        <li>No vendemos ni alquilamos tus datos personales a nadie.</li>
        <li>No corremos píxeles publicitarios ni de remarketing de terceros.</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>Usamos las cookies mínimas necesarias. El banner de la primera visita te deja rechazar la analítica.</p>

      <h2>5. Bases legales (UE / Reino Unido)</h2>
      <p>Procesamos datos por (a) ejecución del contrato, (b) interés legítimo y (c) consentimiento — que puedes retirar cuando quieras.</p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes solicitar acceso, corrección, eliminación o copia de los datos que
        tenemos. Escríbenos a <a href={`mailto:${site.emailContact}`}>{site.emailContact}</a>{" "}
        y respondemos en 30 días. Residentes de California (CCPA/CPRA) también pueden
        oponerse a la venta de datos — algo que no hacemos.
      </p>

      <h2>7. Sub-procesadores</h2>
      <ul>
        <li>Stripe (pagos)</li>
        <li>Google (correo y Analytics)</li>
        <li>Proveedor de hosting / CDN</li>
      </ul>

      <h2>8. Retención</h2>
      <p>Compras: 7 años (impuestos). Leads: hasta que canceles. Analítica: 14 meses.</p>

      <h2>9. Menores</h2>
      <p>{site.name} no se dirige a menores de 16 años.</p>

      <h2>10. Cambios</h2>
      <p>Cambios materiales se anuncian en esta página y por correo con 14 días de antelación.</p>
    </>
  );
}
