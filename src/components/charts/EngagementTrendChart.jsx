// src/components/charts/EngagementTrendChart.jsx

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function EngagementTrendChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="day" stroke="#e9d5ff" />
                <YAxis stroke="#e9d5ff" />
                <Tooltip contentStyle={{ background: "#1e1b4b", border: "1px solid #8b5cf6" }} />
                <Legend />
                <Bar dataKey="likes" fill="#8b5cf6" />
                <Bar dataKey="comentarios" fill="#ec4899" />
                <Bar dataKey="compartidos" fill="#10b981" />
            </BarChart>
        </ResponsiveContainer>
    );
}
