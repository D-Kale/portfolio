# DECISIONS.md

Registro vivo de decisiones, errores y aprendizajes del portfolio para el AWS Student Builder Challenge.
Formato: fecha · decisión · por qué · alternativas descartadas.

---

## 2026-10-28 · Idioma: español por defecto en la raíz, inglés en /en

- **Décision**: ES en `/`, EN en `/en`, toggle visible en el header.
- **Por qué**: "mantener el español es respetar mis raíces" — la identidad es primero; el inglés abre la puerta a empleo remoto y oportunidades internacionales como extra.
- **Alternativa descartada**: EN por defecto (sería una web que no se siente suya) y detección automática por JS (rompe el objetivo estático y sorprende al visitante).

## 2026-10-28 · Concepto: "Cartografía" — La Ruta

- **Décision**: el portfolio es un mapa dibujado a mano de la carrera: paradas técnicas (proyectos/eventos) y miradores humanos (cultura leonesa: Virgen de la Merced, La Gritería, Museo Ortiz Gurdian, Colegio Calasanz).
- **Por qué**: el mapa del objetivo (darte a conocer como persona, no vender producto) + las fotos y links ya existentes: Igora la narrativa sin inventar nada.
- **Alternativa descartada**: modelo 3D fotogramétrico (pesado, riesgo alto, dice "hice un 3D", no "construyo sistemas") y "La Pulpería" (no pega con su identidad de cibernético en León).

## 2026-10-28 · Scope para el deadline: backend post-entrega

- **Décision**: v1 100% estática (Astro → Amplify). La Cajuela (postales de mentores) se alimenta de JSON en el repo, revisado en build. La API real (API Gateway HTTP + Lambda Go `provided.al2023` arm64 + DynamoDB + `/admin` visual con JWT + rate limit) queda documentada como **fase 2, después del deadline**.
- **Por qué**: con 1–2 días, un backend a medias arriesga todo. Estático es hermético y ampliable. La tentación de "mostrar AWS de más" no vale un portfolio roto.
- **Alternativa descartada**: meto la API sí o sí (riesgo alto de no llegar); guestbook sin moderación (spam) — descartado por seguridad.

## 2026-10-28 · Trabajo local hasta orden explícita

- **Décision**: nada sale a GitHub ni a AWS hasta que Andrés lo pida.
- **Por qué**: control total de lo que se publica durante el challenge.
- **Nota**: presupuesto AWS al día de hoy: plan FREE, $100 créditos, expiran **2027-04-28**. Región: **us-east-2**.

## 2026-10-28 · Infraestructura mínima el día del deploy

1. **Amplify Hosting**: repo GitHub → build automático en push. Conexión vía GitHub App (sin claves en repo).
2. **No habrá** VPC, NAT, RDS, Cognito ni WAF en v1: nada paga por cuentas con este monto de tráfico.
3. **Budgets** con alarma a $1 y $5 el primer día.
4. **Roll IAM**: solo lo que Amplify necesita (rol de la app, no usuario), sin claves de acceso en el repo.
5. **DynamoDB + Lambda** (fase 2): tabla on-demand + TTL, concurrencia reservada en 2, throttle 2 rps por stage.

## Errores y aprendizajes (log corrido)

- (2026-10-28) `pnpm install` en red lenta del entorno: timeouts en npm registry. Lección: correr con margen de tiempo y no en paralelo con otras tareas de red pesada.

## Pendientes documentados (fase 2, post-deadline)

- API de postales: `POST /notas` (validación + rate limit por IP con TTL), `GET /notas` (aprobadas), `GET /health`.
- `/admin` visual: passphrase → JWT (HS256), cookie HttpOnly + SameSite, 15 min TTL, rate limit de login 5/15 min por IP, UI con dos listas (pendientes / aprobadas) y acciones aprobar/denegar/eliminar.
- Despliegue del stack serverless vía `sam deploy` desde máquina local, con el perfil `aws-toolkit`.
