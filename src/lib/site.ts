import { gallery } from "@/content/gallery";
import { contact, navigation } from "@/content/site";

/** True when at least one gallery photo is published. */
export const hasGallery = gallery.some((item) => item.published);

/** Main navigation, without links to sections that are hidden. */
export function getNavigation() {
  return navigation.filter((item) => item.href !== "#field-notes" || hasGallery);
}

/** The confirmed public URL, or null. Never guessed. */
export function getSiteUrl(): URL | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

export type ContactChannel = { kind: "email" | "phone" | "whatsapp"; label: string; value: string; href: string };

export function getContactChannels(source: { email: string; phone: string; whatsapp: string } = contact): ContactChannel[] {
  const channels: ContactChannel[] = [];
  const email = source.email.trim();
  const phone = source.phone.trim();
  const whatsapp = source.whatsapp.replace(/[^\d]/g, "");
  if (email) channels.push({ kind: "email", label: "Email", value: email, href: `mailto:${email}` });
  if (phone) channels.push({ kind: "phone", label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` });
  if (whatsapp) channels.push({ kind: "whatsapp", label: "WhatsApp", value: source.whatsapp.trim(), href: `https://wa.me/${whatsapp}` });
  return channels;
}
