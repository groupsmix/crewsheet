import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrewSheet — Run Your Cleaning Business From a Google Sheet",
  description:
    "The cleaning business template + setup. 1/5th the cost of Jobber. Runs on the cheapest Android phone. DIY $97, done-for-you $497.",
  openGraph: {
    title: "CrewSheet — Run Your Cleaning Business From a Google Sheet",
    description:
      "Stop losing customers to missed follow-ups. Set up in 40 minutes. 1/5th the cost of Jobber.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
