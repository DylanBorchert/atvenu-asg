import Popup from "reactjs-popup"

export default function PosterMore(props: any) {
    return (
        <td colSpan={2}>
            <Popup
                trigger={
                    <button type="button" className='bg-gray-200 text-gray-600 p-2 rounded-md w-full hover:bg-[#00c7fb] hover:text-white disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white' disabled={props.isLocked}>More</button>
                }
                position={'bottom center'}

                closeOnDocumentClick
                arrowStyle={{ color: 'rgb(229 231 235)' }}
            >
                <div className="p-2 bg-gray-200 rounded-md min-w-fit">
                    <label className=""> Description
                        <input type="text" name="description" defaultValue={props.posterdetails.description} size={1} className="w-full text-center h-12" onChange={props.updateDetails} disabled={props.isLocked} />
                    </label>
                    <label className=""> Notes
                        <textarea name="notes" defaultValue={props.posterdetails.notes} className="w-full h-24 p-2" onChange={props.updateDetails} disabled={props.isLocked} />
                    </label>
                    <div className="flex">
                        {props.posterOptions.map((option: any) => {
                            return (
                                <label key={option.id} className="text-center">{`Price: (${option.dimensions})`}
                                    <input key={option.id} type="number" step='0.25' name="Cost" defaultValue={option.Cost.toFixed(2)} size={1} className="text-center h-12 m-2 w-20" onChange={props.updatePoster} disabled={props.isLocked} id={option.id} />
                                </label>
                            )
                        })}
                    </div>
                </div>
            </Popup>
        </td>
    )
}