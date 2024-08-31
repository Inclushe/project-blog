import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";

import ThemeProvider from "@/components/ThemeProvider";
import RespectMotionPreferences from "@/components/RespectMotionPreferences";

import { cookies } from "next/headers";

const mainFont = Work_Sans({
	subsets: ["latin"],
	display: "fallback",
	weight: "variable",
	variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
	subsets: ["latin"],
	display: "fallback",
	weight: "variable",
	variable: "--font-family-mono",
});

function RootLayout({ children }) {
	// TODO: Dynamic theme depending on user preference
	const savedTheme = cookies().get("color-theme");
	const theme = savedTheme?.value || "light";
	return (
		<ThemeProvider>
			<RespectMotionPreferences>
				<html
					lang="en"
					className={clsx(mainFont.variable, monoFont.variable)}
					data-color-theme={theme}
					style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
				>
					<body>
						<Header theme={theme} />
						<main>{children}</main>
						<Footer />
					</body>
				</html>
			</RespectMotionPreferences>
		</ThemeProvider>
	);
}

export default RootLayout;