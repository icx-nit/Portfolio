import type { Metadata } from "next";
import { AppProvider } from "@/lib/i18n/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nittaya Pana (นิตยา ปานา) — Software Developer & Engineer",
  description:
    "Personal portfolio of Nittaya Pana (นิตยา ปานา), Software Engineering student at School of Information and Communication Technology, University of Phayao. Featuring Wope Violet Horizon theme, Social Feed, and AI portfolio assistant.",
  keywords: [
    "Nittaya Pana",
    "นิตยา ปานา",
    "Software Engineer",
    "University of Phayao",
    "มหาวิทยาลัยพะเยา",
    "School of ICT",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Nittaya Pana", url: "https://github.com/icx-nit" }],
  openGraph: {
    title: "Nittaya Pana (นิตยา ปานา) — Software Developer",
    description:
      "Personal portfolio showcasing full-stack projects, social updates, and software engineering journey at University of Phayao.",
    url: "https://github.com/icx-nit",
    siteName: "Nittaya Pana Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-night-violet text-soft-quartz antialiased selection:bg-ultraviolet-core selection:text-white">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
