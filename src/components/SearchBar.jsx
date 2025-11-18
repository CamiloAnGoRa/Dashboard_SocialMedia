// src/components/SearchBar.jsx

import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, onEnter }) {
    return (
        <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 w-5 h-5" />
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyDown={e => e.key === "Enter" && onEnter()}
                placeholder="Ingresa un perfil..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-purple-300 border border-white/30 focus:ring-2 focus:ring-purple-500"
            />
        </div>
    );
}
