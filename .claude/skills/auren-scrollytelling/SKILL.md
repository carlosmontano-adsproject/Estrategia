---
name: auren-scrollytelling
description: Genera presentaciones y reportes web de una sola página con narrativa de scroll (scrollytelling) y la identidad visual de Auren (tema oscuro #0a0a0a, acento rojo #D32027, side-nav de dots, contadores animados, timeline, galería de video, tablas y gráficas). Úsalo cuando se pida convertir un PDF, estrategia, plan de campaña o reporte de datos en un HTML interactivo tipo "scrolling telling website", o cuando se pida un reporte/landing con el look & feel de Auren.
---

# Auren Scrollytelling

Construye un HTML autocontenido, de una sola columna, que cuenta una historia
conforme el usuario hace scroll: cada sección se anima al entrar en viewport
(contadores desde 0, timeline que se dibuja, tarjetas que aparecen en cascada),
con un side-nav de "dots" que resalta la sección activa.

## Cuándo usarlo
- "Convierte este PDF/estrategia/reporte en un sitio de scrollytelling."
- "Hazme un reporte/landing con el look & feel de Auren."
- Cualquier documento (plan de campaña, resultados, diagnóstico) que deba volverse
  una página web narrativa con la marca Auren.

## Recursos de este skill
- `assets/engine.css` — sistema de diseño completo (tokens en `:root`, todos los componentes).
- `assets/engine.js` — interacciones: contadores, side-nav activo, timeline, galería de video Drive, waffle.
- `assets/template.html` — esqueleto del documento con marcadores `{{...}}`.
- `assets/auren-logo.txt` — logo Auren como data URI PNG (pegar en `<img src>`).
- `reference/components.md` — catálogo de bloques copy-paste por tipo de sección.

## Flujo de trabajo
1. **Extraer el contenido fuente.** Si es PDF, extrae el texto. En este entorno
   `pdftotext`/`pdfplumber`/`pypdf` pueden fallar por `_cffi_backend`; si pasa, corre
   `pip install --force-reinstall cffi -q` y reintenta con `pypdf`.
2. **Mapear contenido → secciones.** Decide qué componente encaja con cada bloque
   (ver tabla abajo). No fuerces métricas que no existen: un plan se cuenta con
   timeline y tarjetas; un reporte de resultados, con KPIs y gráficas.
3. **Ensamblar el HTML.** Parte de `template.html`. **Inlinea** el contenido de
   `engine.css` dentro de `<style>` y el de `engine.js` dentro del `<script>` final,
   para que el entregable sea un solo archivo portable. Pega el logo desde
   `auren-logo.txt`. Inserta las secciones desde `components.md`.
4. **Side-nav y secciones.** Cada `<section>` necesita un `id` único y un `.nav-dot`
   con `data-target` igual a ese `id`, en el mismo orden.
5. **Videos (si aplica).** Llena `window.VIDEOS` con `{n, title, phase, id}` (id de
   Google Drive). El engine los renderiza con carga diferida. Los archivos deben estar
   compartidos como "Cualquiera con el enlace".
6. **Validar datos.** Si la fuente tiene fechas/cifras inconsistentes, normalízalas con
   criterio y **reporta cada cambio** al usuario en el chat (no inventes datos).
7. **Verificar.** Confirma: 0 marcadores `{{...}}` y 0 `__PLACEHOLDER__` restantes; un
   `.nav-dot` por sección; logo embebido; el `<script>` de `window.VIDEOS` va **antes**
   del `<script>` del engine.

## Mapeo rápido contenido → componente
| Contenido fuente | Componente |
|---|---|
| Cifras clave / resumen | KPI grid (`data-counter`) o Hero numbers |
| Objetivo / definición "X = Y" | Equation card |
| Audiencias, perfiles, features | Segment cards (3 col + ícono) |
| Plataformas / canales | Channel cards (barra de color de marca) |
| Videos / piezas creativas | Video gallery (iframe Drive 9:16) |
| Fases, cronograma, roadmap | Timeline (línea animada) |
| Tablas de datos / calendarios | Table card |
| Listas de "qué incluye" | Report-includes (mini cards) |
| Hallazgo / insight destacado | Insight card (borde rojo) |
| Distribución porcentual | Waffle chart |
| Evolución temporal / mapa | Chart.js / D3+TopoJSON (CDN) |

## Identidad visual (no cambiar salvo petición)
- Fondo `#0a0a0a`, tarjetas `#161616`, bordes `#2a2a2a`, acento Auren `#D32027`.
- Texto `#f5f5f5` / secundario `#a0a0a0`; números con `tabular-nums`.
- Tipografía: stack del sistema, pesos 500, `letter-spacing` negativo en titulares.
- Para re-skin a otra marca: cambia las variables de `:root` en `engine.css`
  (`--accent`, `--bg`, `--card`, etc.) y sustituye el logo.

## Notas
- El documento funciona offline salvo los iframes de video (Drive) y los extras de
  CDN (Chart.js/D3). Mantén ese trade-off en mente si se requiere 100% offline.
- Responsivo: <860px oculta el side-nav y apila los grids automáticamente.
- Ejemplo real construido con este skill: `estrategia_check_up_auren_2026.html`
  (raíz del repo) — convierte la estrategia Check-Up Empresarial en scrollytelling.
