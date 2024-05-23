import { use, useEffect, useMemo, useState } from "react";
import PosterInventoryRow from "./PosterInventoryRow"
import TotalSoldChart from "./TotalSoldChart";
import Popup from "reactjs-popup";
import PosterMore from "./PosterMore";

export default function PosterInventoryForm(props: any) {

    const [posterOptions, setposterOptions] = useState<any>(props.posterOptions);

    const updateSummary = (newUnitSold: number, newTotalGross: number) => {
        props.updateUntiSold(newUnitSold);
        props.updateTotalGross(newTotalGross);
    }


    const updatePoster = (e: any) => {
        let index = e.target.id - 1;  // Adjusting index based on id from the event
        if (index >= 0 && index < posterOptions.length) {
            let newPoster = posterOptions.map((item: any, idx: number) => {
                if (idx === index) {
                    return { ...item, [e.target.name]: Number(e.target.value) };
                }
                return item;
            });
            setposterOptions(newPoster);
            props.updateOptionDetails(newPoster);
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
                            <td colSpan={3}></td>
                            <PosterMore posterdetails={props.posterdetails} updateDetails={props.updateDetails} posterOptions={posterOptions} updatePoster={updatePoster} isLocked={props.isLocked} />
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