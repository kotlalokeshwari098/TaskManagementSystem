import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function AnalyticsChart({ analytics }) {

    const data = [
        {
            name: "Completed",
            tasks: analytics.completedTasks
        },
        {
            name: "Pending",
            tasks: analytics.pendingTasks
        }
    ];

    return (
        <div className="h-72 w-full">

            <ResponsiveContainer width="100%" height="100%">

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                        dataKey="tasks"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default AnalyticsChart;