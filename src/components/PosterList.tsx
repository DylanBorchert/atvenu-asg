import Image from "next/image"
import PosterInventoryForm from "./PosterInventoryTable"

export default function PosterList(props: any) {

    return (
        <div className="">
            {props.posters.map((poster: any) => {
                return (
                    <div key={poster.id} className="border-b-[1px] pb-3 px-3">
                        <h1 className="text-xl font-semibold py-2">{poster.artist} - {poster.title}</h1>
                        <div className="flex justify-between">
                            <div className="">
                                <Image src={`/posters/${poster.filename}`} alt={poster.title} width={240} height={360} className="h-auto w-40" title={poster.description} />
                            </div>
                            <PosterInventoryForm poster={poster.options} isLocked={props.isLocked} />
                        </div>

                    </div>
                )
            })}
        </div>
    )
}