'use client';

import { useFilterStore } from '@/store/filterStore';
import { Briefcase, Wifi, Volume2, Monitor } from 'lucide-react';

export default function WorkTravelScore() {
    const { workTravelScore, setWorkTravelScore } = useFilterStore();

    return (
        <div className="py-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                        <Briefcase size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            Work-from-Travel
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Productivity-focused stays
                        </p>
                    </div>
                </div>
                {workTravelScore > 0 && (
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                        <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                            {workTravelScore}+
                        </span>
                    </div>
                )}
            </div>

            <div className="mb-8 px-2">
                <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={workTravelScore}
                    onChange={(e) => setWorkTravelScore(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600 hover:accent-blue-500 transition-all"
                    style={{
                        background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${workTravelScore * 10}%, #E5E7EB ${workTravelScore * 10}%, #E5E7EB 100%)`
                    }}
                />

                <div className="flex justify-between mt-3 text-xs font-medium text-gray-400">
                    <span>Any</span>
                    <span>5.0</span>
                    <span>10.0</span>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Score Factors
                </h4>
                <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center gap-1.5 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <Wifi size={16} className="text-blue-500" />
                        <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Fast WiFi</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <Volume2 size={16} className="text-blue-500" />
                        <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Quiet</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <Monitor size={16} className="text-blue-500" />
                        <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Workspace</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
