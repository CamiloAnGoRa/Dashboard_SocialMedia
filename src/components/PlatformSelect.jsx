// src/components/PlatformSelect.jsx

export default function PlatformSelect({ value, onChange }) {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/20 text-black border border-white/30 focus:ring-2 focus:ring-purple-500"
        >
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter/X</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="facebook">Facebook</option>
        </select>
    );
}
