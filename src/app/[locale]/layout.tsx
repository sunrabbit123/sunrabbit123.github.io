import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../../theme/colors.stylex";
import { fonts } from "../../theme/typography.stylex";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import "../globals.css";

export const metadata: Metadata = {
  title: "DevBlog",
  description: "Exploring modern web development, design patterns, and best practices",
};

const styles = stylex.create({
  html: {
    margin: 0,
    padding: 0,
  },
  body: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.backgroundPrimary,
    color: colors.textPrimary,
    fontFamily: fonts.body,
    margin: 0,
    padding: 0,
  },
  main: {
    flex: 1,
    width: "100%",
  },
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} {...stylex.props(styles.html)}>
      <body {...stylex.props(styles.body)}>
        <NextIntlClientProvider messages={messages}>
          <main {...stylex.props(styles.main)}>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
