// src/hooks/useSocialAnalysis.js

import { useState } from "react";
import { fetchSocialAnalysis } from "../services/socialApi";

export default function useSocialAnalysis() {
    const [profile, setProfile] = useState("");
    const [platform, setPlatform] = useState("instagram");
    const [loading, setLoading] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
    const [error, setError] = useState(null);

    const calculateScore = (d) => {
        const f = Math.min((d.followers / 100000) * 30, 30);
        const e = Math.min(d.engagement * 4, 40);
        const a = Math.min((d.postsPerWeek / 7) * 30, 30);
        return Math.round(f + e + a);
    };

    const generateHistorical = () => {
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
        return months.map((m, i) => ({
            month: m,
            seguidores: Math.round(50000 + i * 8000 + Math.random() * 5000),
            engagement: Math.round(3 + i * 0.3 + Math.random() * 1),
        }));
    };

    const generateDistribution = () => [
        { name: "Fotos", value: 40 },
        { name: "Videos", value: 35 },
        { name: "Stories", value: 15 },
        { name: "Reels", value: 10 },
    ];

    const generateEngagementTrend = () => {
        const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
        return days.map((d) => ({
            day: d,
            likes: Math.round(1000 + Math.random() * 2000),
            comentarios: Math.round(50 + Math.random() * 150),
            compartidos: Math.round(20 + Math.random() * 80),
        }));
    };

    const analyzeProfile = async () => {
        if (!profile.trim()) {
            setError("Ingresa un perfil válido");
            return;
        }

        setLoading(true);
        setError(null);
        setAnalysisData(null);

        try {
            const result = await fetchSocialAnalysis(profile, platform);

            setAnalysisData({
                ...result,
                performanceScore: calculateScore(result),
                historicalData: generateHistorical(),
                contentDistribution: generateDistribution(),
                engagementTrend: generateEngagementTrend(),
            });
        } catch (err) {
            console.error(err);
            setError("Error al analizar el perfil.");
        }

        setLoading(false);
    };

    return {
        profile,
        setProfile,
        platform,
        setPlatform,
        loading,
        error,
        analysisData,
        analyzeProfile,
    };
}
