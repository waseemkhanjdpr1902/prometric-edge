# Prometric Edge

Mobile-first healthcare licensing exam preparation for DHA, DOH and MOHAP candidates.

## MVP

- Pharmacist and Registered Nurse exam tracks
- Free diagnostic practice with immediate answer explanations
- Results and readiness feedback
- Responsive PWA-ready interface
- Firebase Email/Password authentication with verification and password reset
- Environment placeholders for Firebase and Razorpay

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` before enabling authentication or payments.

## Production setup

1. Create a Firebase project and register a Web app.
2. In Firebase Authentication, enable the Email/Password provider.
3. Add the six public Firebase Web configuration values from `.env.example` to Vercel.
4. In Firebase Authentication settings, add the production Vercel/domain hostname to Authorized domains.
5. Keep Razorpay variables empty until paid access and the reviewed content bank are ready.

Study progress remains stored locally in the browser in this release.

## Disclaimer

Prometric Edge is an independent preparation platform and is not affiliated with DHA, DOH, MOHAP, Prometric, or any licensing authority.
