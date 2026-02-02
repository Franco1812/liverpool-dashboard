# Liverpool FC - Dashboard de estadisticas

Dashboard web que muestra **estadisticas en vivo del Liverpool FC** en la Premier League (temporada 2024-25). Los datos se obtienen de la API [API-Football](https://www.api-football.com/) (v3).

## Que hace la pagina

- **Cabecera:** logo del club, titulo, temporada actual y selector de competicion (por ahora solo Premier League).
- **Tarjetas de resumen (KPIs):**
  - Goles totales
  - Posicion en la liga
  - Efectividad (% victorias)
  - Partidos jugados
- **Grafico de resultados:** donut con victorias, empates y derrotas.
- **Puntos acumulados:** grafico de area con la evolucion de puntos en la liga por mes.
- **Racha invicta:** partidos sin perder y ultimos 5 partidos con resultado (V/E/D y marcador).
- **Diferencia de goles:** barras por mes (goles a favor menos en contra).
- **Por competicion:** diferencia de goles y partidos (V/E/D) por competicion (actualmente Premier League).

Todo se actualiza al cargar la pagina desde la API; si no hay API key o falla la peticion, se muestra un mensaje de error con enlace para registrarse.

## Tecnologias

- **Next.js 16** (App Router)
- **React 19**, **TypeScript**
- **Tailwind CSS**, **Radix UI**, **Recharts**
- **API-Football v3** (datos de futbol)

## Como ejecutarla

1. Clonar el repo e instalar dependencias:
   ```bash
   npm install
   ```

2. Crear `.env.local` en la raiz con tu clave de API-Football:
   ```
   API_FOOTBALL_KEY=tu_clave_aqui
   ```
   Clave gratuita: [dashboard.api-football.com/register](https://dashboard.api-football.com/register)

3. Arrancar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando     | Descripcion              |
|------------|---------------------------|
| `npm run dev`   | Servidor de desarrollo    |
| `npm run build` | Build de produccion       |
| `npm run start` | Servidor de produccion    |
| `npm run lint`  | Ejecutar ESLint           |

## Estructura relevante

- `app/page.tsx` - Pagina principal del dashboard (estados de carga/error y layout).
- `app/api/liverpool/route.ts` - Ruta API que llama a API-Football y devuelve los datos del dashboard.
- `lib/api-football.ts` - Cliente para standings, estadisticas de equipo y fixtures (sin usar el parametro `last` del plan gratuito).
- `contexts/liverpool-context.tsx` - Contexto que hace fetch a `/api/liverpool` y expone `data`, `loading`, `error`.
- `components/dashboard/` - Componentes de las tarjetas y graficos (usan el contexto).

## Referencia API-Football

- **Team ID 40** = Liverpool FC  
- **League ID 39** = Premier League (England)  
- **Season** = 2024 (temporada 2024-25)
