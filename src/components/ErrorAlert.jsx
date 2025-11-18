// src/components/ErrorAlert.jsx

import { AlertCircle } from "lucide-react";

export default function ErrorAlert({ message }) {
    return (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200">{message}</p>
        </div>
    );
}
