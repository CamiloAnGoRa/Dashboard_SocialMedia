// src/components/KPICard.jsx

export default function KPICard({ icon, trendIcon, value, label }) {
    return (
        <div className="bg-white/10 rounded-xl p-5 border border-white/20">
            <div className="flex items-center justify-between mb-3">
                {icon}
                {trendIcon}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-purple-200">{label}</div>
        </div>
    );
}
