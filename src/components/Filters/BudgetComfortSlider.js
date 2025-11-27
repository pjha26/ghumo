'use client';

import { useFilterStore } from '@/store/filterStore';
import { Wallet, Armchair } from 'lucide-react';

export default function BudgetComfortSlider() {
    const { budgetComfortWeight, setBudgetComfortWeight } = useFilterStore();

    return (
        <div className="py-6 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6">
                Preference Balance
            </h3>

            <div className="relative px-2 mb-8">
                {/* Custom Track Background */}
                <div className="absolute top-1/2 left-0 w-full h-2 -mt-1 rounded-full bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 dark:from-green-900/30 dark:via-blue-900/30 dark:to-purple-900/30 pointer-events-none" />

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={budgetComfortWeight}
                    onChange={(e) => setBudgetComfortWeight(Number(e.target.value))}
                    className="relative w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer z-10 focus:outline-none"
                    style={{
                        WebkitAppearance: 'none',
                    }}
                />

                {/* Custom Thumb Styles would require more CSS, so sticking to standard range input with accent color for now, but enhanced wrapper */}
                <style jsx>{`
                    input[type=range]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: #3B82F6;
                        cursor: pointer;
                        margin-top: -9px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
                        box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
                        border: 2px solid white;
                    }
                `}</style>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setBudgetComfortWeight(0)}
                        className={`flex flex-col items-center gap-2 transition-all duration-300 ${budgetComfortWeight < 0.4 ? 'scale-110 opacity-100' : 'scale-100 opacity-50 hover:opacity-80'}`}
                    >
                        <div className={`p-2 rounded-full ${budgetComfortWeight < 0.4 ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'}`}>
                            <Wallet size={20} />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Budget</span>
                    </button>

                    <button
                        onClick={() => setBudgetComfortWeight(0.5)}
                        className={`flex flex-col items-center gap-2 transition-all duration-300 ${budgetComfortWeight === 0.5 ? 'scale-110 opacity-100' : 'scale-100 opacity-50 hover:opacity-80'}`}
                    >
                        <div className={`w-2 h-2 rounded-full mb-7 ${budgetComfortWeight === 0.5 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                    </button>

                    <button
                        onClick={() => setBudgetComfortWeight(1)}
                        className={`flex flex-col items-center gap-2 transition-all duration-300 ${budgetComfortWeight > 0.6 ? 'scale-110 opacity-100' : 'scale-100 opacity-50 hover:opacity-80'}`}
                    >
                        <div className={`p-2 rounded-full ${budgetComfortWeight > 0.6 ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'}`}>
                            <Armchair size={20} />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Comfort</span>
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-center border border-gray-100 dark:border-gray-700/50">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {budgetComfortWeight > 0.7 ? 'Showing premium stays with top amenities ✨' :
                        budgetComfortWeight < 0.3 ? 'Showing best value deals & discounts 🏷️' :
                            'Balanced mix of value and quality ⚖️'}
                </p>
            </div>
        </div>
    );
}
