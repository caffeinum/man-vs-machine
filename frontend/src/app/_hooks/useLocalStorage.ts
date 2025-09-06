import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = (key: string) => {
	const store = (val: string) => localStorage.setItem(key, val);
	const get = useCallback(() => localStorage.getItem(key), [key]);

	const [item, setItem] = useState(get());

	useEffect(() => {
		setItem(get());
	}, [get]);

	return { store, get, value: item };
};
