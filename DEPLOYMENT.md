# Ember Coffee — Deployment & Production Guide

This guide details how to deploy **Ember Coffee** to Vercel, Netlify, or AWS.

---

## 1. Deploying to Vercel (Recommended)

1. Push code repository to GitHub / GitLab.
2. Import project into Vercel Dashboard.
3. Vercel automatically detects Vite + React configuration.
4. Set Build Command: `npm run build`
5. Set Output Directory: `dist`
6. Click **Deploy**.

---

## 2. Environment Variables

Ensure the following variables are configured in your Vercel / Netlify environment settings:

```env
VITE_APP_NAME="Ember Coffee"
VITE_STRIPE_PUBLIC_KEY="pk_live_your_stripe_key"
```

---

## 3. Lighthouse & SEO Optimization Checklist

- [x] Preconnect to Google Fonts (*Playfair Display* & *Plus Jakarta Sans*)
- [x] Responsive layout with Mobile Drawer navigation
- [x] Lazy loading image tags with Unsplash CDN optimizations
- [x] OpenGraph meta tags and favicon SVGs configured
