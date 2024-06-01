"use client";
import { createContext, useEffect, useState } from "react";
import data from "@/data/posters";

export const ItemContext = createContext<any>(null);

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
	const [posters, setPosters] = useState(data as any);

	useEffect(() => {
		console.log(posters);
	}, [posters]);

	/**
   * Updates the posters array with a new poster object.
   *
   * @param {any} newPoster - The new poster object to be added or updated in the posters array.
   */
	const updatePosters = (newPoster: any) => {
		let newPosters = posters.map((poster: any) => {
			if (poster.id === newPoster.id) {
				return newPoster;
			}
			return poster;
		})
		setPosters(newPosters);
	}

	/**
	 * Updates the details of the poster based on the event target's name and value.
	 * If the event target's name is "Cost", it converts the value to a number with 2 decimal places.
	 * @param {any} e - The event object containing the target element.
	 */
	const updateDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newPosterDetails = posters.map((poster: any) => {
			if (poster.id === Number(e.target.id)) {
				return { ...poster, [e.target.name]: Number.isInteger(e.target.value) ? Number(e.target.value) : e.target.value }
			}
			return poster;
		})
		setPosters(newPosterDetails);
	}

	/**
	 * Updates the option details of the poster.
	 * Then Triggers the parent component to update the poster.
	 * 
	 * @param options - The new options for the poster.
	 */
	const updateDetailOption = (e: React.ChangeEvent<HTMLInputElement>, posterId: number) => {
		console.log('newPosterDetails', posterId, e.target.id, e.target.name, e.target.value);
		let newDetails = posters.map((poster: any) => {
			if (poster.id === posterId) {
				let newOptions = poster.options.map((option: any) => {
					if (option.id === Number(e.target.id)) {
						return { ...option, [e.target.name]: Number(e.target.value) }
					}
					return option;
				})
				return { ...poster, options: newOptions };
			}
			return poster;
		})
		setPosters(newDetails);
	}

	return (
		<ItemContext.Provider
			value={{ posters, setPosters, updatePosters, updateDetails, updateDetailOption }}
		>
			{children}
		</ItemContext.Provider>
	);
};
