// src/pages/SocialMediaDashboard.jsx

import { BarChart3, TrendingUp, Users, Heart, MessageCircle, Eye, Share2, Clock } from "lucide-react";

import useSocialAnalysis from "../hooks/useSocialAnalysis";

import DashboardContainer from "../components/layouts/DashboardContainer";
import SectionCard from "../components/layouts/SectionCard";

import SearchBar from "../components/SearchBar";
import PlatformSelect from "../components/PlatformSelect";
import LoadingButton from "../components/LoadingButton";
import ErrorAlert from "../components/ErrorAlert";
import KPICard from "../components/KPICard";
import InsightsList from "../components/InsightsList";

import GrowthChart from "../components/charts/GrowthChart";
import ContentDistributionChart from "../components/charts/ContentDistributionChart";
import EngagementTrendChart from "../components/charts/EngagementTrendChart";

export default function SocialMediaDashboard() {
    const {
        profile, setProfile,
        platform, setPlatform,
        loading, error,
        analysisData,
        analyzeProfile
    } = useSocialAnalysis();

    return (
        <DashboardContainer>

            {/* HEADER */}
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-white flex justify-center items-center gap-3">
                    <BarChart3 className="w-12 h-12 text-purple-400" />
                    Analisis de Redes Sociales
                </h1>
                <p className="text-purple-200 text-lg">Analisis rendimiento social</p>
            </div>

            {/* SEARCH */}
            <SectionCard>
                <div className="flex flex-col md:flex-row gap-4">
                    <PlatformSelect value={platform} onChange={setPlatform} />
                    <SearchBar value={profile} onChange={setProfile} onEnter={analyzeProfile} />
                    <LoadingButton loading={loading} onClick={analyzeProfile}>Analizar</LoadingButton>
                </div>

                {error && <ErrorAlert message={error} />}
            </SectionCard>

            {/* CONTENT */}
            {analysisData && (
                <>
                    {/* PROFILE HEADER */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-bold">{analysisData.profileName}</h2>
                                <p className="text-purple-100 capitalize">{analysisData.platform}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-5xl font-bold">{analysisData.performanceScore}</div>
                                <div className="text-purple-200">Score de Rendimiento</div>
                            </div>
                        </div>
                    </div>

                    {/* KPI GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        <KPICard icon={<Users className="w-8 h-8 text-blue-400" />} trendIcon={<TrendingUp className="w-5 text-green-400" />} label="Seguidores" value={`${(analysisData.followers / 1000).toFixed(1)}K`} />

                        <KPICard icon={<Heart className="w-8 h-8 text-pink-400" />} trendIcon={<TrendingUp className="w-5 text-green-400" />} label="Engagement" value={`${analysisData.engagement}%`} />

                        <KPICard icon={<MessageCircle className="w-8 h-8 text-green-400" />} trendIcon={<Clock className="w-5 text-yellow-400" />} label="Posts/Semana" value={analysisData.postsPerWeek} />

                        <KPICard icon={<Eye className="w-8 h-8 text-purple-400" />} trendIcon={<Share2 className="w-5 text-blue-400" />} label="Alcance Estimado" value={`${(analysisData.estimatedReach / 1000).toFixed(0)}K`} />
                    </div>

                    {/* CHARTS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        <SectionCard title="Crecimiento Histórico">
                            <GrowthChart data={analysisData.historicalData} />
                        </SectionCard>

                        <SectionCard title="Distribución de Contenido">
                            <ContentDistributionChart data={analysisData.contentDistribution} />
                        </SectionCard>
                    </div>

                    <SectionCard title="Tendencia de Engagement Semanal" className="mt-6">
                        <EngagementTrendChart data={analysisData.engagementTrend} />
                    </SectionCard>
                </>
            )}

            {!analysisData && !loading && (
                <div className="text-center py-16">
                    <BarChart3 className="w-24 h-24 text-purple-400 opacity-50 mx-auto mb-4" />
                    <p className="text-purple-200 text-xl">Ingresa un perfil para comenzar</p>
                </div>
            )}

        </DashboardContainer>
    );
}
