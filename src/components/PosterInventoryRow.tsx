import { useMemo, useState } from "react";

export default function PosterInventoryRow(props: any) {

    const TotalLn = useMemo(() => {
        return props.option.CountIn + props.option.Add
    }, [props.option.CountIn, props.option.Add])

    const QTYAvail = useMemo(() => {
        return props.option.CountOut - TotalLn
    }, [TotalLn, props.option.CountOut])

    const TotalSold = useMemo(() => {
        return (TotalLn - props.option.CountOut) - props.option.Comp
    }, [TotalLn, props.option.CountOut, props.option.Comp])

    const Gross = useMemo(() => {
        return TotalSold * props.option.Cost
    }, [TotalSold, props.option.Cost])

    return (
        <tr key={props.option.id} className="text-center h-12">
            <td>
                {props.option.dimensions}
            </td>
            <td>
                {props.option.Cost}
            </td>
            <td>
                {QTYAvail}
            </td>
            <td className="border">
                <input type="text" name="CountIn" defaultValue={props.option.CountIn} size={1} className="w-full text-center h-12" onBlur={props.updatePoster} disabled={props.isLocked} id={props.option.id} />
            </td>
            <td className="text-green-500 border">
                <input type="text" name="Add" defaultValue={props.option.Add} size={1} className="w-full text-center h-12" onBlur={props.updatePoster} disabled={props.isLocked} id={props.option.id} />
            </td>
            <td className="text-[#00c7fb] border">
                {TotalLn}
            </td>
            <td className="text-red-500 border">
                <input type="text" name="Comp" defaultValue={props.option.Comp} size={1} className="w-full text-center h-12" onBlur={props.updatePoster} disabled={props.isLocked} id={props.option.id} />
            </td>
            <td className="border">
                <input type="text" name="CountOut" defaultValue={props.option.CountOut} size={1} className="w-full text-center h-12" onBlur={props.updatePoster} disabled={props.isLocked} id={props.option.id} />
            </td>
            <td className="text-[#00c7fb] border">
                {TotalSold}
            </td>
            <td className="text-[#00c7fb] border">
                {Gross.toFixed(2)}
            </td>
        </tr>
    )
}