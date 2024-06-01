'use client'
import { ItemContext } from '@/context/ItemProvider';
import { ResponsivePie } from '@nivo/pie'
import { useContext, useMemo } from 'react';


export default function InventorySummary(props: any) {

    const { posters, setPosters } = useContext(ItemContext);

    /**
 * Calculates the total number of units sold based on the given posters array.
 *
 * @param posters - An array of posters.
 * @returns The total number of units sold.
 */
    const unitsSold = useMemo(() => {
        return posters?.reduce((acc: any, option: any) => {
            return acc + option.options.reduce((acc: any, option: any) => {
                return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp)
            }, 0);
        }, 0);
    }, [posters]);

    /**
     * Calculates the total gross value based on the given posters array.
     * The total gross value is calculated by summing the product of each poster's
     * (CountIn + Add - CountOut - Comp) and its corresponding Cost.
     *
     * @param posters - An array of posters.
     * @returns The total gross value.
     */
    const totalGross = useMemo(() => {
        return posters?.reduce((acc: any, option: any) => {
            return acc + option.options.reduce((acc: any, option: any) => {
                return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp) * option.Cost
            }, 0);
        }, 0);
    }, [posters]);


    /**
     * Calculates the total count out based on the provided posters.
     *
     * @param posters - An array of posters.
     * @returns The total count out.
     */
    const totalCountOut = useMemo(() => {
        return posters?.reduce((acc: any, option: any) => {
            return acc + option.options.reduce((acc: any, option: any) => {
                return acc + option.CountOut
            }, 0);
        }, 0);
    }, [posters]);


    // Create data for the pie chart
    const data = [
        {
            "id": "UnitsSold",
            "label": "Units Sold",
            "value": unitsSold,
            "color": '#00c7fb'
        },
        {
            "id": "UnitsRemaining",
            "label": "Units Remaining",
            "value": totalCountOut,
            "color": '#aaa'
        }
    ]

    /**
     * Renders a centered metric component for the pie chart with Total Sold.
     * @param dataWithArc - The data with arc.
     * @param centerX - The x-coordinate of the center.
     * @param centerY - The y-coordinate of the center.
     * @returns The rendered centered metric component.
     */
    const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
        return (
            <>
                <text
                    x={centerX}
                    y={centerY - 10} // Adjust this value to position the total number slightly higher
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                    }}
                >
                    {dataWithArc[0].data.value}
                </text>
                <text
                    x={centerX}
                    y={centerY + 10} // Adjust this value to position the label "Units Sold" below the total number
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        fontSize: '1rem', // You can adjust the font size if needed
                        fontWeight: 500,
                    }}
                >
                    Units Sold
                </text>
            </>
        );
    };


    return (
        <div className='mt-2 px-3'>
            <p className='text-4xl font-bold text-center p-2 w-80 ml-auto text-gray-500'>Total</p>
            <div className='mx-auto flex justify-end gap-3'>
                <div className='h-40 w-40'>
                    <ResponsivePie
                        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                        data={data}
                        innerRadius={0.8}
                        padAngle={0.9}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        colors={['#00c7fb', '#aaa']}
                        layers={['arcs', 'legends', CenteredMetric]}
                        tooltip={() => null}
                    />
                </div>
                <div className='h-40 w-40 flex flex-col justify-between py-5'>
                    <p className='text-center font-bold text-xl text-[#00c7fb]'>${totalGross.toFixed(2)}</p>
                    <button onClick={props.handleLock} className='bg-gray-200 text-gray-600 p-2 rounded-md w-40 mt-5 hover:bg-[#00c7fb] hover:text-white disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white' disabled={props.isLocked}>Settle</button>
                </div>
            </div>
        </div>
    )
}