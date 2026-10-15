# CLAUDE.md — Nexara (sitio web)

Sitio estático de Nexara (antes IAS Software Solution y Tailor Digital; Ronald Sanchez). Objetivo: generar consultas por WhatsApp de profesionales y pymes del interior de Argentina y de Venezuela.

## Reglas del proyecto

- Sin build ni frameworks: HTML + CSS + JS plano. Si se migra a Vite/React, mantener `js/data.js` como fuente de contenido.
- Contenido editable en `js/data.js`. Textos que cambian por país: atributo `data-ve` en el HTML o campos `*VE` en `data.js`; bloques completos por país con `data-only="ar|ve"`.
- Español rioplatense (vos) para Argentina; español neutro con tuteo para Venezuela ("citas" en lugar de "turnos").
- Identidad: Nexara (guía de identidad v1.0, "Next Era"). Tokens en `css/nexara-brand.css` (se carga antes de `styles.css`); isotipo, favicon e íconos en `assets/brand/`. Tema oscuro por defecto.
- Estilos: usar siempre las variables. Paleta "Amanecer digital": Ink #0B1020 (fondo), Void #05070F, Surface #121935 (tarjetas), Violeta #7C5CFF, Cian #22D3EE, Ice #F2F5FF (texto), Mute #9AA6D1. El degradado violeta→cian solo en énfasis (CTA, 1-2 palabras por pantalla). Texto chico/links en violeta 300 #A28BFF. WhatsApp mantiene su verde #0F7F40.
- Tipografía: Space Grotesk (títulos), Inter (texto), JetBrains Mono (etiquetas).
- Accesibilidad: foco visible, tabs con flechas, `prefers-reduced-motion`, contraste AA. No romperlo al agregar componentes.
- Contacto: WhatsApp 5491127537367 (+54 9 11 2753-7367), mail ronsv10@gmail.com.

## Honestidad del contenido

- Los proyectos son desarrollos propios de Nexara. No agregar nombres de clientes, logos de terceros ni testimonios inventados.
- `cliente: true` en un proyecto solo si fue entregado de verdad y el cliente lo autorizó.
- No afirmar certificaciones, precios, plazos ni medios de cobro que no estén confirmados.

## Próximos pasos sugeridos

Ver la lista de pendientes en `README.md` (capturas reales, demos en vivo, Open Graph, dominio, analytics).
