import type { Metadata } from "next";
import {
  Fredoka,
  Geist,
  Geist_Mono,
  Lato,
  Nunito,
  Outfit,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Invoice Wizard - Free Online Invoice Generator & Maker",
  description:
    "Create professional invoices instantly with Invoice Wizard. Free online invoice generator with customizable templates, PDF download, client management, and automated calculations. Perfect for freelancers, small businesses, and contractors.",
  keywords: [
    "invoice generator",
    "free invoice maker",
    "online invoice creator",
    "professional invoice template",
    "PDF invoice generator",
    "small business invoicing",
    "freelance invoice tool",
    "invoice software",
    "billing generator",
    "custom invoice design",
    "invoice management",
    "digital invoicing",
    "business invoice maker",
    "contractor invoice tool",
    "automated invoice calculation",
    "invoice tracking",
    "client billing",
    "invoice creator online",
    "printable invoice generator",
    "invoice template free",
  ],
  authors: [{ name: "Invoice Wizard Team" }],
  creator: "Invoice Wizard",
  publisher: "Invoice Wizard",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://invoicewizard.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Invoice Wizard - Free Professional Invoice Generator",
    description:
      "Create stunning professional invoices in minutes. Free online invoice maker with PDF export, custom templates, and automated calculations for freelancers and businesses.",
    url: "https://invoicewizard.app",
    siteName: "Invoice Wizard",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 600,
        alt: "Invoice Wizard - Professional Invoice Generator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice Wizard - Free Online Invoice Generator",
    description:
      "Create professional invoices instantly. Free invoice maker with PDF download, custom templates, and client management for freelancers and businesses.",
    images: ["/twitter-image.png"],
    creator: "@invoicewizard",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Business Tools",
  classification: "Invoice Generator",
  referrer: "origin-when-cross-origin",
  applicationName: "Invoice Wizard",
  generator: "Invoice Wizard",
  icons: {
    icon: [
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.png",
        color: "#3b82f6",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#3b82f6",
    "theme-color": "#ffffff",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Invoice Wizard",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Invoice Wizard",
              description:
                "Free online invoice generator for creating professional invoices with PDF export and custom templates",
              url: "https://invoicewizard.app",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              featureList: [
                "Free invoice generation",
                "PDF export",
                "Custom templates",
                "Client management",
                "Automated calculations",
                "Professional designs",
              ],
              author: {
                "@type": "Organization",
                name: "Invoice Wizard",
              },
              provider: {
                "@type": "Organization",
                name: "Invoice Wizard",
              },
            }),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${outfit.className} ${lato.style} ${playfair.style} ${nunito.style} ${fredoka.style} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
