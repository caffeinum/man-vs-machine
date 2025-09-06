"use client";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function Form({
	title,
	children,
	handleSubmit,
}: {
	title: string;
	children?: React.ReactNode;
	handleSubmit: (value: string) => void;
}) {
	const [value, setValue] = useState("");

	return (
		<form onSubmit={() => handleSubmit(value)}>
			<Label>
				{title}
				<Input
					placeholder={title}
					id="input"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</Label>
			{children}
		</form>
	);
}
