// src/components/LoadingButton.jsx

export default function LoadingButton({ loading, onClick, children }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 flex items-center gap-2 justify-center"
        >
            {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
                children
            )}
        </button>
    );
}
