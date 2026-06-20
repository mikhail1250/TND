# Turkey Non-Dom

Static MVP for [turkeynondom.com](https://turkeynondom.com), an independent English-language information and coordination platform for Turkey's new foreign-income exemption.

## Current legal status

Law No. 7582 is enacted. As last verified on 20 June 2026, implementing Communique No. 333 remains in draft. The site deliberately distinguishes final law from draft procedure.

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

The repository includes a GitHub Pages workflow. After the first push:

1. Open repository Settings, then Pages.
2. Select GitHub Actions as the source if it is not selected automatically.
3. Add the custom domain `turkeynondom.com`.
4. Configure the domain's DNS records for GitHub Pages.
5. Enable HTTPS once GitHub confirms the DNS records.

The included `CNAME` file preserves the custom domain during deployment.

## Before accepting enquiries

- Configure `hello@turkeynondom.com`, or replace the email links.
- Obtain Turkish advice on the service contract, legal-service referrals, advertising and data protection.
- Engage at least one qualified English-speaking Turkish tax professional.
- Review the Living Guide scope and pricing if the final Communique No. 333 changes the intended process.

## Content research

Background research and the broader content plan are retained in `research/` and `site/`.
