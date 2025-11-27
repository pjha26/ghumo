'use client';

import { useFilterStore } from '@/store/filterStore';
import { Heart, Users, Mountain, Sparkles } from 'lucide-react';

export default function TravelModeSelector() {
    const { travelMode, setTravelMode } = useFilterStore();

    const modes = [
        {
            id: 'none',
            label: 'Standard',
            icon: Sparkles,
            color: 'text-gray-500',
            bg: 'bg-white dark:bg-gray-800',
            border: 'border-gray-200 dark:border-gray-700',
            activeBorder: 'border-gray-900 dark:border-white',
            activeBg: 'bg-gray-50 dark:bg-gray-800'
        },
        {
            id: 'romantic',
            label: 'Romantic',
            icon: Heart,
            color: 'text-pink-500',
            bg: 'bg-white dark:bg-gray-800',
            border: 'border-pink-100 dark:border-pink-900/30',
            activeBorder: 'border-pink-500',
            activeBg: 'bg-pink-50 dark:bg-pink-900/20'
        },
        {
            id: 'family',
            label: 'Family',
            icon: Users,
            color: 'text-blue-500',
            bg: 'bg-white dark:bg-gray-800',
            border: 'border-blue-100 dark:border-blue-900/30',
            activeBorder: 'border-blue-500',
            activeBg: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            id: 'adventure',
            label: 'Adventure',
            icon: Mountain,
            color: 'text-green-500',
            bg: 'bg-white dark:bg-gray-800',
            border: 'border-green-100 dark:border-green-900/30',
            activeBorder: 'border-green-500',
            activeBg: 'bg-green-50 dark:bg-green-900/20'
        }
    ];

    return (
        <div className="py-6 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6">
                Travel Mode
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
                {modes.map((mode) => {
                    const Icon = mode.icon;
                    const isSelected = travelMode === mode.id;

                    return (
                        <button
                            key={mode.id}
                            onClick={() => setTravelMode(mode.id)}
                            className={`
                                relative flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-200
                                ${isSelected
                                    ? `${mode.activeBg} ${mode.activeBorder} shadow-sm`
                                    : `${mode.bg} ${mode.border} hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm`
                                }
                            `}
                        >
                            <div className={`mb-3 p-2 rounded-lg ${isSelected ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}`}>
                                <Icon
                                    size={20}
                                    className={isSelected ? mode.color : 'text-gray-400'}
                                />
                            </div>
                            <span className={`text-sm font-semibold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                                {mode.label}
                            </span>
                            {isSelected && (
                                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-current text-blue-500" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${travelMode !== 'none' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/50">
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                        {travelMode === 'romantic' && "✨ Curating stays with privacy, scenic views, hot tubs, and luxury amenities for couples."}
                        {travelMode === 'family' && "👨‍👩‍👧‍👦 Highlighting safe homes with multiple bedrooms, kitchens, and kid-friendly features."}
                        {travelMode === 'adventure' && "🏔️ Finding spots near nature, hiking trails, and outdoor activities for thrill-seekers."}
                    </p>
                </div>
            </div>
        </div>
    );
}
