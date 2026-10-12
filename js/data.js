/*
  Contenido editable del sitio. Todo lo que cambia seguido vive acá:
  contacto, servicios y proyectos. No hace falta tocar main.js para agregar o quitar items.

  PROYECTOS: el campo `cliente` controla la etiqueta de cada tarjeta.
    cliente: false -> "Proyecto propio de Tailor" (demo)
    cliente: true  -> "Entregado a cliente"
  Poné `true` solamente en los proyectos que realmente se entregaron y cuyo cliente lo autorizó.
*/
window.IAS = {
  contacto: {
    whatsapp: "5491127537367",            // formato internacional sin + ni espacios
    whatsappVisible: "+54 9 11 2753-7367",
    email: "ronsv10@gmail.com",
    instagram: "https://www.instagram.com/aisolutionsiv?cplk=MXZodjN6Y2t5eTMyag%3D%3D&utm_source=qr"
  },

  /* servicios: `corto` es la frase de una línea que se ve en celular. */
  servicios: [
    {
      id: "landing",
      corto: "Tu negocio en una página que lleva a WhatsApp.",
      titulo: "Landing pages",
      resumen: "Una página clara que explica lo que hacés y lleva a la gente a escribirte.",
      para: "Profesionales, comercios y emprendedores que hoy dependen solo de Instagram o del boca a boca.",
      incluye: [
        "Diseño propio, sin plantillas genéricas",
        "Botón de WhatsApp y formulario de contacto",
        "Rápida y cómoda en el celular",
        "SEO básico y ubicación en Google Maps",
        "Dominio y hosting configurados",
        "Textos ajustados con vos"
      ]
    },
    {
      id: "turnos",
      corto: "Tus clientes reservan solos, a cualquier hora.",
      titulo: "Sistemas de turnos online",
      tituloVE: "Sistemas de citas online",
      resumen: "Tus clientes reservan solos, a cualquier hora, y vos dejás de contestar mensajes para coordinar horarios.",
      resumenVE: "Tus clientes reservan solos, a cualquier hora, y tú dejas de contestar mensajes para coordinar horarios.",
      para: "Psicólogos, odontólogos, kinesiólogos, peluquerías, estudios y cualquier negocio que trabaje con agenda.",
      paraVE: "Psicólogos, odontólogos, kinesiólogos, peluquerías, estudios y cualquier negocio que trabaje con agenda.",
      incluye: [
        "Agenda por profesional, con tus días y horarios",
        "Reserva sin crear cuenta",
        "Seña o pago online (Mercado Pago en Argentina; registro de comprobantes en Venezuela)",
        "Recordatorios por WhatsApp o mail",
        "Panel para ver, mover y cancelar turnos",
        "Historial de cada cliente"
      ]
    },
    {
      id: "tienda",
      corto: "Vendé online con catálogo, carrito y pedidos.",
      cortoVE: "Vende online con catálogo, carrito y pedidos.",
      titulo: "Tiendas online",
      resumen: "Catálogo, carrito y pedidos organizados, para vender sin armar todo a mano por mensaje.",
      para: "Comercios, marcas y emprendimientos que quieren vender a todo el país o a otras ciudades.",
      incluye: [
        "Catálogo con fotos, categorías y variantes",
        "Carrito y proceso de compra simple",
        "Medios de pago según tu país",
        "Control de stock y estado de pedidos",
        "Envío o retiro, con costos por zona",
        "Panel para cargar productos vos mismo"
      ]
    },
    {
      id: "crm",
      corto: "Ningún cliente se pierde entre los mensajes.",
      titulo: "CRM y seguimiento de clientes",
      resumen: "Un tablero donde ves quién consultó, quién espera respuesta y a quién hay que volver a escribir.",
      para: "Negocios que reciben consultas por WhatsApp o redes y se les pierden en el camino.",
      incluye: [
        "Contactos con etiquetas y notas",
        "Seguimiento por etapas (consulta, presupuesto, cierre)",
        "Historial de mensajes y actividad",
        "Recordatorios y tareas",
        "Conexión con WhatsApp",
        "Reportes simples para decidir"
      ]
    },
    {
      id: "medida",
      corto: "Software hecho a la medida de cómo trabajás.",
      cortoVE: "Software hecho a la medida de cómo trabajas.",
      titulo: "Sistemas a medida",
      resumen: "Software pensado para cómo trabaja tu organización, con usuarios, permisos y reportes.",
      para: "Escuelas, clínicas, empresas chicas y organizaciones con procesos que hoy viven en planillas.",
      incluye: [
        "Relevamiento de cómo trabajás hoy",
        "Usuarios con roles y permisos",
        "Panel de administración",
        "Reportes que se pueden exportar",
        "Base de datos segura y con respaldos",
        "Documentación y capacitación para tu equipo"
      ]
    },
    {
      id: "auto",
      corto: "Avisos y planillas que se completan solos.",
      titulo: "Automatizaciones",
      resumen: "Mensajes, avisos y planillas que se llenan solos, para ahorrar horas de trabajo repetitivo.",
      resumenVE: "Mensajes, avisos y planillas que se llenan solos, para ahorrar horas de trabajo repetitivo.",
      para: "Cualquier negocio que repite las mismas tareas todos los días: confirmar, avisar, cargar datos.",
      incluye: [
        "Confirmaciones y recordatorios automáticos por WhatsApp o mail",
        "Datos de formularios que pasan solos a una planilla o al CRM",
        "Avisos de pago pendiente",
        "Notificaciones internas para tu equipo"
      ]
    }
  ],

  /* Paneles del acordeón del inicio (después del panel de presentación).
     servicio: id de `servicios`; proyecto: id de `proyectos` (su captura va de fondo).
     puntos: 3 etiquetas cortas que se ven en celular en lugar de la lista completa. */
  destacados: [
    { servicio: "turnos", proyecto: "turnos-psicologia", etiqueta: "Turnos online", etiquetaVE: "Citas online",
      puntos: ["Agenda por profesional", "Seña online", "Recordatorios por WhatsApp"] },
    { servicio: "tienda", proyecto: "tienda-papeleria", etiqueta: "Tiendas online",
      puntos: ["Catálogo con fotos", "Carrito y pagos", "Control de stock"] },
    { servicio: "crm", proyecto: "crm-whatsapp", etiqueta: "CRM + WhatsApp",
      puntos: ["Contactos por etapa", "Conexión con WhatsApp", "Recordatorios y tareas"] },
    { servicio: "medida", proyecto: "gestion-escolar", etiqueta: "Sistemas a medida",
      puntos: ["Usuarios y permisos", "Panel de administración", "Reportes exportables"] }
  ],

  rubros: ["Salud", "Educación", "Comercio", "Servicios"],

  proyectos: [
    {
      id: "turnos-psicologia",
      titulo: "Turnos online para consultorio de psicología",
      rubro: "Salud",
      variante: "sereno",
      imagen: "assets/proyectos/sereno.webp",
      color: "#2547F5",
      cliente: false,
      resumen: "Reserva de sesiones con seña online, agenda propia y recordatorios por WhatsApp.",
      problema: "Coordinar turnos por mensaje ocupaba horas por semana, y las ausencias sin aviso dejaban huecos en la agenda.",
      solucion: "Un sistema donde cada paciente elige día y horario libre, abona una seña y recibe recordatorio. La profesional gestiona todo desde un panel.",
      funciones: [
        "Agenda con horarios y días bloqueados",
        "Seña online con Mercado Pago",
        "Recordatorios por WhatsApp",
        "Panel para mover o cancelar turnos",
        "Historial por paciente"
      ],
      stack: ["React", "Vite", "Supabase", "Mercado Pago", "n8n"]
    },
    {
      id: "crm-whatsapp",
      titulo: "CRM con WhatsApp para seguimiento de clientes",
      rubro: "Servicios",
      variante: "hilo",
      imagen: "assets/proyectos/hilo.webp",
      color: "#0F7F40",
      cliente: false,
      resumen: "Contactos, conversaciones y etapas de venta en un solo tablero conectado a WhatsApp.",
      problema: "Las consultas llegaban por chat y se perdían: nadie sabía a quién había que responder ni en qué etapa estaba cada cliente.",
      solucion: "Un CRM que ordena cada contacto por etapa, guarda el historial y dispara mensajes automáticos con flujos de automatización.",
      funciones: [
        "Tablero por etapas",
        "Historial de conversaciones",
        "Mensajes automáticos y recordatorios",
        "Etiquetas y notas",
        "Reportes de actividad"
      ],
      stack: ["React", "Vite", "Node.js", "Express", "SQLite", "n8n"]
    },
    {
      id: "gestion-escolar",
      titulo: "Sistema de gestión para colegio",
      rubro: "Educación",
      variante: "horizonte",
      imagen: "assets/proyectos/horizonte.webp",
      color: "#7A3FF2",
      cliente: false,
      resumen: "Panel con tres roles (administración, docentes y aprobadores) para ordenar la gestión diaria.",
      problema: "La información de la escuela estaba repartida en planillas y papeles, sin control de quién cargaba o aprobaba qué.",
      solucion: "Una aplicación web con permisos por rol, circuitos de aprobación y datos centralizados en la nube.",
      funciones: [
        "Tres roles con permisos distintos",
        "Circuito de carga y aprobación",
        "Listados y filtros",
        "Datos centralizados con respaldo",
        "Acceso desde cualquier dispositivo"
      ],
      stack: ["React", "Vite", "Supabase", "Netlify"]
    },
    {
      id: "tienda-papeleria",
      titulo: "Tienda online de papelería",
      rubro: "Comercio",
      variante: "papel",
      imagen: "assets/proyectos/papel.webp",
      color: "#E8590C",
      cliente: false,
      resumen: "Catálogo, carrito y pedidos para una papelería, con medios de pago locales.",
      problema: "Las ventas se hacían por mensaje, foto por foto, y era difícil llevar el stock y los pedidos.",
      solucion: "Una tienda con catálogo ordenado, carrito y un panel para ver pedidos, stock y estados.",
      funciones: [
        "Catálogo con categorías",
        "Carrito y pedido por WhatsApp o pago online",
        "Control de stock",
        "Panel de pedidos",
        "Carga de productos sin código"
      ],
      stack: ["React", "Vite", "Appwrite", "Netlify"]
    },
    {
      id: "landing-odontologia",
      titulo: "Landing con turnos para consultorio odontológico",
      rubro: "Salud",
      variante: "lumen",
      imagen: "assets/proyectos/lumen.webp",
      color: "#0B7285",
      cliente: false,
      resumen: "Página de presentación con tratamientos, ubicación y reserva de turno en pocos pasos.",
      problema: "El consultorio solo existía en redes y los pacientes nuevos no encontraban cómo pedir turno.",
      solucion: "Una landing rápida con tratamientos, mapa, preguntas frecuentes y botón directo para reservar o escribir por WhatsApp.",
      funciones: [
        "Presentación de tratamientos",
        "Mapa y datos de contacto",
        "Reserva de turno",
        "Botón de WhatsApp",
        "Optimizada para celular"
      ],
      stack: ["HTML", "CSS", "JavaScript", "Netlify"]
    },
    {
      id: "landing-estudio",
      titulo: "Sitio para estudio contable y jurídico",
      rubro: "Servicios",
      variante: "landing",
      imagen: "assets/proyectos/estudio.webp",
      color: "#364FC7",
      cliente: false,
      resumen: "Sitio institucional con servicios, equipo y formulario de consulta que llega por WhatsApp o mail.",
      problema: "El estudio no tenía sitio propio y perdía consultas de clientes que buscaban en Google.",
      solucion: "Un sitio sobrio con áreas de trabajo, equipo, preguntas frecuentes y un formulario de consulta.",
      funciones: [
        "Áreas de práctica o servicios",
        "Presentación del equipo",
        "Formulario de consulta",
        "SEO básico",
        "Blog opcional"
      ],
      stack: ["React", "Vite", "Netlify"]
    },
    {
      id: "turnos-peluqueria",
      titulo: "Turnero para peluquería y barbería",
      rubro: "Servicios",
      variante: "calendar",
      imagen: "assets/proyectos/barberia.webp",
      color: "#C2255C",
      cliente: false,
      resumen: "Reserva por servicio y por profesional, con seña y recordatorio.",
      problema: "Las ausencias de último momento y los mensajes fuera de horario complicaban la agenda del local.",
      solucion: "Un turnero donde el cliente elige servicio, profesional y horario, y el local controla todo desde el celular.",
      funciones: [
        "Servicios con duración y precio",
        "Agenda por profesional",
        "Seña para confirmar",
        "Recordatorio automático",
        "Panel simple en el celular"
      ],
      stack: ["React", "Vite", "Supabase", "n8n"]
    }
  ]
};
