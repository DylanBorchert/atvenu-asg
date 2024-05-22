import posters from "@/data/posters";

export function getPosters() {
	return JSON.parse(posters);
}

export function getPosterById(id: number) {
	const poster = JSON.parse(posters).find((poster: any) => poster.id === id);
	return poster;
}
