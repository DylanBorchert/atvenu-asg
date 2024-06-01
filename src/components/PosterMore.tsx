import { ItemContext } from "@/context/ItemProvider";
import { useContext, useState } from "react";
import Popup from "reactjs-popup"

export default function PosterMore(props: any) {
    const { updateDetails, updateDetailOption, updateDescriptionOrNotes } = useContext(ItemContext);
    const [inputValues, setInputValues] = useState({
        description: props.posterdetails.description,
        notes: props.posterdetails.notes,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, id } = event.target;
        let newInputValues = { ...inputValues, [name]: value };
        setInputValues(newInputValues);
    };


    const handleClose = () => {
        updateDescriptionOrNotes(inputValues, props.posterId);
    };

    return (
        <td colSpan={2}>
            <Popup
                trigger={
                    <button type="button" className='bg-gray-200 text-gray-600 p-2 rounded-md w-full hover:bg-[#00c7fb] hover:text-white disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white' disabled={props.isLocked}>More</button>
                }
                onClose={handleClose}
                position={'bottom center'}
                arrowStyle={{ color: 'rgb(229 231 235)' }}
            >
                <div className="p-2 bg-gray-200 rounded-md min-w-fit">
                    <label> Description
                        <input type="text" name="description" id={props.posterId} defaultValue={props.posterdetails.description} size={1} className="w-full text-center h-12" disabled={props.isLocked} value={inputValues.description} onChange={handleChange} />
                    </label>
                    <label> Notes
                        <textarea id={props.posterId} name="notes" defaultValue={props.posterdetails.notes} className="w-full h-24 p-2" disabled={props.isLocked} onChange={handleChange} />
                    </label>
                    <div className="flex">
                        {props.posterOptions.map((option: any) => {
                            return (
                                <label key={option.id} className="text-center">{`Price: (${option.dimensions})`}
                                    <input key={option.id} type="number" step='0.25' name="Cost" defaultValue={option.Cost.toFixed(2)} size={1} className="text-center h-12 m-2 w-20" onChange={(e) => updateDetailOption(e, props.posterId)} disabled={props.isLocked} id={option.id} />
                                </label>
                            )
                        })}
                    </div>
                </div>
            </Popup>
        </td>
    )
}