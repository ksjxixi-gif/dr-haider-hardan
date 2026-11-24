# seeh.company: Dr. Haider N. Hardan / SEEH

Next.js 16 + Tailwind 4. Static pages + one API route (contact form).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Editing content
- `content/site.ts`: contact info, socials, sectors, process, photo gallery
- `content/projects.ts`: add a project = add one object (page is generated automatically)
- `content/insights.ts`: articles
- Photos: `public/images/`

## Contact form
Set env vars on the host (see `.env.example`): `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
Without a key the form tells visitors to email directly.

## Deploy
Vercel: import the repo, add the env vars, point `seeh.company` DNS at Vercel.
