# Prometric Edge

Mobile-first healthcare licensing exam preparation for DHA, DOH and MOHAP candidates.

## MVP

- Pharmacist and Registered Nurse exam tracks
- Free diagnostic practice with immediate answer explanations
- Results and readiness feedback
- Responsive PWA-ready interface
- Environment placeholders for Supabase and Razorpay

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` before enabling authentication or payments.

## Production setup

1. Create a Supabase project and run `supabase/schema.sql` in its SQL Editor.
2. Add the Supabase URL and anon key to Vercel.
3. In Supabase Auth URL Configuration, set the production site URL and add
   `https://YOUR-DOMAIN/auth/callback` as an allowed redirect URL.
4. Enable Google auth only after adding the matching Google OAuth credentials.
5. Keep Razorpay variables empty until paid access and the reviewed content bank are ready.

The application remains usable without Supabase using local browser progress.

## Disclaimer

Prometric Edge is an independent preparation platform and is not affiliated with DHA, DOH, MOHAP, Prometric, or any licensing authority.
