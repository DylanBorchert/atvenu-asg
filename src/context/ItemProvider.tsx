"use client";
import { createContext, useEffect, useState } from "react";
import data from "@/data/posters";

export const ItemContext = createContext<any>(null);

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
	const [posters, setPosters] = useState(data as any);

	/**
	 * Updates the details of a poster based on the input change event.
	 * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
	 */
	const updateDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newPosterDetails = posters.map((poster: any) => {
			if (poster.id === Number(e.target.id)) {
				return { ...poster, [e.target.name]: Number.isInteger(e.target.value) ? Number(e.target.value) : e.target.value };
			}
			return poster;
		});
		setPosters(newPosterDetails);
	};

	/**
	 * Updates the detail option based on the provided event and poster ID.
	 * @param e - The change event triggered by the input element.
	 * @param posterId - The ID of the poster.
	 */
	const updateDetailOption = (e: React.ChangeEvent<HTMLInputElement>, posterId: number) => {
		let newDetails = posters.map((poster: any) => {
			if (poster.id === posterId) {
				let newOptions = poster.options.map((option: any) => {
					if (option.id === Number(e.target.id)) {
						return { ...option, [e.target.name]: Number(e.target.value) };
					}
					return option;
				});
				return { ...poster, options: newOptions };
			}
			return poster;
		});
		setPosters(newDetails);
	}

	/**
	 * Updates the description or notes of a poster in the posters array.
	 * 
	 * @param data - The new description or notes data to update the poster with.
	 * @param posterId - The ID of the poster to update.
	 */
	const updateDescriptionOrNotes = (data: any, posterId: number) => {
		let newDetails = posters.map((poster: any) => {
			if (poster.id === posterId) {
				return { ...poster, ...data };
			}
			return poster;
		});
		setPosters(newDetails);
	}

	return (
		<ItemContext.Provider
			value={{ posters, setPosters, updateDetails, updateDetailOption, updateDescriptionOrNotes }}
		>
			{children}
		</ItemContext.Provider>
	);
};
