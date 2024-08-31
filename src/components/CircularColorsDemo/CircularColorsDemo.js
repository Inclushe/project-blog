"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";
import { motion } from "framer-motion";

const COLORS = [
	{ label: "red", value: "hsl(348deg 100% 60%)" },
	{ label: "yellow", value: "hsl(50deg 100% 55%)" },
	{ label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
	const [timeElapsed, setTimeElapsed] = React.useState(0);
	const [status, setStatus] = React.useState("paused");

	React.useEffect(() => {
		if (status === "playing") {
			const handleInterval = () => {
				setTimeElapsed((currentTimeElapsed) => currentTimeElapsed + 1);
			};
			const interval = setInterval(handleInterval, 1000);
			return () => {
				clearInterval(interval);
			};
		}
	}, [status]);

	const handleClick = () => {
		if (status === "paused") {
			setStatus("playing");
		} else {
			setStatus("paused");
		}
	};

	const id = React.useId();

	return (
		<Card as="section" className={styles.wrapper}>
			<ul className={styles.colorsWrapper}>
				{COLORS.map((color, index) => {
					const isSelected = index === timeElapsed % 3;

					return (
						<li className={styles.color} key={index}>
							{isSelected && (
								<motion.div
									layoutId={id}
									className={styles.selectedColorOutline}
									style={{ zIndex: 2 }}
								/>
							)}
							<div
								className={clsx(
									styles.colorBox,
									isSelected && styles.selectedColorBox,
								)}
								style={{
									backgroundColor: color.value,
								}}
							>
								<VisuallyHidden>{color.label}</VisuallyHidden>
							</div>
						</li>
					);
				})}
			</ul>

			<div className={styles.timeWrapper}>
				<dl className={styles.timeDisplay}>
					<dt>Time Elapsed</dt>
					<dd>{timeElapsed}</dd>
				</dl>
				<div className={styles.actions}>
					<button onClick={handleClick}>
						{status === "paused" ? (
							<>
								<Play />
								<VisuallyHidden>Play</VisuallyHidden>
							</>
						) : (
							<>
								<Pause />
								<VisuallyHidden>Pause</VisuallyHidden>
							</>
						)}
					</button>
					<button
						onClick={() => {
							setTimeElapsed(0);
							setStatus("paused");
						}}
					>
						<RotateCcw />
						<VisuallyHidden>Reset</VisuallyHidden>
					</button>
				</div>
			</div>
		</Card>
	);
}

export default CircularColorsDemo;
