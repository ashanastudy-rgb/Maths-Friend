'use client';
import { useState } from 'react';

export default function LearnTables() {
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

    // Generate numbers 1 to 100
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

    // Colors for alternating table rows to make reading easier for kids
    const rowColors = [
        'bg-red-50', 'bg-orange-50', 'bg-yellow-50', 'bg-green-50', 'bg-teal-50',
        'bg-blue-50', 'bg-indigo-50', 'bg-purple-50', 'bg-fuchsia-50', 'bg-pink-50'
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Number Grid Selection */}
            <div className="flex-1 w-full mx-auto md:max-w-md">
                <h2 className="text-2xl font-bold text-center text-indigo-900 mb-6">
                    कोणत्या अंकाचा पाढा शिकायचा आहे? (Grid)
                </h2>
                <div className="grid grid-cols-10 gap-1 sm:gap-2">
                    {numbers.map((num) => (
                        <button
                            key={num}
                            onClick={() => setSelectedNumber(num)}
                            className={`aspect-square flex items-center justify-center font-bold rounded-lg transition-all text-sm sm:text-base
                ${selectedNumber === num
                                    ? 'bg-indigo-600 text-white scale-110 shadow-lg ring-2 ring-indigo-300'
                                    : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-200 hover:scale-105'}`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Display */}
            <div className="flex-1 w-full mx-auto">
                {selectedNumber ? (
                    <div className="bg-white border-2 border-indigo-100 rounded-2xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h2 className="text-3xl font-extrabold text-center bg-indigo-600 text-white py-4 m-0 shadow-sm">
                            {selectedNumber} चा पाढा
                        </h2>
                        <div className="flex flex-col">
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((multiplier) => {
                                const colorClass = rowColors[multiplier - 1];
                                return (
                                    <div
                                        key={multiplier}
                                        className={`flex items-center justify-center py-3 px-4 text-2xl font-bold text-slate-800 ${colorClass} hover:brightness-95 transition-all`}
                                    >
                                        <span className="w-16 text-right text-indigo-900">{selectedNumber}</span>
                                        <span className="w-12 text-center text-pink-500">×</span>
                                        <span className="w-16 text-left">{multiplier}</span>
                                        <span className="w-12 text-center text-emerald-500">=</span>
                                        <span className="w-20 text-center text-3xl text-indigo-700">{selectedNumber * multiplier}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center min-h-[400px] border-4 border-dashed border-indigo-100 rounded-2xl text-slate-400 p-8 text-center bg-indigo-50/50">
                        <div className="text-6xl mb-4">👈</div>
                        <p className="text-2xl font-medium">पाढा पाहण्यासाठी एखादा अंक निवडा</p>
                    </div>
                )}
            </div>
        </div>
    );
}
