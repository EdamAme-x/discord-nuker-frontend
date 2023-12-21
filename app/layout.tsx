import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { SEO_DEFAULT } from "@/components/layout/seo";
import { ThemeProvider } from "@/components/layout/themeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = SEO_DEFAULT;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head prefix="og: http://ogp.me/ns# website: http://ogp.me/ns/website#">
				<link rel="icon apple-touch-icon shortcut" href="/icon.gif" />
			</head>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
