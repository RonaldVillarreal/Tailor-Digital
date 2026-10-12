# Tailor Digital — sitio web

Sitio estático (HTML + CSS + JS plano, sin build) para ofrecer landings, sistemas de turnos, tiendas, CRM y software a medida en el interior de Argentina y en Venezuela.

## Cómo correrlo

```bash
cd ias-web
npx serve .          # o: python3 -m http.server 8080
```

También abre con doble clic en `index.html`.

## Estructura

```
index.html        Estructura y textos fijos (los cambios de país se marcan con data-ve="...")
css/styles.css    Tokens (:root) y todos los estilos
js/data.js        CONTENIDO EDITABLE: contacto, servicios, rubros y proyectos
js/main.js        Interacciones: región AR/VE, servicios, filtros, modal, demo del turnero, formulario
assets/           favicon.svg
netlify.toml      Publicar en Netlify (sin build)
```

## Qué hace

- **Selector Argentina / Venezuela** en el header. Cambia voseo/tuteo, "turnos"/"citas", medios de cobro y el mensaje de WhatsApp. Para campañas: `?pais=ve` o `?pais=ar` en la URL.
- **Demo interactiva de turnero** en el hero (no guarda nada).
- **Explorador de servicios** (6 servicios, navegable con flechas).
- **Proyectos filtrables por rubro** con ventana de detalle y botón "Quiero algo así" que abre WhatsApp con el proyecto nombrado.
- **Botón flotante de WhatsApp** (+54 9 11 2753-7367) y **mail** (ronsv10@gmail.com).
- **Formulario** que arma el mensaje y lo abre en WhatsApp o en el cliente de mail (no hay backend).

## Cómo editar

- Agregar o cambiar un proyecto o servicio: `js/data.js`.
- Cambiar número o mail: `contacto` en `js/data.js` y los `href="mailto:"` / texto visible en `index.html`.
- Colores y tipografías: variables en `:root` de `css/styles.css`. Fuentes: Bricolage Grotesque (títulos) e Instrument Sans (texto) vía Google Fonts.

## Sobre los proyectos mostrados

Cada tarjeta dice "Proyecto propio de Tailor" por defecto. Si un proyecto fue realmente entregado a un cliente y el cliente lo autoriza, poné `cliente: true` en `data.js` y la etiqueta cambia a "Entregado a cliente". El sitio no incluye nombres de clientes ni testimonios inventados; los testimonios solo conviene agregarlos cuando sean reales y con permiso.

## Pendientes recomendados

- [ ] Reemplazar las mini pantallas CSS por capturas reales de cada sistema (carpeta `assets/`).
- [ ] Links a demos en vivo (campo `demo` en cada proyecto + botón en el modal).
- [ ] Imagen Open Graph (1200×630) y etiquetas `og:image` / `og:url`.
- [ ] Dominio propio y sitemap.xml.
- [ ] Revisar con cada rubro el texto de "problema" y "lo que hicimos" para que describa lo que realmente hace cada sistema.
- [ ] Confirmar qué medios de cobro ofrecés realmente en Venezuela (Pago Móvil, Zelle, etc.) y ajustar el texto.
- [ ] Sección de precios o "desde" si querés filtrar consultas.
- [ ] Analytics liviano (Plausible o similar) para medir clics en WhatsApp.
- [ ] Autoalojar las fuentes si querés mejor rendimiento.

## Deploy

Netlify: arrastrá la carpeta, o conectá el repo (publish directory `.`, sin comando de build).
