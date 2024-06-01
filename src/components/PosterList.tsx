import { useContext } from "react";
import Poster from "./Poster";
import { ItemContext } from "@/context/ItemProvider";


export default function PosterList(props: any) {
    const { posters } = useContext(ItemContext);

    return (
        <div>
            {posters.map((poster: any) => {
                return (
                    <Poster key={poster.id} posterId={poster.id} poster={poster} isLocked={props.isLocked} />
                )
            })}
        </div>
    )
}