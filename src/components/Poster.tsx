import Image from 'next/image';
import Popup from 'reactjs-popup';
import info_icon from "../../public/material-symbols--info.png"
import PosterInventoryTable from "./PosterInventoryTable"
import { use, useEffect, useState } from 'react';

export default function Poster(props: any) {

    const [posterdetails, setPosterdetails] = useState<any>(props.poster);


    const updateDetails = (e: any) => {
        console.log(e.target.value)
        if (e.target.name === "Cost") {
            setPosterdetails({ ...posterdetails, [e.target.name]: Number(e.target.value).toFixed(2) });
        } else {
            setPosterdetails({ ...posterdetails, [e.target.name]: e.target.value });
        }
    }

    return (
        <div key={props.poster.id} className="border-b-[1px] pb-3 px-3">
            <h1 className="text-xl font-semibold py-2">{props.poster.artist} - {props.poster.title}</h1>
            <div className="flex justify-between">
                <div className=" w-40 relative">
                    <Image src={`/posters/${props.poster.filename}`} alt={props.poster.title} width={240} height={360} className="h-auto w-40 mix-blend-darken" />
                    {posterdetails.description ? (
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
                                    <p>{posterdetails.description}</p>
                                </div>
                            </Popup>
                        </div>
                    ) : null}
                </div>
                <PosterInventoryTable isLocked={props.isLocked} updateDetails={updateDetails} posterOptions={posterdetails.options} posterdetails={posterdetails} />
            </div>
        </div>
    )
}