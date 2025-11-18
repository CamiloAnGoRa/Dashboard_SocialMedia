// src/components/layouts/DashboardContainer.jsx

export default function DashboardContainer({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
        </div>
    );
}
