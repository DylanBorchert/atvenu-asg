"use client";
import { createContext, useEffect, useState } from "react";
import data from "@/data/posters";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
	const [posters, setPosters] = useState(data);

	const updateOptions = (options) => {
		console.log("updateOptions", options);
	};

	const updateItem = (item) => {
		console.log("updateItem", item);
	};

	return (
		<ItemContext.Provider value={{ posters, setPosters }}>
			{children}
		</ItemContext.Provider>
	);
};
