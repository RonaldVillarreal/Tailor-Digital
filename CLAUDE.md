# CLAUDE.md — Tailor Digital (sitio web)

Sitio estático de Tailor Digital (antes IAS Software Solution; Ronald Sanchez). Objetivo: generar consultas por WhatsApp de profesionales y pymes del interior de Argentina y de Venezuela.

## Reglas del proyecto

- Sin build ni frameworks: HTML + CSS + JS plano. Si se migra a Vite/React, mantener `js/data.js` como fuente de contenido.
- Contenido editable en `js/data.js`. Textos que cambian por país: atributo `data-ve` en el HTML o campos `*VE` en `data.js`; bloques completos por país con `data-only="ar|ve"`.
- Español rioplatense (vos) para Argentina; español neutro con tuteo para Venezuela ("citas" en lugar de "turnos").
- Identidad: Tailor Digital (manual de identidad v1.0). Tokens en `css/tailor-brand.css` (se carga antes de `styles.css`); logos y favicons en `assets/brand/`.
- Estilos: usar siempre las variables. Paleta: Pizarra #56637F (marca y acción), Medianoche #0D1B3A (texto y fondos oscuros), Hilo #8C9A2F (acento único: una aparición por pantalla, nunca texto sobre fondo claro), Lienzo #EDF1F7 (fondo), WhatsApp #0F7F40.
- Accesibilidad: foco visible, tabs con flechas, `prefers-reduced-motion`, contraste AA. No romperlo al agregar componentes.
- Contacto: WhatsApp 5491127537367 (+54 9 11 2753-7367), mail ronsv10@gmail.com.

## Honestidad del contenido

- Los proyectos son desarrollos propios de Tailor Digital. No agregar nombres de clientes, logos de terceros ni testimonios inventados.
- `cliente: true` en un proyecto solo si fue entregado de verdad y el cliente lo autorizó.
- No afirmar certificaciones, precios, plazos ni medios de cobro que no estén confirmados.

## Próximos pasos sugeridos

Ver la lista de pendientes en `README.md` (capturas reales, demos en vivo, Open Graph, dominio, analytics).
