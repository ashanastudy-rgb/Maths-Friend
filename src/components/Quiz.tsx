'use client';
import { useState, useEffect } from 'react';

type Question = {
    question: string;
    options: number[];
    answer: number;
};

export default function Quiz() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState<{ q: string, given: number, correct: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState('');

    // Fetch from the Python API
    const fetchQuiz = async () => {
        setIsLoading(true);
        try {
            // For local testing, we might need a full URL if running python separately, 
            // but on Vercel /api/quiz routes dynamically.
            const res = await fetch('/api/quiz');
            if (!res.ok) throw new Error('Failed to fetch API');
            const data = await res.json();
            setQuestions(data.questions);
        } catch {
            // Fallback if API is offline during local dev
            setError('क्विझ लोड होण्यात अडचण आली. (API Error)');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, []);

    const handleAnswer = (selected: number) => {
        const currentQ = questions[currentIndex];

        if (selected === currentQ.answer) {
            setScore(score + 1);
        } else {
            setWrongAnswers([...wrongAnswers, {
                q: currentQ.question,
                given: selected,
                correct: currentQ.answer
            }]);
        }

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsFinished(true);
        }
    };

    const restartQuiz = () => {
        setCurrentIndex(0);
        setScore(0);
        setWrongAnswers([]);
        setIsFinished(false);
        fetchQuiz();
    };

    if (isLoading) {
        return <div className="text-center py-20 text-2xl font-bold text-emerald-600 animate-pulse">क्विझ लोड होत आहे... ⏳</div>;
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500 font-bold">
                <p className="text-2xl mb-4">⚠️ {error}</p>
                <button onClick={fetchQuiz} className="btn btn-primary bg-emerald-500 hover:bg-emerald-600">पुन्हा प्रयत्न करा</button>
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="max-w-2xl mx-auto py-8 text-center bg-emerald-50 rounded-3xl p-8 border-4 border-emerald-100">
                <h2 className="text-4xl font-extrabold text-emerald-800 mb-6"> निकाल 🏆</h2>
                <div className="text-8xl mb-6">
                    {score === 10 ? '🌟' : score >= 7 ? '👏' : '👍'}
                </div>
                <p className="text-3xl font-bold mb-8 text-slate-700">
                    तुमचे गुण: <span className="text-emerald-600 text-5xl">{score}</span> / 10
                </p>

                {wrongAnswers.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 text-left border-2 border-red-100">
                        <h3 className="text-xl font-bold text-red-600 mb-4 pb-2 border-b-2 border-red-50">चुकलेली उत्तरे पाहूया:</h3>
                        <ul className="space-y-4">
                            {wrongAnswers.map((item, idx) => (
                                <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-3 rounded-lg">
                                    <span className="font-bold text-lg">{item.q}</span>
                                    <div className="flex gap-4 mt-2 sm:mt-0">
                                        <span className="text-red-500 line-through">तुमचे उत्तर: {item.given}</span>
                                        <span className="text-emerald-600 font-bold">✅ योग्य उत्तर: {item.correct}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    onClick={restartQuiz}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all text-xl"
                >
                    पुन्हा खेळा! 🔄
                </button>
            </div>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <div className="max-w-xl mx-auto py-8">
            <div className="flex justify-between items-center mb-6 px-4">
                <span className="text-lg font-bold text-slate-500">प्रश्न {currentIndex + 1} / 10</span>
                <span className="text-lg font-bold text-emerald-600">गुण: {score}</span>
            </div>

            <div className="bg-white rounded-3xl p-8 border-4 border-emerald-200 shadow-xl mb-8 relative">
                <h2 className="text-5xl sm:text-6xl font-black text-center text-slate-800 mb-10 py-6 bg-emerald-50 rounded-2xl border-2 border-emerald-100">
                    {currentQ.question}
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    {currentQ.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            className="bg-emerald-500 hover:bg-emerald-400 text-white text-3xl font-bold py-6 sm:py-8 rounded-2xl shadow-md transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
