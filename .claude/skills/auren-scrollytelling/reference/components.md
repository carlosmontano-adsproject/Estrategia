# Catálogo de componentes

Bloques listos para copiar dentro de `<div class="container">`. Cada sección debe
ser un `<section id="...">` con un `.nav-dot` correspondiente en el side-nav.
Patrón de encabezado: `<p class="section-num">Sección N</p>` + `<h2>` + `.section-subtitle`.

---

## KPI grid — números/datos clave
Úsalo para 2–4 cifras destacadas. Anima de 0 con `data-counter`. Para texto (no número), usa `.kpi-value.text`.
```html
<section id="que">
  <p class="section-num">Sección 1</p>
  <h2>Qué vamos a hacer</h2>
  <p class="section-subtitle">Resumen en una frase.</p>
  <div class="kpi-grid">
    <div class="kpi">
      <div class="kpi-label">Formato</div>
      <div class="kpi-hint">Texto de apoyo corto</div>
      <div class="kpi-value"><span data-counter="7">0</span> videos</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">Destino</div>
      <div class="kpi-hint">CTA único</div>
      <div class="kpi-value text"><span class="accent">aurenb.mx</span>/check-up</div>
    </div>
  </div>
</section>
```

## Equation card — definición/ecuación conceptual
Ideal para objetivos del tipo "X = Y".
```html
<div class="equation-card">
  <div class="equation">
    <span class="eq-term"><span class="accent">Check-Up</span> completado</span>
    <span class="eq-op">=</span>
    <span class="eq-term">1 <span class="accent">lead</span></span>
  </div>
  <p class="equation-note">Aclaración de la métrica de éxito.</p>
</div>
```

## Segment cards — audiencias / features (3 columnas con ícono)
Íconos: SVG inline de 22px, `stroke="currentColor"` (heredan el rojo). Usa íconos de Feather/Lucide.
```html
<div class="segment-grid">
  <div class="segment-card">
    <div class="segment-icon"><!-- SVG 22px --></div>
    <p class="segment-title">Dueños y directores de PyMEs</p>
    <p class="segment-text">Descripción del perfil.</p>
  </div>
  <!-- ...x3... -->
</div>
```

## Channel cards — plataformas (barra de color de marca)
Colores: Meta `#1877F2`, LinkedIn `#0A66C2`, TikTok `#FE2C55`, YouTube `#FF0000`.
```html
<div class="channel-grid">
  <div class="channel-card">
    <div class="channel-bar" style="background:#1877F2;"></div>
    <p class="channel-name">Meta</p>
    <p class="channel-detail">Facebook e Instagram.</p>
  </div>
</div>
```

## Video gallery — galería vertical 9:16 con Google Drive
Define `window.VIDEOS` (ver template) y deja el contenedor vacío; el engine lo llena con
carga diferida (el iframe sólo se monta al hacer clic en "Reproducir").
```html
<section id="videos">
  <p class="section-num">Sección 5</p>
  <h2>Los videos</h2>
  <div class="video-grid" id="video-grid"></div>
</section>
```
> **Google Drive:** el `id` es el de `https://drive.google.com/file/d/<ID>/view`.
> El archivo debe estar compartido como "Cualquiera con el enlace" para que el
> `preview` reproduzca sin sesión. El engine usa `.../preview` en un iframe.

## Timeline — fases / cronograma (línea que se dibuja con el scroll)
Primer item puede llevar `class="timeline-item prep"` (nodo hueco). Los `.timeline-vchip`
son etiquetas opcionales (videos/acciones de la fase).
```html
<section id="fases">
  <p class="section-num">Sección 6</p>
  <h2>Periodo de campaña</h2>
  <div class="timeline" id="timeline">
    <div class="timeline-line"><div class="timeline-line-fill" id="timeline-fill"></div></div>
    <div class="timeline-item prep">
      <div class="timeline-node">0</div>
      <div class="timeline-card">
        <p class="timeline-phase">Preparación</p>
        <p class="timeline-dates">8 – 20 de mayo</p>
        <p class="timeline-actions">Descripción.</p>
      </div>
    </div>
    <div class="timeline-item">
      <div class="timeline-node">1</div>
      <div class="timeline-card">
        <p class="timeline-phase">Fase 1 · 3 videos</p>
        <p class="timeline-dates">21 de mayo – 7 de junio</p>
        <p class="timeline-actions">Descripción.</p>
        <div class="timeline-videos">
          <span class="timeline-vchip">1 · Título</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Tabla — desempeño / calendario
Usa `td.num`/`th.num` para columnas numéricas y `tr.total-row` para el total.
```html
<div class="table-card">
  <table>
    <thead><tr><th>Reporte</th><th>Entrega</th><th>Periodo</th></tr></thead>
    <tbody>
      <tr><td class="label">Reporte 1</td><td>Cierre de Fase 1</td><td>21 may – 9 jun</td></tr>
    </tbody>
  </table>
</div>
```

## Report-includes — mini-listas en 3 columnas
```html
<div class="report-includes">
  <div class="ri-card">
    <p class="ri-label">7.1 Resultados en redes</p>
    <ul class="ri-list"><li>Alcance</li><li>Interacciones</li></ul>
  </div>
</div>
```

## Insight card — hallazgo destacado (borde rojo)
```html
<div class="insight-card">
  <div class="insight-stat">0%</div>
  <p class="insight-title">El hallazgo en una línea</p>
  <p class="insight-text">Explicación con <span class="accent">palabras resaltadas</span> y la acción derivada.</p>
</div>
```

## Waffle chart — distribución porcentual (opcional)
```html
<div class="waffle" data-a="74"></div>  <!-- 74% en color de acento, resto gris -->
```

## Extras opcionales (usar CDNs como en el reporte original)
- **Chart.js** (`cdnjs .../Chart.js/4.4.1/chart.umd.js`): gráficas de líneas/barras (evolución de comunidad).
- **D3 + TopoJSON** (`d3 7.8.5` + `topojson 3.0.2` + `datamaps mex.topo.json`): mapa de México con dots por ciudad.
Estos requieren red; el resto del documento funciona offline (salvo los iframes de video).
