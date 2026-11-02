# Plan de despliegue — mañana por la mañana

Estado: **publicado el 2026-11-02.** App `andresportfolio` (`dxe9dwv4bjpro`) en
AWS Amplify Hosting, región us-east-2, conectada a `D-Kale/portfolio` con
auto-build en push a `main`.
URL viva: **https://main.dxe9dwv4bjpro.amplifyapp.com**
El sitio es 100% estático (Astro → HTML/CSS/SVG). No hay backend, ni base de
datos, ni autenticación, ni claves.

---

## 0. Requisitos antes de empezar (5 min)

| Requisito | Estado | Nota |
|---|---|---|
| Cuenta AWS con sesión activa | **Hecho** | `aws login --profile aws-toolkit --region us-east-2` |
| Región | **us-east-2** | ya en `~/.aws/config`, perfil `aws-toolkit` |
| Plan de la cuenta | **FREE, $100 créditos** | expiran 2027-04-28 · `aws freetier get-account-plan-state` |
| Repo en GitHub | **Hecho** | `D-Kale/portfolio` |
| Build spec en el repo | **Hecho** | `amplify.yml` en la raíz |
| App de Amplify | **Hecho** | `dxe9dwv4bjpro`, rama `main`, `SITE_URL` configurada |

---

## 1. Reactivar la sesión de AWS (2 min)

```bash
aws login --profile aws-toolkit --region us-east-2
aws sts get-caller-identity --profile aws-toolkit --region us-east-2
aws freetier get-account-plan-state --profile aws-toolkit --region us-east-2
```

Si el plan es **FREE**, Amplify Hosting sigue dentro de la capa gratuita
(builds y hosting de tráfico bajo). Si es **PAID**, se cobra el uso del plan.
Verificar también el **spend limit** en AWS Settings → Billing antes de
desplegar, para que una runaway build nopause el proyecto.

---

## 2. Crear la app de Amplify Hosting (10 min)

**Lo que se hizo (CLI, sin consola y sin instalar la CLI de Amplify):**

```bash
export GH_TOKEN="$(gh auth token)"

aws amplify create-app \
  --name andresportfolio \
  --platform WEB_COMPUTE \
  --repository https://github.com/D-Kale/portfolio \
  --access-token "$GH_TOKEN" \
  --build-spec file://amplify.yml \
  --enable-branch-auto-build \
  --profile aws-toolkit --region us-east-2

# platform WEB_COMPUTE es el camino de compute: exige deploy-manifest.json.
# Para un sitio 100% estático se cambia a platform WEB:
aws amplify update-app --app-id <APP_ID> --platform WEB

aws amplify create-branch \
  --app-id <APP_ID> --branch-name main --enable-auto-build \
  --environment-variables SITE_URL=https://main.<APP_ID>.amplifyapp.com

aws amplify start-job --app-id <APP_ID> --branch-name main --job-type RELEASE
```

> `gh` ya estaba autenticado con scope `repo`, así que el token sirvió como
> credencial de GitHub para la app: no hizo falta abrir la consola ni instalar
> la GitHub App a mano.
> `start-job` solo acepta `jobType` ∈ {MANUAL, RELEASE, RETRY, WEB_HOOK}.
> Tras esto, **cada push a `main` dispara el build solo** (job 3 = primer
> auto-deploy).

---

## 3. Verificar el build (5 min)

En la consola de Amplify, la pestaña **Build history** debe terminar en
**SUCCEED**. Si falla, los logs dan la causa. Fallos previstos:

| Síntoma | Causa | Fix |
|---|---|---|
| `pnpm: command not found` | la imagen no trae pnpm | ya está resuelto en `amplify.yml` (`npm install -g pnpm@11`) |
| `ERR_PNPM_OUTDATED_LOCKFILE` | el lockfile no coincide | `pnpm install` local y commitear el lockfile |
| `Cannot find module 'astro'` | `--frozen-lockfile` falló | revisar `preBuild` |
| canonical apunta al dominio viejo | falta `SITE_URL` | agregar la variable de entorno y re-deploy |
| `Failed to find the deploy-manifest.json file` | la app quedó en `platform WEB_COMPUTE` (camino de compute/SSR) | `aws amplify update-app --platform WEB` — el build estaba bien, el modelo de hosting no |

Comprobación local antes de tocar la consola:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm check
```

---

## 4. Validar el sitio publicado (10 min)

```bash
curl -sI https://<app-id>.amplifyapp.com/ | head -3
curl -s https://<app-id>.amplifyapp.com/ | grep -o 'canonical" href="[^"]*"'
curl -sI https://<app-id>.amplifyapp.com/en/ | head -3
```

Checklist manual sobre el sitio real:

- [ ] `/` en español y `/en/` en inglés cargan
- [ ] El `<link rel="canonical">` apunta al dominio desplegado
- [ ] El toggle de tema funciona y persiste tras recargar
- [ ] El menú móvil abre, se lee y cierra (Esc)
- [ ] La ruta: los pines llevan la tarjeta completa bajo la placa en móvil
- [ ] Ningún 404 de assets (DevTools → Network)
- [ ] Las 25 imágenes cargan

---

## 5. Dominio propio (15 min, opcional)

Si `andressanchez.dev` ya está comprado:

1. Amplify → **Custom domains** → **Add domain** → `andressanchez.dev`.
2. Amplify muestra los registros DNS que hay que crear en el registrador:
   - `CNAME` de `www` al dominio de Amplify
   - `A`/`ALIAS` del apex, o `CNAME` si el registrador lo permite
3. Esperar la propagación (minutos a 48 h).
4. Actualizar `SITE_URL` en las variables de entorno a
   `https://andressanchez.dev` y re-deploy para corregir canonical y og:url.
5. Pedir el certificado HTTPS en el panel de Amplify (automático con ACM).

---

## 6. Después del deploy

- [ ] Budget de AWS con alarma a **$1** y **$5** (AWS Billing → Budgets).
- [ ] Verificar el dominio en `astro.config.mjs` queda como default si no hay
      `SITE_URL` (ya está así: fallback `https://andressanchez.dev`).
- [ ] Publicar la URL en el perfil de GitHub y LinkedIn.
- [ ] Anotar en `DECISIONS.md` la fecha del deploy real (hoy la decisión
      documentada es "nada sale a AWS hasta orden explícita").

---

## Qué NO se hace (y por qué)

| No hacemos | Por qué |
|---|---|
| VPC, NAT, RDS, Cognito, WAF | nada de eso lo necesita un sitio estático; cuesta dinero y no aporta al challenge |
| CloudFront + S3 manual | Amplify Hosting ya da CDN, HTTPS y dominio propio |
| API Gateway + Lambda + DynamoDB | la fase 2 documentada, después del challenge |
| AWS Lambda@Edge, CloudFormation StackSets | excluidos en esta experiencia de AWS |
| Deploy desde el CLI con credenciales en el repo | la GitHub App evita access keys en el repositorio |

---

## Coste esperado

| Recurso | Coste |
|---|---|
| Amplify Hosting | capa gratuita (builds + bandwidth bajo); si el plan es PAID, se cobra el uso |
| Amplify Build | ~2 min por build, dentro de la cuota gratuita |
| Budgets | sin coste |

En el peor caso (plan PAID y tráfico alto), lo controla la alarma de budget del
§6. Nada de esto crea recursos que cuesten dinero por sí solos.
