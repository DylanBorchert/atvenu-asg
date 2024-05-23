import { ResponsivePie } from "@nivo/pie";

export default function TotalSoldChart(props: any) {

    // Create data for the pie chart
    const data = [
        {
            "id": "TotalSold",
            "label": "TotalSold",
            "value": props.TotalSold,
            "color": '#00c7fb'
        },
        {
            "id": "CountOut",
            "label": "CountOut",
            "value": props.CountOut,
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
                    y={centerY} // Adjust this value to position the total number slightly higher
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                        fontSize: '1rem',
                    }}
                >
                    {dataWithArc[0].data.value}
                </text>
            </>
        );
    };

    return (
        <td className='h-20 w-20'>
            <ResponsivePie
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                data={data}
                innerRadius={0.85}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={['#00c7fb', '#aaa']}
                layers={['arcs', 'legends', CenteredMetric]}
                tooltip={() => null}
            />
        </td>

    )
}