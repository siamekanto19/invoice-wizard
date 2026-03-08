<p align="center">
  <img src="public/logo.svg" alt="Invoice Wizard" width="64" height="64" />
</p>

<h1 align="center">Invoice Wizard</h1>

<p align="center">
  <strong>Free, open-source invoice generator — create professional invoices in under two minutes.</strong>
</p>

<p align="center">
  <a href="https://invoicewizard.app">Live App</a> ·
  <a href="#features">Features</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#tech-stack">Tech Stack</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

---

## What is Invoice Wizard?

**Invoice Wizard** is a client-side invoice generator built for freelancers, contractors, and small businesses who just want to get paid — without signing up, without storing data on a server, and without paying a subscription.

Fill in your details, pick a template, and download a pixel-perfect PDF. Everything runs entirely in the browser.

🔗 **Try it now → [invoicewizard.app](https://invoicewizard.app)**

---

## Features

| Feature | Description |
|---|---|
| 🎨 **6 Professional Templates** | Choose from Professional, Minimal, Elegant, Playful, Corporate, and Classic designs |
| 📄 **One-Click PDF Export** | Generate and download production-ready PDFs directly in your browser |
| 👀 **Live Preview** | See your invoice update in real-time as you type |
| 💰 **Tax & Discount Calculations** | Automatic line-item totals, tax rates, and discount percentages |
| 🖼️ **Logo Upload** | Brand your invoices with your company logo |
| 💱 **Multi-Currency Support** | USD, EUR, GBP, JPY, INR, BDT, and more |
| 📝 **Custom Notes & Terms** | Add payment terms, thank-you messages, or fine print |
| 🔒 **Privacy-First** | Zero data stored on servers — everything stays in your browser via `localStorage` |
| 🚀 **No Sign-Up Required** | Start creating invoices immediately, no account needed |
| 📱 **Responsive Design** | Works beautifully on desktop, tablet, and mobile |

### Two Ways to Create

- **Full Form** — All sections visible at once with a live invoice preview panel. Best for power users.
- **Step-by-Step Questionnaire** — Guided experience that walks you through each section one at a time. Great for first-timers.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/invoice-wizard.git
cd invoice-wizard

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app running.

### Build for Production

```bash
npm run build
npm start
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Components** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| **PDF Generation** | [@react-pdf/renderer](https://react-pdf.org/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) (persisted to localStorage) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Fonts** | Outfit, Playfair Display, Lato, Nunito, Fredoka (via `next/font`) |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout (SEO, fonts, analytics)
│   ├── globals.css               # Global styles
│   └── generate/
│       └── page.tsx              # Invoice generator (Full Form + Questionnaire)
├── components/
│   ├── form-sections/            # Modular form sections
│   │   ├── CompanySection.tsx    #   Company / sender details
│   │   ├── ClientSection.tsx     #   Client / recipient details
│   │   ├── InvoiceDetails.tsx    #   Invoice number, dates, template
│   │   ├── InvoiceItemsSection.tsx   # Line items with totals
│   │   ├── ItemsSection.tsx      #   Simplified items (questionnaire)
│   │   ├── PaymentSection.tsx    #   Payment terms, bank info, notes
│   │   ├── LogoUpload.tsx        #   Company logo uploader
│   │   └── DatePicker.tsx        #   Date picker component
│   ├── invoice/
│   │   ├── invoice-form.tsx      # Full-form layout with validation
│   │   ├── invoice-preview.tsx   # Preview panel + PDF download
│   │   └── templates/            # PDF & preview templates
│   │       ├── ProfessionalTemplate.tsx
│   │       ├── MinimalTemplate.tsx
│   │       ├── ElegantTemplate.tsx
│   │       ├── PayfulTemplate.tsx
│   │       ├── CorporateTemplate.tsx
│   │       └── ClassicTemplate.tsx
│   └── ui/                       # shadcn/ui components
├── store/
│   └── invoice-store.ts          # Zustand store (persisted)
├── hooks/
│   ├── use-toast.ts              # Toast notifications
│   └── use-mobile.ts             # Mobile detection
└── lib/
    └── utils.ts                  # Utility functions
```

---

## How It Works

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  User fills  │────▶│  Zustand store    │────▶│  Live preview   │
│  form fields │     │  (localStorage)   │     │  updates        │
└─────────────┘     └──────────────────┘     └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  @react-pdf      │
                                              │  renders PDF     │
                                              │  in-browser      │
                                              └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  Download .pdf   │
                                              │  to device       │
                                              └─────────────────┘
```

1. **Fill in details** — Enter your company info, client details, and line items
2. **Pick a template** — Choose from 6 professionally designed layouts
3. **Download & send** — Export a pixel-perfect PDF, entirely client-side

No server round-trips. No data leaves the browser.

---

## Invoice Templates

| Template | Style |
|---|---|
| **Professional** | Clean and modern, ideal for consultants and agencies |
| **Minimal** | Stripped-back design focused on content and clarity |
| **Elegant** | Refined typography with a premium, editorial feel |
| **Playful** | Friendly and approachable, great for creative freelancers |
| **Corporate** | Structured and formal, suited for enterprise billing |
| **Classic** | Traditional invoice layout with timeless styling |

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ♥ · <a href="https://invoicewizard.app">invoicewizard.app</a>
</p>
