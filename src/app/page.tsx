'use client';
import { useState } from 'react';
import LearnTables from '@/components/LearnTables';
import MathGame from '@/components/MathGame';
import Quiz from '@/components/Quiz';

export default function Home() {
    const [activeTab, setActiveTab] = useState<'learn' | 'game' | 'quiz'>('learn');

    return (
        <div className="w-full">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                <button
                    onClick={() => setActiveTab('learn')}
                    className={`px-6 py-3 rounded-full text-lg font-bold shadow-sm transition-all
            ${activeTab === 'learn'
                            ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                            : 'bg-white text-indigo-900 border-2 border-indigo-100 hover:bg-indigo-50'}`}
                >
                    📖 पाढे शिका
                </button>
                <button
                    onClick={() => setActiveTab('game')}
                    className={`px-6 py-3 rounded-full text-lg font-bold shadow-sm transition-all
            ${activeTab === 'game'
                            ? 'bg-pink-500 text-white shadow-md transform scale-105'
                            : 'bg-white text-pink-900 border-2 border-pink-100 hover:bg-pink-50'}`}
                >
                    🎮 बेरीज-वजाबाकी खेळ
                </button>
                <button
                    onClick={() => setActiveTab('quiz')}
                    className={`px-6 py-3 rounded-full text-lg font-bold shadow-sm transition-all
            ${activeTab === 'quiz'
                            ? 'bg-emerald-500 text-white shadow-md transform scale-105'
                            : 'bg-white text-emerald-900 border-2 border-emerald-100 hover:bg-emerald-50'}`}
                >
                    🏆 पाढे क्विझ
                </button>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 border-4 border-slate-100 min-h-[500px]">
                {activeTab === 'learn' && <LearnTables />}
                {activeTab === 'game' && <MathGame />}
                {activeTab === 'quiz' && <Quiz />}
            </div>
        </div>
    );
}
