# Session 8 Demo: CI/CD for an HTML, CSS and JS website

A small HealthTechGov "BMI Checker" site with a GitHub Actions **CI** pipeline (test + build).
The **CD** part (deploy to GitHub Pages) is ready in `.github/cd-later/cd.yml` but is turned off for now.
It has no dependencies, so `npm install` isn't needed.

## Files
| File | What it is | Pipeline stage |
|---|---|---|
| `index.html`, `style.css`, `main.js` | The website | — |
| `bmi.js` | The logic (BMI maths) | — |
| `bmi.test.js` | Automatic checks | CI: Test |
| `build.js` | Copies the site to `dist/` and stamps it with the commit ID | CI: Build |
| `.github/workflows/ci.yml` | The CI pipeline (active) | CI |
| `.github/cd-later/cd.yml` | The CD pipeline (turned off, see below) | CD |

## Before class (10 min, do it once on your own account)
1. On GitHub, create a **public** repo, e.g. `healthtechgov-cicd-demo`, with no README.
2. Push the code:
   ```bash
   cd LABS/session-08-cicd-demo
   git init -b main
   git add .
   git commit -m "Add BMI checker with CI/CD pipeline"
   git remote add origin https://github.com/<your-username>/healthtechgov-cicd-demo.git
   git push -u origin main
   ```
3. Open the **Actions** tab and check that the **CI - Test and Build** job goes green.

## Live in class
**Demo 1, the happy path (CI ✅)**
1. Show the repo, then `ci.yml`, and read the steps out loud: "Get code → Set up Node → Test → Build → Save".
2. Edit `index.html` and change `Version 1` to `Version 2`. Commit and push.
3. In Actions, show the **CI - Test and Build** job turning green, step by step.
4. Open the run and download the **website** artifact at the bottom. "The robot tested and built it for us."

**Demo 2, bad code is caught (CI ❌)**
1. In `bmi.js`, change `return "Healthy";` to `return "Normal";`. Commit and push.
2. In Actions, **step 3 Run tests** goes red and steps 4–5 never run. "CI caught the bug before anyone used it."
3. Change it back to `"Healthy"` and push. Everything goes green again.

## Turning on CD later (optional)
1. Open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
2. Move `.github/cd-later/cd.yml` to `.github/workflows/cd.yml`, then commit and push.
3. In Actions, the **CD Pipeline** runs: test and build, then **CD - Deploy to GitHub Pages**. Click its link to open the live site.

## Run locally (optional)
```bash
npm test         # run the checks
npm run build    # create dist/
open index.html  # view the site
```

## If something goes wrong
| Problem | Fix |
|---|---|
| CD job: "Pages not enabled" / 404 | Settings → Pages → Source → **GitHub Actions** |
| CD job: "not allowed to deploy to github-pages" | Settings → Environments → github-pages → allow the `main` branch |
| Private repo can't use Pages | Make the repo public (free accounts) |
| Warning that an action version is old | Raise the `@v` number in `ci.yml` |

## The real-world version (for the report)
For HealthTechGov, the CD job would deploy to **AWS** rather than GitHub Pages:
- a static website goes to an **S3 bucket**, optionally with CloudFront
- a backend app or Docker container goes to **EC2**
- AWS keys are stored in **GitHub Secrets**, never in code

AWS equivalents: GitHub Actions workflow ≈ **CodePipeline**, test/build job ≈ **CodeBuild**,
deploy job ≈ **CodeDeploy**.
