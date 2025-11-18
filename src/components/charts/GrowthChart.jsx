// src/components/charts/GrowthChart.jsx

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

export default function GrowthChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#e9d5ff" />
                <YAxis stroke="#e9d5ff" />
                <Tooltip contentStyle={{ background: "#1e1b4b", border: "1px solid #8b5cf6" }} />
                <Legend />
                <Line type="monotone" dataKey="seguidores" stroke="#8b5cf6" strokeWidth={3} />
                <Line type="monotone" dataKey="engagement" stroke="#ec4899" strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    );
}
