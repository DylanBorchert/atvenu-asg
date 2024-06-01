"use client";
import { createContext, useEffect, useState } from "react";
import data from "@/data/posters";

export const ItemContext = createContext<any>(null);

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
	const [posters, setPosters] = useState(data);

	/**
   * Updates the posters array with a new poster object.
   *
   * @param {any} newPoster - The new poster object to be added or updated in the posters array.
   */
	const updatePosters = (newPoster: any) => {
		let newPosters = posters?.map((poster: any) => {
			if (poster.id === newPoster.id) {
				return newPoster;
			}
			return poster;
		})
		setPosters(newPosters);
	}

	const updateOptionDetails = (options: any) => {
		let newDetails = { ...posters, options: options };
		setPosters(newDetails);
	}

	return (
		<ItemContext.Provider
			value={{ posters, setPosters }}
		>
			{children}
		</ItemContext.Provider>
	);
};
