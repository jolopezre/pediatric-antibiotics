# PedAntibióticos — Guía Clínica Pediátrica

Herramienta de referencia clínica para antibioticoterapia en pediatría, inspirada en el Sanford Guide.

## Funcionalidades

- **Tabla de espectro** con filtros por clase y patógeno
- **Recomendaciones por infección** (OMA, NAC, ITU, IPTB, faringitis, meningitis)
- **Tabla de dosis** con datos de neonatos y pediátricos
- **Calculadora de dosis** por peso y edad
- **Búsqueda global** instantánea

## Despliegue en GitHub Pages

### Opción 1: GitHub Pages manual (sin CI/CD)

1. Ve a tu repositorio → **Settings** → **Pages**
2. En *Source*, selecciona **Deploy from a branch**
3. Branch: `main`, carpeta: `/ (root)`
4. Guarda — el sitio estará en `https://<tu-usuario>.github.io/<nombre-repo>/`

### Opción 2: Con GitHub Actions (automático)

El archivo `.github/workflows/deploy.yml` hace el despliegue automático.

1. Ve a **Settings** → **Pages**
2. En *Source*, selecciona **GitHub Actions**
3. Cada `push` a `main` despliega automáticamente

## Fuentes de datos

- Sanford Guide to Antimicrobial Therapy (Table 16)
- AAP Red Book 2024
- IDSA Guidelines (SSTI, Community-Acquired Pneumonia, Pharyngitis, Meningitis)
- ESPID Meningitis Guidelines 2021

## Aviso

Herramienta de apoyo educativo. No reemplaza el juicio clínico ni fuentes actualizadas.
