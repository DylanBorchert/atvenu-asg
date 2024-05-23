import { use, useEffect, useMemo, useState } from "react";
import PosterInventoryRow from "./PosterInventoryRow"
import TotalSoldChart from "./TotalSoldChart";

export default function PosterInventoryForm(props: any) {
    const [posterdetails, setPosterdetails] = useState<any>(props.poster);

    const updatePoster = (e: any) => {
        let index = e.target.id - 1;  // Adjusting index based on id from the event
        if (index >= 0 && index < posterdetails.length) {
            let newPoster = posterdetails.map((item: any, idx: number) => {
                if (idx === index) {
                    return { ...item, [e.target.name]: Number(e.target.value) };
                }
                return item;
            });
            setPosterdetails(newPoster)
        }
    }

    const sumOfTotalIn = useMemo(() => {
        return posterdetails.reduce((acc: any, option: any) => {
            return acc + option.CountIn + option.Add
        }, 0)
    }, [posterdetails])

    const sumOfComp = useMemo(() => {
        return posterdetails.reduce((acc: any, option: any) => {
            return acc + option.Comp
        }, 0)
    }, [posterdetails])

    const sumOfCountOut = useMemo(() => {
        return posterdetails.reduce((acc: any, option: any) => {
            return acc + option.CountOut
        }, 0)
    }, [posterdetails])

    const sumOfTotalSold = useMemo(() => {
        return posterdetails.reduce((acc: any, option: any) => {
            return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp)
        }, 0)
    }, [posterdetails])

    const sumOfGross = useMemo(() => {
        return posterdetails.reduce((acc: any, option: any) => {
            return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp) * option.Cost
        }, 0)
    }, [posterdetails])


    return (
        <div className="w-full ml-5">
            <div>
                <table className="w-full">
                    <thead className="w-full">
                        <tr className="*:px-2 align-bottom">
                            <th>Size</th>
                            <th>Price</th>
                            <th>QTY Avail</th>
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
                        {posterdetails.map((option: any) => {
                            return (
                                <PosterInventoryRow option={option} key={option.id} isLocked={props.isLocked} updatePoster={updatePoster} />
                            )
                        })}
                        <tr className="*:p-2 text-center">
                            <td colSpan={3} className="">
                            </td>
                            <td colSpan={2}>
                                <button className="bg-gray-200 text-gray-600 p-2 rounded-md hover:bg-[#00c7fb] hover:text-white w-full">More</button>
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