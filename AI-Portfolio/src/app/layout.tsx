import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nittaya Pana — Software Developer & Engineer",
  description:
    "Personal portfolio of Nittaya Pana, Software Engineering student at School of Information and Communication Technology, University of Phayao. Explore full-stack projects, technical skills, and AI portfolio assistant.",
  keywords: [
    "Nittaya Pana",
    "Software Engineer",
    "University of Phayao",
    "School of ICT",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Nittaya Pana", url: "https://github.com/icx-nit" }],
  openGraph: {
    title: "Nittaya Pana — Software Developer & Engineer",
    description:
      "Personal portfolio showcasing full-stack projects, technical skills, and software development journey at University of Phayao.",
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
      <body className="bg-obsidian text-bone selection:bg-bone selection:text-obsidian antialiased">
        {children}
      </body>
    </html>
  );
}
