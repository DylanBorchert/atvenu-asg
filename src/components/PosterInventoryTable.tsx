import { use, useEffect, useMemo, useState } from "react";
import PosterInventoryRow from "./PosterInventoryRow"
import TotalSoldChart from "./TotalSoldChart";
import Popup from "reactjs-popup";

export default function PosterInventoryForm(props: any) {

    const [posterOptions, setposterOptions] = useState<any>(props.posterOptions);

    const updatePoster = (e: any) => {
        console.log(e.target.value)
        let index = e.target.id - 1;  // Adjusting index based on id from the event
        if (index >= 0 && index < posterOptions.length) {
            let newPoster = posterOptions.map((item: any, idx: number) => {
                if (idx === index) {
                    return { ...item, [e.target.name]: Number(e.target.value) };
                }
                return item;
            });
            console.log(newPoster)
            setposterOptions(newPoster);
        }
    }


    const sumOfTotalIn = useMemo(() => {
        return posterOptions.reduce((acc: any, option: any) => {
            return acc + option.CountIn + option.Add
        }, 0)
    }, [posterOptions])

    const sumOfComp = useMemo(() => {
        return posterOptions.reduce((acc: any, option: any) => {
            return acc + option.Comp
        }, 0)
    }, [posterOptions])

    const sumOfCountOut = useMemo(() => {
        return posterOptions.reduce((acc: any, option: any) => {
            return acc + option.CountOut
        }, 0)
    }, [posterOptions])

    const sumOfTotalSold = useMemo(() => {
        return posterOptions.reduce((acc: any, option: any) => {
            return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp)
        }, 0)
    }, [posterOptions])

    const sumOfGross = useMemo(() => {
        return posterOptions.reduce((acc: any, option: any) => {
            return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp) * option.Cost
        }, 0)
    }, [posterOptions])


    return (
        <div className="w-full ml-5">
            <div>
                <table className="w-full">
                    <thead className="w-full">
                        <tr className="*:px-2 align-bottom">
                            <th>Size</th>
                            <th>Price</th>
                            <th><p>QTY</p>Avail</th>
                            <th>Count In</th>
                            <th>Add</th>
                            <th>Total In</th>
                            <th>Comp</th>
                            <th>Count Out</th>
                            <th>Total Sold</th>
                            <th>Gross</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {posterOptions.map((option: any) => {
                            return (
                                <PosterInventoryRow option={option} key={option.id} isLocked={props.isLocked} updatePoster={updatePoster} />
                            )
                        })}
                        <tr className="*:p-2 text-center">
                            <td colSpan={3} className="">
                            </td>
                            <td colSpan={2} className="tooltipBoundary">
                                <Popup
                                    trigger={
                                        <button type="button" className="bg-gray-200 text-gray-600 p-2 rounded-md hover:bg-[#00c7fb] hover:text-white w-full button">More</button>
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
                                            {posterOptions.map((option: any) => {
                                                return (
                                                    <label key={option.id} className="text-center">{`Price: (${option.dimensions})`}
                                                        <input key={option.id} type="number" step='0.01' name="Cost" defaultValue={option.Cost.toFixed(2)} size={1} className="text-center h-12 m-2 w-20" onChange={updatePoster} disabled={props.isLocked} id={option.id} />
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </Popup>
                            </td>
                            <td className="text-[#00c7fb]">{sumOfTotalIn}</td>
                            <td className="text-red-500">{sumOfComp}</td>
                            <td className="">{sumOfCountOut}</td>
                            <TotalSoldChart TotalSold={sumOfTotalSold} CountOut={sumOfCountOut} />
                            <td className="text-[#00c7fb]">${sumOfGross.toFixed(2)}</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}