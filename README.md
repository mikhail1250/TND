# Turkey Non-Dom

Static MVP for [turkeynondom.com](https://turkeynondom.com), an independent English-language information and coordination platform for Turkey's new foreign-income exemption.

## Current legal status

Law No. 7582 is enacted. Income Tax General Communique No. 333 was published in Official Gazette No. 33300 on 4 July 2026. The site distinguishes enacted law, final administrative guidance and interpretation.

## Local preview

Run any static server in the repository root. For example:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Checks

```powershell
node tests/smoke.mjs
```

## Deployment

Vercel is the production host. The Vercel project is connected to this GitHub repository and deploys changes from `main` to [turkeynondom.com](https://turkeynondom.com). Pull requests receive Vercel preview deployments for review before merge.

GitHub Actions runs the smoke checks on pushes and pull requests. GitHub Pages is not part of the production deployment path.

## Before accepting enquiries

- Configure `hello@turkeynondom.com`, or replace the email links.
- Obtain Turkish advice on the service contract, legal-service referrals, advertising and data protection.
- Engage at least one qualified English-speaking Turkish tax professional.
- Review the Living Guide scope and pricing against the published Communique No. 333 before release.

## Content research

Background research and the broader content plan are retained in `research/` and `site/`.
