import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../theme/colors.stylex";
import { fonts } from "../theme/typography.stylex";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...stylex.props(styles.html)}>
      <body {...stylex.props(styles.body)}>
        <main {...stylex.props(styles.main)}>{children}</main>
      </body>
    </html>
  );
}
