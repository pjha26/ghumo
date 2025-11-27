'use client';

import { useFilterStore } from '@/store/filterStore';
import { Dog, Trees, Home } from 'lucide-react';

export default function PetFriendlyFilter() {
    const { petFriendlyScore, setPetFriendlyScore } = useFilterStore();

    return (
        <div className="py-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
                        <Dog size={20} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            Pet-Friendly
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Perfect for your furry friends
                        </p>
                    </div>
                </div>
                {petFriendlyScore > 0 && (
                    <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                        <span className="text-sm font-bold text-orange-700 dark:text-orange-300">
                            {petFriendlyScore}+
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
                    value={petFriendlyScore}
                    onChange={(e) => setPetFriendlyScore(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-orange-600 hover:accent-orange-500 transition-all"
                    style={{
                        background: `linear-gradient(to right, #EA580C 0%, #EA580C ${petFriendlyScore * 10}%, #E5E7EB ${petFriendlyScore * 10}%, #E5E7EB 100%)`
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
                    Included Perks
                </h4>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="p-1 bg-orange-50 dark:bg-orange-900/30 rounded-md">
                            <Dog size={14} className="text-orange-500" />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Big dogs allowed</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="p-1 bg-green-50 dark:bg-green-900/30 rounded-md">
                            <Trees size={14} className="text-green-500" />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Nearby parks</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="p-1 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                            <Home size={14} className="text-blue-500" />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Fenced yard</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="p-1 bg-purple-50 dark:bg-purple-900/30 rounded-md">
                            <span className="text-xs">🦴</span>
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Pet amenities</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
