# Ankur Salunkhe Portfolio 🚀

A modern, highly optimized, and production-grade developer & researcher portfolio website showcasing both **Computer Science (AI/ML & Software)** and **Mechanical Engineering (CFD, ORC, Simulations)** double-specializations. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Zustand** client-side state.

---

## ⚡ Premium Production-Grade Features

### 1. Centralized JSON-Driven CMS (`data/`)
Content updating is incredibly easy. All personal information, social handles, future-ready blog modules, and resume download URLs are driven dynamically out of centralized data files. **No UI or code modifications required.**
* **Personal Details, Resume Links, and Blogs:** [personal-data.json](file:///C:/Users/ankur/.gemini/antigravity/scratch/ankur-portfolio/data/personal-data.json)
* **Computer Science Work:** [cs-data.json](file:///C:/Users/ankur/.gemini/antigravity/scratch/ankur-portfolio/data/cs-data.json)
* **Mechanical Engineering & Research:** [mechanical-data.json](file:///C:/Users/ankur/.gemini/antigravity/scratch/ankur-portfolio/data/mechanical-data.json)

### 2. Apple/Stripe-Inspired Native Theme System
* **Light / Dark Switching:** Native light/dark theme context wrapped using `next-themes` and a premium moon/sun toggler in the header.
* **Harmonic Branding:** Custom CSS variables drive high-contrast Slate interfaces for CS software profiles and Emerald-Mint borders for Mechanical engineering details.
* **Micro-interactions:** Interactive card glows, subtle svg grid overlays, and hover lifts make the portfolio feel premium.

### 3. Fully Working Contact API & Spam Armor
* **Endpoint `/api/contact`:** Next.js Server POST endpoint. Integrates seamlessly with the **Resend API**.
* **Zero-Setup Local Fallback:** If `RESEND_API_KEY` is not present, submissions fall back gracefully to browser local storage metrics, preventing breaks in testing.
* **Bot-Defense Honeypots:** Invisible input fields trap bot script requests instantly.
* **Robust Security:** Zod input parsing and strict HTML/XSS character sanitization.

### 4. Protected Analytics Suite & Inbox Dashboard (`/admin`)
* **Access Control:** Log in using your secure, custom-configured administration PIN code.
* **Visitor Metrics:** Visualizes page switches, resume downloads, and click-through rates dynamically with responsive `recharts` graphs.
* **Local Inbox:** View, read, and delete contact form inquiries saved securely in the local localStorage database simulator.
* **Seeding:** Seed mock recruiter events dynamically to showcase dashboard logging capability immediately.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router (Dynamic API endpoints & static pre-rendered pages)
- **Language**: TypeScript (100% strict type safety)
- **Styling**: Tailwind CSS (Custom HSL theme variables)
- **State Management**: Zustand (Persistent client state)
- **Data Visualization**: Recharts (Responsive vector SVGs)
- **Validation**: Zod (Type validation)
- **Email Delivery**: Resend API (Transactional edge mailers)

---

## 📁 Refactored Project Structure

```
├── app/
│   ├── admin/                 # Secure Analytics Panel & Recruiter Dashboard
│   │   └── page.tsx
│   ├── api/                   # Next.js Serverless API endpoints
│   │   └── contact/
│   │       └── route.ts       # Secure Resend + Honeypot Contact Handler
│   ├── layout.tsx             # Theme & Context wrappers
│   ├── page.tsx               # Main portfolio landing & JSON-LD injectors
│   └── globals.css            # Dark/Light CSS design variables
├── components/
│   ├── ui/                    # Shadcn & custom elements (skeleton loaders, cards)
│   ├── About.tsx              # Dynamic interdisciplinary layout
│   ├── Contact.tsx            # Contact form + rate limiting triggers
│   ├── Header.tsx             # Sleek navigation + Theme Switcher
│   └── MechanicalAchievements.tsx # Publication and patent showcase
├── data/
│   ├── config.json            # Centralized SEO & theme defaults
│   ├── cs-data.json           # Unified Software Engineering CMS
│   ├── mechanical-data.json   # Unified Mechanical Engineering CMS
│   └── personal-data.json     # Personal details & Google Drive resume folders
├── lib/
│   ├── analytics.ts           # Dynamic tracking wrapper (local + analytics provider)
│   └── data-loader.ts         # Centralized typed loading interface
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (`.env.local`)
Create a `.env.local` file in the root folder:
```env
# (Optional) Resend API Key for real email forwarding
RESEND_API_KEY=re_your_resend_api_key_here

# (Optional) Site canonical domain
NEXT_PUBLIC_SITE_URL=https://ankur-salunkhe.vercel.app
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🛡️ Audit & Type-Safety Confirmations

- **Typescript compiling:** Success (Checked via `tsc --noEmit`).
- **Production bundling:** Success (Checked via `next build`).
- **SEO Lighthouse Targets:** canonical tags, robots rule files, XML sitemaps, and rich `Person` schema markup injected.

---

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Contact

For questions or collaboration opportunities:
- Email: ankursalunkhe2004@gmail.com
- LinkedIn: [Ankur Salunkhe](https://www.linkedin.com/in/ankur-salunkhe/)
- GitHub: [AnkurSalunkhe11](https://github.com/AnkurSalunkhe11)
