import Image from "next/image"
import PosterInventoryForm from "./PosterInventoryTable"
import Popup from 'reactjs-popup';
import info_icon from "../../public/material-symbols--info.png"
import Poster from "./Poster";


export default function PosterList(props: any) {

    return (
        <div className="">
            {props.posters.map((poster: any) => {
                return (
                    <Poster key={poster.id} poster={poster} isLocked={props.isLocked} updatePosters={props.updatePosters} />
                )
            })}
        </div>
    )
}