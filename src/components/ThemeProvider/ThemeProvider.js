"use client";
import React from "react";
import Cookie from "js-cookie";
import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

export const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
	const cookieTheme = Cookie.get("color-theme");
	const [theme, setTheme] = React.useState(cookieTheme || "light");
	React.useEffect(() => {
		const htmlElement = document.querySelector("html");
		htmlElement.setAttribute("data-color-theme", theme);
		const currentTokens = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
		const themeStyle = Object.entries(currentTokens).reduce(
			(currentString, token) => {
				return `${currentString}${token[0]}:${token[1]};`;
			},
			"",
		);
		htmlElement.style = themeStyle;
	}, [theme]);

	const toggleTheme = React.useCallback(() => {
		if (theme === "light") {
			setTheme("dark");
			Cookie.set("color-theme", "dark", {
				expires: 1000,
			});
		} else {
			setTheme("light");
			Cookie.set("color-theme", "light", {
				expires: 1000,
			});
		}
	}, [theme]);
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;
