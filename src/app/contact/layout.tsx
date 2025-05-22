// src/app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Game Explorer",
  description:
    "Get in touch with the Game Explorer team. We'd love to hear from you!",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
