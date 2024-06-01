import Image from 'next/image';
import Popup from 'reactjs-popup';
import info_icon from "../../public/material-symbols--info.png"
import PosterInventoryTable from "./PosterInventoryTable"

export default function Poster(props: any) {
    return (
        <div key={props.poster.id} className="border-b-[1px] pb-3 px-3">
            <h1 className="text-xl font-semibold py-2">{props.poster.artist} - {props.poster.title}</h1>
            <div className="flex justify-between">
                <div className=" w-40 relative">
                    <Image src={`/posters/${props.poster.filename}`} alt={props.poster.title} width={240} height={360} className="h-auto w-40 mix-blend-darken" />
                    {props.poster.description ? (
                        <div className="absolute top-0 -right-6">
                            <Popup
                                trigger={(
                                    <Image src={info_icon} alt="info" width={20} height={20} className="mix-blend-difference" />
                                )}
                                position="right center"
                                on={['hover', 'focus']}
                                arrowStyle={{ color: 'rgb(229 231 235)' }}
                            >
                                <div className="bg-gray-200 p-2 rounded-sm">
                                    <p>{props.poster.description}</p>
                                </div>
                            </Popup>
                        </div>
                    ) : null}
                </div>
                <PosterInventoryTable posterId={props.posterId} isLocked={props.isLocked} poster={props.poster} />
            </div>
        </div>
    )
}