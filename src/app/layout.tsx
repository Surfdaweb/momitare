import "./globals.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Momitaire",
  description:
    "A double-deck solitaire game that my mom told me about and asked to make digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={"container"}>{children}</div>
      </body>
    </html>
  );
}
