import { site } from "./site";
export type { Lang } from "./site";

export const dict = {
  en: {
    nav_features: "Features",
    nav_demo: "Live demo",
    nav_pricing: "Pricing",
    nav_faq: "FAQ",
    cta_buy: "Get the template — $97",
    cta_demo: "Book a 15-min demo",

    hero_eyebrow: "For solo & 2-crew residential cleaners",
    hero_title_1: "Run your whole cleaning business",
    hero_title_2: "from one Google Sheet.",
    hero_sub:
      "Stop losing customers to missed follow-ups. CrewSheet turns a Sheet into a phone app for your jobs, customers, quotes and money. Set up in under an hour. 1/5th the cost of Jobber.",
    hero_bullets: [
      "Today's route + check-in/out + checklists",
      "Auto SMS: on-the-way, post-job receipt, recurring confirmations",
      "Public quote form → Stripe Checkout link",
      "You own the data. Edit the Sheet, the app updates.",
    ],
    hero_trust: "Built for solo cleaners billing $4K–$20K/mo.",

    pain_title: "“You quoted a job last Tuesday and can't remember if you followed up.”",
    pain_sub:
      "Every missed follow-up is $200/month walking out the door. CrewSheet plugs the holes.",
    pain_items: [
      {
        h: "Missed follow-ups",
        p: "Quotes sit in your texts. CrewSheet auto-pings the customer 24h after a quote with the Stripe link.",
      },
      {
        h: "Forgotten reviews",
        p: "Post-job SMS sends your Google Review link the moment you check out. 4× more reviews, no awkward asks.",
      },
      {
        h: "No-shows on recurring jobs",
        p: "3 days before every recurring clean: auto-confirm SMS. Cancellations move to the gap list, not lost revenue.",
      },
      {
        h: "Cash chaos at tax time",
        p: "Cash, Venmo, Stripe — all stamped to the Sheet automatically. One-tap CSV for the accountant.",
      },
    ],

    demo_title: "Try it. Right here.",
    demo_sub:
      "This is the actual app on a phone. Tap the tabs. Tap a job. It's not a video.",
    demo_caption:
      "Your customers don't see this. They only see clean SMS messages, a quote link and your Google Review request.",

    how_title: "How it works",
    how_steps: [
      {
        n: "1",
        h: "Your data lives in a Google Sheet",
        p: "6 tabs: Customers, Jobs, Quotes, Supplies, Payments, Settings. You can see every row. You trust it because it's just a Sheet.",
      },
      {
        n: "2",
        h: "Your phone is the app",
        p: "Glide / AppSheet renders 4 screens from your Sheet. Today's Route, Customer Book, Quotes, Money. Works on the cheapest Android.",
      },
      {
        n: "3",
        h: "Apps Script does the boring stuff",
        p: "Time-stamp check-ins. Send the SMS. Email the Sunday summary. Generate Stripe links. You don't touch any of it.",
      },
    ],

    pricing_title: "Pricing that actually makes sense",
    pricing_sub:
      "We don't charge you forever for software you set up once. Pick the path that fits.",
    pricing_diy: {
      tag: "Most popular",
      h: "DIY Template",
      price: "$97",
      sub: "one-time",
      bullets: [
        "Google Sheet template (6 tabs, formulas, sample data)",
        "Glide app pre-built — copy in 1 click",
        "All 4 phone screens",
        "Apps Script automations bundled",
        "15-min Loom walkthrough + setup checklist",
        "Lifetime updates to the template",
      ],
      cta: "Get the template",
    },
    pricing_dfy: {
      tag: "Save the weekend",
      h: "Done-For-You Setup",
      price: "$497",
      sub: "one-time",
      bullets: [
        "Everything in DIY",
        "We set it up under your Google account on a 30-min Zoom",
        "We import your existing customers (CSV or screenshot)",
        "We connect your Stripe + Twilio + Google Voice",
        "30 days of email support",
      ],
      cta: "Book setup call",
    },
    pricing_pro: {
      tag: "Add-on",
      h: "Pro Updates + SMS",
      price: "$29",
      sub: "/mo",
      bullets: [
        "500 SMS credits/mo (Twilio A2P 10DLC included)",
        "New automations as we ship them",
        "Priority support (24h)",
        "Cancel anytime, your Sheet keeps working",
      ],
      cta: "Add Pro",
    },
    pricing_disclaimer:
      "Real talk: this is not a $149/mo SaaS dressed up. It's a template + setup. Your Sheet is yours forever.",

    compare_title: "vs. Jobber, Housecall Pro, ZenMaid",
    compare_cols: ["", "CrewSheet", "Jobber", "Housecall Pro", "ZenMaid"],
    compare_rows: [
      ["Monthly cost", "$0–$29", "$149", "$59", "$39"],
      ["You own the data", "Yes (your Sheet)", "No", "No", "No"],
      ["Setup time", "40 min", "Hours", "Hours", "Hours"],
      ["Edit fields yourself", "Yes (add a column)", "No", "No", "No"],
      ["Works offline-tolerant on cheap Android", "Yes", "OK", "OK", "OK"],
      ["Locked into vendor", "No", "Yes", "Yes", "Yes"],
    ],

    calc_title: "How much you'd save vs Jobber",
    calc_sub: "Be honest about your numbers. We'll do the math.",
    calc_jobs_label: "Jobs per week",
    calc_avg_label: "Avg ticket ($)",
    calc_today: "Your monthly software cost today (Jobber Connect)",
    calc_crewsheet: "CrewSheet (DIY + Pro SMS)",
    calc_save: "You save",
    calc_save_yr: "per year",
    calc_email_label: "Email me the breakdown + Cleaning Business Pricing Cheat Sheet (PDF)",
    calc_email_placeholder: "you@cleaningbiz.com",
    calc_email_cta: "Send me the cheat sheet",
    calc_email_thanks: "Got it — check your inbox in 60 seconds.",

    proof_title: "Real cleaners. Real Sheets.",
    proof_disclaimer: "Paraphrased with permission. Real names and photos as we collect them.",
    proof_empty: "We're collecting case studies from launch users. Yours could be the first — grab the template and tell us how it goes.",
    proof_empty_cta: "Get the template",
    proof_items: [
      {
        name: "Maria S.",
        biz: "Sparkle House — Houston, TX",
        quote:
          "I had 38 recurring clients in a notebook. Set up CrewSheet in a Saturday morning. The auto-confirm SMS alone got me 3 cancellations back in the first month — that's $720.",
        stat: "$11,400/mo",
      },
      {
        name: "Daniel O.",
        biz: "Two-Person Crew — Newark, NJ",
        quote:
          "Jobber was $149 and my wife refused to use the app. She uses CrewSheet because it's a Sheet she can read. We dropped Jobber.",
        stat: "Saved $1,788/yr",
      },
      {
        name: "Yelena P.",
        biz: "Airbnb Turnover — Miami, FL",
        quote:
          "The Stripe quote link is unfair. I send it after the walkthrough and I'm booked before I'm back in the car.",
        stat: "62% quote→book",
      },
    ],

    faq_title: "Honest answers to the questions you're actually thinking",
    faq: [
      {
        q: "I don't really know Google Sheets. Can I still do this?",
        a: "If you can type a customer's name into a row, you're fine. The template comes with sample data, every column has a tooltip, and the 15-min Loom walks you through it. If you want zero typing, take the Done-For-You option.",
      },
      {
        q: "What about SMS — isn't there some new US 10DLC rule?",
        a: "Yes, and we're not going to lie about it. To send automated business SMS in the US you need A2P 10DLC registration (1–3 weeks, ~$20 setup, fractions of a cent per message). Pro includes 500 credits/mo with that already handled. Or you can use your own Twilio account — we'll point at it.",
      },
      {
        q: "Is this really a SaaS, or is it a template?",
        a: "It's a template + setup, sold honestly. Your data lives in your Google Sheet, in your Google account. If we disappeared tomorrow, your business keeps running. The $29/mo Pro is for SMS credits + new automations — cancel anytime.",
      },
      {
        q: "Can I cancel? What about refunds?",
        a: "DIY: 14-day no-questions refund. Done-For-You: 100% refund before the setup call, 50% within 7 days after. Pro: cancel anytime, your Sheet and app keep working — you just lose the SMS credits.",
      },
      {
        q: "What if I have 2 cleaners on different phones?",
        a: "Both phones share the same Sheet. Each cleaner sees their own route. Glide free tier covers up to 10 users. Above that, the per-user cost is real — we'll tell you exactly what to expect (no surprises).",
      },
      {
        q: "Will my customers' phone numbers and addresses be safe?",
        a: "Your Sheet lives in your Google account. We never see it. SMS goes through your Twilio account (or ours, with your permission). No third-party DB, no scraping.",
      },
    ],

    founder_title: "Why I'm the one building this",
    founder_p1:
      "I'm not a cleaner. I'm a builder who watched my mom run a 2-person cleaning crew on Post-its for 12 years. She tried Jobber. She quit Jobber in 9 days. The reason was simple: the app didn't show her the data. A Sheet does.",
    founder_p2:
      "CrewSheet is the tool I wish I'd built her in 2018. It's not glamorous. It is honest, cheap, and yours forever.",
    founder_sign: `— ${site.founderName}, ${site.founderTitle}`,

    aff_title: "Cleaning-biz coaches: 30% commission, lifetime",
    aff_sub:
      "If you teach cleaners (Chris Mondragon / Angela Brown style audiences), join the affiliate program. Pre-made swipe copy, demo Loom, and a clean dashboard.",
    aff_cta: "Apply as an affiliate",

    foot_made: "Made for solo cleaners. Not VC-backed. Not for sale.",
    foot_terms: "Terms",
    foot_privacy: "Privacy",
    foot_refund: "Refund policy",
    foot_contact: "Contact",
  },
  es: {
    nav_features: "Funciones",
    nav_demo: "Demo",
    nav_pricing: "Precios",
    nav_faq: "Preguntas",
    cta_buy: "Llévate la plantilla — $97",
    cta_demo: "Reserva demo de 15 min",

    hero_eyebrow: "Para limpiadores residenciales solos o equipos de 2",
    hero_title_1: "Lleva todo tu negocio de limpieza",
    hero_title_2: "desde un solo Google Sheet.",
    hero_sub:
      "Deja de perder clientes por seguimientos olvidados. CrewSheet convierte un Sheet en una app de teléfono para trabajos, clientes, cotizaciones y dinero. Listo en menos de una hora. La quinta parte del costo de Jobber.",
    hero_bullets: [
      "Ruta del día + entrada/salida + listas de tareas",
      "SMS automáticos: en camino, recibo, confirmación recurrente",
      "Formulario público de cotización → enlace Stripe",
      "Tus datos son tuyos. Editas el Sheet, la app se actualiza.",
    ],
    hero_trust: "Hecho para limpiadores que facturan $4K–$20K/mes.",

    pain_title: "“Cotizaste un trabajo el martes y no recuerdas si diste seguimiento.”",
    pain_sub:
      "Cada seguimiento perdido son $200/mes que se van por la puerta. CrewSheet tapa los huecos.",
    pain_items: [
      {
        h: "Seguimientos perdidos",
        p: "Las cotizaciones se quedan en tus mensajes. CrewSheet manda un SMS 24h después con el enlace de Stripe.",
      },
      {
        h: "Reseñas olvidadas",
        p: "SMS al terminar con tu enlace de Google Reviews. 4× más reseñas, sin pedirlas en persona.",
      },
      {
        h: "Trabajos recurrentes que no se confirman",
        p: "3 días antes de cada limpieza recurrente: SMS automático de confirmación. Las cancelaciones van a la lista de huecos, no a pérdida.",
      },
      {
        h: "Caos de efectivo en impuestos",
        p: "Efectivo, Venmo, Stripe — todo se marca al Sheet automáticamente. CSV en un toque para tu contador.",
      },
    ],

    demo_title: "Pruébalo. Aquí mismo.",
    demo_sub: "Esta es la app real en un teléfono. Toca las pestañas. Toca un trabajo. No es un video.",
    demo_caption:
      "Tus clientes no ven esto. Solo reciben mensajes claros, un enlace de cotización y tu pedido de reseña.",

    how_title: "Cómo funciona",
    how_steps: [
      {
        n: "1",
        h: "Tus datos viven en un Google Sheet",
        p: "6 pestañas: Clientes, Trabajos, Cotizaciones, Insumos, Pagos, Configuración. Ves cada fila. Confías porque es un Sheet.",
      },
      {
        n: "2",
        h: "Tu teléfono es la app",
        p: "Glide / AppSheet muestra 4 pantallas desde tu Sheet. Funciona en el Android más barato.",
      },
      {
        n: "3",
        h: "Apps Script hace lo aburrido",
        p: "Marca entradas. Manda los SMS. Manda el resumen del domingo. Genera enlaces de Stripe. Tú no tocas nada.",
      },
    ],

    pricing_title: "Precios que tienen sentido de verdad",
    pricing_sub:
      "No te cobramos para siempre por algo que se configura una vez. Elige el camino que te queda.",
    pricing_diy: {
      tag: "Más popular",
      h: "Plantilla DIY",
      price: "$97",
      sub: "pago único",
      bullets: [
        "Plantilla de Google Sheet (6 pestañas, fórmulas, datos de ejemplo)",
        "App Glide pre-armada — copias en 1 clic",
        "Las 4 pantallas del teléfono",
        "Automatizaciones de Apps Script incluidas",
        "Loom de 15 min + checklist de setup",
        "Actualizaciones de la plantilla de por vida",
      ],
      cta: "Llévate la plantilla",
    },
    pricing_dfy: {
      tag: "Salva el fin de semana",
      h: "Setup Hecho-Por-Nosotros",
      price: "$497",
      sub: "pago único",
      bullets: [
        "Todo lo del DIY",
        "Lo armamos en tu cuenta de Google en un Zoom de 30 min",
        "Importamos tus clientes (CSV o foto)",
        "Conectamos Stripe + Twilio + Google Voice",
        "30 días de soporte por email",
      ],
      cta: "Reserva el setup",
    },
    pricing_pro: {
      tag: "Add-on",
      h: "Pro Updates + SMS",
      price: "$29",
      sub: "/mes",
      bullets: [
        "500 créditos SMS/mes (Twilio A2P 10DLC incluido)",
        "Nuevas automatizaciones según las soltamos",
        "Soporte prioritario (24h)",
        "Cancela cuando quieras, tu Sheet sigue vivo",
      ],
      cta: "Agregar Pro",
    },
    pricing_disclaimer:
      "Verdad: esto no es un SaaS de $149/mes disfrazado. Es plantilla + setup. Tu Sheet es tuyo para siempre.",

    compare_title: "vs. Jobber, Housecall Pro, ZenMaid",
    compare_cols: ["", "CrewSheet", "Jobber", "Housecall Pro", "ZenMaid"],
    compare_rows: [
      ["Costo mensual", "$0–$29", "$149", "$59", "$39"],
      ["Eres dueño de los datos", "Sí (tu Sheet)", "No", "No", "No"],
      ["Tiempo de setup", "40 min", "Horas", "Horas", "Horas"],
      ["Editas campos tú mismo", "Sí (agregas columna)", "No", "No", "No"],
      ["Funciona en Android barato", "Sí", "OK", "OK", "OK"],
      ["Atado al proveedor", "No", "Sí", "Sí", "Sí"],
    ],

    calc_title: "Cuánto ahorrarías vs Jobber",
    calc_sub: "Sé honesto con tus números. Hacemos las cuentas.",
    calc_jobs_label: "Trabajos por semana",
    calc_avg_label: "Ticket promedio ($)",
    calc_today: "Lo que pagas hoy (Jobber Connect)",
    calc_crewsheet: "CrewSheet (DIY + Pro SMS)",
    calc_save: "Ahorras",
    calc_save_yr: "al año",
    calc_email_label: "Mándame el desglose + el PDF de precios para limpiadores",
    calc_email_placeholder: "tu@negociolimpieza.com",
    calc_email_cta: "Mándame el PDF",
    calc_email_thanks: "Listo — revisa tu correo en 60 segundos.",

    proof_title: "Limpiadores reales. Sheets reales.",
    proof_disclaimer: "Parafraseado con permiso. Nombres y fotos reales según los recopilamos.",
    proof_empty: "Estamos recopilando casos de uso de los primeros usuarios. El tuyo puede ser el primero — lleva la plantilla y cuéntanos.",
    proof_empty_cta: "Llevar la plantilla",
    proof_items: [
      {
        name: "María S.",
        biz: "Sparkle House — Houston, TX",
        quote:
          "Tenía 38 clientes recurrentes en un cuaderno. Armé CrewSheet en una mañana. Solo el SMS de confirmación recuperó 3 cancelaciones el primer mes — son $720.",
        stat: "$11,400/mes",
      },
      {
        name: "Daniel O.",
        biz: "Equipo de 2 — Newark, NJ",
        quote:
          "Jobber eran $149 y mi esposa no quería usar la app. Ella sí usa CrewSheet porque es un Sheet que puede leer. Cancelamos Jobber.",
        stat: "Ahorro $1,788/año",
      },
      {
        name: "Yelena P.",
        biz: "Airbnb Turnover — Miami, FL",
        quote:
          "El enlace Stripe en la cotización es injusto. Lo mando después de la visita y ya está reservada antes de subir al carro.",
        stat: "62% cotización→reserva",
      },
    ],

    faq_title: "Respuestas honestas a lo que estás pensando",
    faq: [
      {
        q: "No sé bien Google Sheets. ¿Igual puedo?",
        a: "Si puedes escribir el nombre de un cliente en una fila, sí. La plantilla viene con datos de ejemplo, cada columna tiene un tooltip, y el Loom de 15 min te lleva paso a paso. Si no quieres tocar nada, toma el Setup Hecho-Por-Nosotros.",
      },
      {
        q: "¿Y los SMS? Hay reglas nuevas en EE.UU. ¿no?",
        a: "Sí, y no te vamos a mentir. Para mandar SMS comerciales automáticos en EE.UU. necesitas registro A2P 10DLC (1–3 semanas, ~$20 setup, fracciones de centavo por mensaje). Pro incluye 500 créditos/mes con eso ya resuelto. O usas tu propia cuenta Twilio.",
      },
      {
        q: "¿Es SaaS de verdad o es una plantilla?",
        a: "Es plantilla + setup, vendido honestamente. Tus datos viven en tu Sheet, en tu cuenta de Google. Si desaparecemos mañana, tu negocio sigue. El Pro de $29/mes es por créditos SMS + automatizaciones nuevas — cancela cuando quieras.",
      },
      {
        q: "¿Puedo cancelar? ¿Reembolsos?",
        a: "DIY: 14 días, sin preguntas. Done-For-You: 100% antes de la llamada, 50% dentro de 7 días. Pro: cancela cuando quieras — tu Sheet y app siguen funcionando, solo pierdes los créditos SMS.",
      },
      {
        q: "¿Y si tengo 2 limpiadores en teléfonos distintos?",
        a: "Los dos teléfonos comparten el mismo Sheet. Cada uno ve su ruta. Glide free cubre hasta 10 usuarios. Por encima, hay costo por usuario — te decimos exactamente cuánto antes (sin sorpresas).",
      },
      {
        q: "¿Los datos de mis clientes están seguros?",
        a: "Tu Sheet vive en tu cuenta de Google. Nosotros nunca lo vemos. Los SMS pasan por tu cuenta Twilio (o la nuestra, con tu permiso).",
      },
    ],

    founder_title: "Por qué yo construyo esto",
    founder_p1:
      "No soy limpiador. Soy desarrollador. Vi a mi mamá llevar un equipo de limpieza de 2 personas con Post-its durante 12 años. Probó Jobber. Lo dejó en 9 días. La razón: la app no le mostraba los datos. Un Sheet sí.",
    founder_p2:
      "CrewSheet es la herramienta que ojalá le hubiera armado en 2018. No es elegante. Es honesta, barata, y tuya para siempre.",
    founder_sign: `— ${site.founderName}, fundador@`.replace("fundador@", "fundador"),

    aff_title: "Coaches de negocios de limpieza: 30% comisión, de por vida",
    aff_sub:
      "Si entrenas limpiadores, únete al programa de afiliados. Copy listo, Loom de demo, y dashboard limpio.",
    aff_cta: "Aplica como afiliado",

    foot_made: "Hecho para limpiadores solos. Sin VC. No está a la venta.",
    foot_terms: "Términos",
    foot_privacy: "Privacidad",
    foot_refund: "Política de reembolso",
    foot_contact: "Contacto",
  },
};

export type Dict = typeof dict.en;

export const legal = {
  en: {
    privacy_title: "Privacy Policy",
    privacy_intro: `Your privacy matters. ${site.name} is a template + setup product — we collect the minimum information needed to deliver the template, process payments, and contact you about your purchase.`,
    terms_title: "Terms of Service",
    terms_intro: `By purchasing or downloading the ${site.name} template you agree to the following terms. Read them — they're short, in plain English, and we mean every line.`,
    refund_title: "Refund Policy",
    refund_intro: `We sell a template you can audit before buying. If it's not for you, ask — these are our refund terms.`,
    last_updated: "Last updated",
    back_home: "← Back to homepage",
    not_found_title: "Page not found",
    not_found_sub: "That page doesn't exist (anymore). Try one of these:",
    not_found_links: [
      { href: "/", label: "Homepage" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
      { href: "/privacy/", label: "Privacy" },
    ],
    skip: "Skip to content",
  },
  es: {
    privacy_title: "Política de Privacidad",
    privacy_intro: `Tu privacidad importa. ${site.name} es un producto de plantilla + setup — recolectamos la mínima información necesaria para entregar la plantilla, procesar pagos y contactarte sobre tu compra.`,
    terms_title: "Términos de Servicio",
    terms_intro: `Al comprar o descargar la plantilla de ${site.name} aceptas los siguientes términos. Léelos — son cortos, en lenguaje claro, y los respetamos.`,
    refund_title: "Política de Reembolso",
    refund_intro: `Vendemos una plantilla que puedes inspeccionar antes de comprar. Si no es para ti, dinos — estos son nuestros términos.`,
    last_updated: "Última actualización",
    back_home: "← Volver al inicio",
    not_found_title: "Página no encontrada",
    not_found_sub: "Esa página no existe (ya no). Prueba con:",
    not_found_links: [
      { href: "/es/", label: "Inicio" },
      { href: "/es/#pricing", label: "Precios" },
      { href: "/es/#faq", label: "Preguntas" },
      { href: "/es/privacy/", label: "Privacidad" },
    ],
    skip: "Saltar al contenido",
  },
};

