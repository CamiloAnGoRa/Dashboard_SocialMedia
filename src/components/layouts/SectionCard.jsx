// src/components/layouts/SectionCard.jsx

export default function SectionCard({ title, children }) {
    return (
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            {title && <h3 className="text-xl font-bold text-white mb-4">{title}</h3>}
            {children}
        </div>
    );
}
