# Plan de despliegue — mañana por la mañana

Estado: **hoy el repo está en GitHub. Falta publicarlo.**
El sitio es 100% estático (Astro → HTML/CSS/SVG). No hay backend, ni base de
datos, ni autenticación, ni claves.

---

## 0. Requisitos antes de empezar (5 min)

| Requisito | Estado | Nota |
|---|---|---|
| Cuenta AWS con sesión activa | **Caducada** | `aws login` antes de empezar (ver §1) |
| Región | **us-east-2** | ya en `~/.aws/config`, perfil `aws-toolkit` |
| Plan de la cuenta | Pendiente de verificar | `aws freetier get-account-plan-state` |
| Repo en GitHub | **Hecho** | `D-Kale/portfolio` |
| Build spec en el repo | **Hecho** | `amplify.yml` en la raíz |

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

Opción A — consola (más simple, recomendada):

1. AWS Console → **Amplify** → **New app** → **Hosting** → **GitHub**.
2. Autorizar la GitHub App: solo el repositorio `D-Kale/portfolio` (permiso
   mínimo, no "all repositories").
3. Elegir el repositorio y la rama `main`.
4. En **Environment variables** agregar:
   - `SITE_URL` = `https://<app-id>.amplifyapp.com` (el dominio que Amplify
     asigne; se puede cambiar después con un dominio propio).
5. Revisar el build spec que Amplify autodetectó. Debe coincidir con
   `amplify.yml`: Node 22, `pnpm install --frozen-lockfile`, `pnpm build`,
   artefactos en `dist`.
6. **Save and deploy**.

Opción B — CLI:

```bash
npm install -g @aws-amplify/cli
amplify init --app-id <APP_ID> --envName main --region us-east-2
amplify add hosting
amplify push
```

> La CLI de Amplify **no es necesaria**: `amplify.yml` + la GitHub App bastan.
> La opción A deja menos superficie que mantener.

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
