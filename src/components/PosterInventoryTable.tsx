import { use, useEffect, useMemo, useState } from "react";
import PosterInventoryRow from "./PosterInventoryRow"
import TotalSoldChart from "./TotalSoldChart";
import Popup from "reactjs-popup";
import PosterMore from "./PosterMore";

export default function PosterInventoryForm(props: any) {

    const [posterOptions, setposterOptions] = useState<any>(props.posterOptions);


    /**
     * Updates the poster options based on the event target.
     * Then triggers the parent component to update the poster details.
     * @param {any} e - The event object.
     */
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

    /**
     * Calculates the sum of the total count in and add values for each poster option.
     * @param {Array} posterOptions - The array of poster options.
     * @returns {number} - The sum of the total count in and add values.
     */
    const sumOfTotalIn = useMemo(() => {
        return posterOptions.reduce((acc: any, option: any) => {
            return acc + option.CountIn + option.Add
        }, 0)
    }, [posterOptions])

    /**
     * Calculates the sum of the 'Comp' property for each option in the posterOptions array.
     * 
     * @param {Array} posterOptions - The array of poster options.
     * @returns The sum of the 'Comp' property values.
     */
    const sumOfComp = useMemo(() => {
        return posterOptions.reduce((acc: any, option: any) => {
            return acc + option.Comp
        }, 0)
    }, [posterOptions])

    /**
     * Calculates the sum of the "CountOut" property for each poster option.
     * 
     * @param {Array} posterOptions - The array of poster options.
     * @returns {number} - The sum of the "CountOut" property.
     */
    const sumOfCountOut = useMemo(() => {
        return posterOptions.reduce((acc: any, option: any) => {
            return acc + option.CountOut
        }, 0)
    }, [posterOptions])

    /**
     * Calculates the sum of the total sold posters.
     *
     * @param {Array} posterOptions - The array of poster options.
     * @returns The sum of the total sold posters.
     */
    const sumOfTotalSold = useMemo(() => {
        return posterOptions.reduce((acc: any, option: any) => {
            return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp)
        }, 0)
    }, [posterOptions])

    /**
     * Calculates the sum of the gross value based on the given poster options.
     * The gross value is calculated by subtracting the count out and compensation from the sum of count in and additional count,
     * and then multiplying it by the cost of each option.
     *
     * @param {Array} posterOptions - The array of poster options.
     * @returns The sum of the gross value.
     */
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