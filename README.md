# PGC Agua — sitio estático

**Proyecto:** Sistema de monitoreo de almacenamiento y calidad del agua.  
**Autores:** Juan David Garzón Fuquen y Jennyfer Andrea Martínez Vargas.  
**Programa:** Ingeniería en Sistemas y Computación, sede Chía, 7.º semestre.  
**Tecnologías:** HTML5, CSS3, JavaScript sin frameworks, integración de Power BI mediante iframe.

## 1. Abrir en VS Code

1. Descomprime `pgc-agua.zip`.
2. En VS Code selecciona **Archivo > Abrir carpeta** y abre la carpeta `pgc-agua` (la que contiene `index.html`).
3. Puedes modificar las páginas en `pages/`, el estilo en `assets/css/styles.css` y la navegación/interacciones en `assets/js/main.js`.

## 2. Instalar dependencias

No hay dependencias externas para ejecutar el sitio. Opcionalmente puedes comprobarlo con:

```powershell
python -m pip install -r requirements.txt
npm install
```

`requirements.txt` contiene únicamente comentarios porque la vista previa usa `http.server`, incluido en Python. `npm install` funciona sin instalar frameworks: se incluye `package.json` para scripts y metadatos.

## 3. Previsualizar localmente

Desde la terminal de VS Code, ubicada en `pgc-agua`:

```powershell
python -m http.server 5500
```

Alternativa en Windows si `python` no funciona:

```powershell
py -m http.server 5500
```

Alternativa con npm:

```powershell
npm run dev
```

Abre `http://localhost:5500/` en el navegador. Para detener el servidor pulsa `Ctrl+C`. No uses `file://` si quieres reproducir el comportamiento de un sitio HTTP.

## 4. Sustituir los elementos pendientes

- **Imágenes:** guarda fotografías autorizadas en `assets/img/maqueta_desarrollo.jpg` y `assets/img/maqueta_final.jpg` y reemplaza en `pages/solucion.html` y `pages/resultados.html` los cuadros `[IMAGEN: ...]` por etiquetas `<img>` con esas rutas.
- **Power BI:** en `pages/dashboard.html` busca `<!-- REEMPLAZAR: iframe definitivo del dashboard -->`; sustituye **solo** el iframe provisional por el definitivo. Debe permitir acceso al docente según los permisos requeridos; no compartas datos sensibles mediante «Publicar en web».
- **Conocimientos:** en `pages/conocimientos.html`, completa la exportación de datos y valores de los cinco análisis; incluye para cada visual el `n` del grupo, el numerador y denominador de porcentajes, el periodo y una captura o salida del gráfico.
- **Decisiones:** completa en `pages/decisiones.html` las celdas `[COMPLETAR: ...]` solo después de verificar los resultados.
- **DAX:** exporta las medidas desde Power BI/TMDL; el archivo PBIX entregado conserva nombres de medidas usados por los visuales, pero el modelo tabular comprimido no permitió leer las expresiones DAX.
- **Cronograma:** completa fechas reales en `pages/metodologia.html`.

## 5. Datos verificados y alcance

Fuentes locales revisadas: `MER_ELT_DW.pdf`, `DashBoard.pbix.zip` (estructura interna del informe) y `Proyecto.zip` (`Package.dtsx`). Se documentan 1.000.000 de mediciones simuladas en origen, 3 tanques y 9 sensores en esa simulación, y un texto del propio PBIX declara 9.964 registros rechazados. No hay consulta ejecutable al servidor SQL Server ni resultados numéricos exportados por visual; **no se declara como confirmado el conteo actual de FactMediciones**.

El informe consta de cuatro páginas internas: Indicadores generales, Análisis exploratorio, Análisis multivariado y Conocimiento y decisiones. Se identificaron las medidas `TotalMediciones`, `SenosresActivos`, `% FueraLimite`, `Total Eventos`, `Promedio Valor`, `Mediana Valor` y `P95 Valor`. El nombre `SenosresActivos` conserva la grafía de la referencia original.

**Precaución ETL:** la división condicional efectiva de `Package.dtsx` evalúa `valorMedicion < 0 || valorMedicion > 5000`; la documentación también menciona nulos e IDs inválidos. Esa diferencia se debe revisar en SSIS antes de afirmar que todas las reglas están implantadas.

## 6. Publicar más adelante en Render (no realizado)

1. Crea un repositorio de GitHub y sube el **contenido de la carpeta `pgc-agua` en la raíz del repositorio** (incluyendo `render.yaml`).
2. En Render, conecta el repositorio y crea un Blueprint que lea `render.yaml`; o crea un **Static Site** manualmente.
3. Si lo configuras de manera manual, usa `Build Command`: `echo "Sitio estatico listo, sin compilacion"` y `Publish Directory`: `.`.
4. Render servirá `index.html` desde la raíz y conservará las rutas a páginas físicas en `pages/`. El Blueprint también incluye `/inicio` y `/dashboard` como alias.
5. Cuando lo publiques, comprueba la portada, los 13 enlaces, los diagramas, el menú móvil y el iframe de Power BI. Pide al docente probar filtros y navegación con su propia sesión.
6. Incluye en la futura entrega el enlace público de Render y evidencias de acceso. **El sitio no fue publicado ni se ejecutó en la nube durante esta fase.**

Referencia oficial de configuración: <https://render.com/docs/blueprint-spec>.

## 7. Relación de carpetas

- `index.html`: inicio.
- `pages/`: 13 secciones del brief.
- `assets/css/`: paleta y diseño responsive.
- `assets/js/`: menú compartido, progreso de lectura y animaciones.
- `assets/img/`: diagramas recortados del documento técnico; fotografías de maqueta pendientes.
- `docs/informe/`: reservada para el informe de la fase 2.

## 8. Validación antes de entrega académica

- [x] Menú con identificación, problema, justificación, objetivos, marco, metodología, solución, datos, resultados, conocimientos, decisiones, dashboard y conclusiones.
- [x] Iframe provisional insertado de forma interactiva.
- [x] Tres univariados, tres bivariados y un multivariado localizados en la definición PBIX y explicados.
- [x] Cinco fichas con las ocho categorías exigidas, sin inventar resultados.
- [x] Dos propuestas de decisión con todos los campos exigidos, sujetas a datos.
- [x] Sitio estático responsive y `render.yaml`.
- [ ] Fotografías de maqueta, cifras reales por visual, DAX, cronograma final y validación de reglas discrepantes.
- [ ] Publicación en Render y comprobación por el docente (fase de despliegue, aún no realizada).
- [ ] Informe técnico DOCX/PDF (fase 2; excluido por instrucción).
