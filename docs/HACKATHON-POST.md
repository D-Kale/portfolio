**[Live site](https://main.dxe9dwv4bjpro.amplifyapp.com)** · **[GitHub repo](https://github.com/D-Kale/portfolio)**

Andrés Sánchez, full-stack developer from León, Nicaragua, studying Cybernetic Electronic Engineering at ULSA.

## The creative feature: La Ruta

Most portfolios are a list of projects. Mine is a road: my career as a **78 km highway** from León to the online work. Scroll and a truck drives the asphalt, the road behind it turns amber, and the nearest stop opens with the real evidence.

![Portfolio hero with the visible route hint](https://prod-assets.cosmic.aws.dev/a/3LYs9nszZhJTOTV589pQRePEj77/hero-crop-jpg.webp)

- One SVG plate draws the asphalt plus a "traveled" stroke that fills as you scroll.
- A ~1.6 KB vanilla script places the truck with `path.getPointAtLength()` and banks it through every curve. No framework, no animation library.
- Seven real stops — technical and human alike — each linking to real photos, logos and repos. On mobile the plate sticks and tapping a milestone scrolls its card into place.

![La Ruta: the scroll-driven highway and its stops](https://prod-assets.cosmic.aws.dev/a/3LYrrZlNsjq16OZflsvbLILS2ul/ruta-crop-jpg.webp)

**The visible hint:** the hero closes with an explicit "Abajo hay una ruta" block and a strip of asphalt.

## Three core sections

**About Me** → the hero. **Skills / Tech Superpowers** → "Superpoderes técnicos": the real stack (Go, Python, TypeScript, PostgreSQL, Redis, Astro, React, Docker, nginx, AWS). **Projects / Achievements** → "El taller": VoxLab, Waresis, go-storage, TEDx. Spanish at `/`, English at `/en/`.

## AWS setup

![AWS Amplify: deployment pipeline for main](https://prod-assets.cosmic.aws.dev/a/3LYqs1VjhBt54mtR9Qq4mSp6SIl/aws-.webp)

- **AWS Amplify Hosting** serves the site in **us-east-2** (this project's Region), with HTTPS and CDN.
- **Continuous delivery**: `D-Kale/portfolio` → `main` → build → deploy → verify on every push — that pipeline is the screenshot.
- **Build spec** (`amplify.yml`): Node 22 + pnpm 11, `pnpm install --frozen-lockfile`, `pnpm build`, artifacts in `dist`; **`SITE_URL`** on the branch keeps Astro's `canonical` correct.
- **AWS CLI v2** created and connected it. **No access keys in the repo.**

## What I learned

1. **A static site is still a real AWS project**: CDN + TLS + CI/CD in one, nothing that breaks at 3am.
2. **`platform WEB_COMPUTE` vs `WEB` matters.** My first build compiled fine and the deploy failed with `Failed to find the deploy-manifest.json file`: the build was fine, the hosting model was wrong.
3. **`getBoundingClientRect()` lies about `sticky` elements** — it measures in-flow position, so mobile pins landed 170 px off.

`aws login` looked hung (it opens a browser, prints only after OAuth). Contrast passed on paper — 3.1:1 in dark mode — until I resolved every pair through a canvas against WCAG AA. 51 valid images weren't linked by the site, so I quarantined them: 7.9 MB → 1.9 MB.
