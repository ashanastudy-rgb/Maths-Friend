'use client';
import { useState, useEffect, useRef } from 'react';

export default function MathGame() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operator, setOperator] = useState('+');
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Generate a new problem
    const generateProblem = () => {
        const isAddition = Math.random() > 0.5;
        let n1 = Math.floor(Math.random() * 90) + 10; // 10 to 99
        let n2 = Math.floor(Math.random() * 90) + 10; // 10 to 99

        if (!isAddition) {
            // For subtraction, ensure n1 > n2 so we don't get negative answers for kids
            if (n1 < n2) {
                const temp = n1;
                n1 = n2;
                n2 = temp;
            }
        }

        setNum1(n1);
        setNum2(n2);
        setOperator(isAddition ? '+' : '-');
        setUserAnswer('');
        setFeedback(null);
        setIsCorrect(null);

        // Focus input beautifully after a short delay
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    };

    // Initial load
    useEffect(() => {
        generateProblem();
    }, []);

    const checkAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userAnswer) return;

        const correctAns = operator === '+' ? num1 + num2 : num1 - num2;
        const isAnswerCorrect = parseInt(userAnswer) === correctAns;

        setIsCorrect(isAnswerCorrect);
        if (isAnswerCorrect) {
            setFeedback('शाब्बास! 😊 अगदी बरोबर!');
        } else {
            setFeedback('अरेरे! पुन्हा प्रयत्न करा 🤔');
        }
    };

    return (
        <div className="max-w-md mx-auto py-8">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
                चला गणिताचा खेळ खेळूया!
            </h2>

            <div className="bg-pink-50 p-8 rounded-3xl border-4 border-pink-200 shadow-xl relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute -right-8 -top-8 text-8xl opacity-10 rotate-12 pointer-events-none">🔢</div>
                <div className="absolute -left-8 -bottom-8 text-8xl opacity-10 -rotate-12 pointer-events-none">✨</div>

                <form onSubmit={checkAnswer} className="relative z-10 flex flex-col items-center">

                    <div className="flex items-center justify-center gap-4 text-5xl font-extrabold text-slate-800 mb-8">
                        <span className="bg-white px-6 py-4 rounded-2xl shadow-sm border-2 border-slate-100 min-w-[100px] text-center">{num1}</span>
                        <span className="text-pink-500 font-black">{operator}</span>
                        <span className="bg-white px-6 py-4 rounded-2xl shadow-sm border-2 border-slate-100 min-w-[100px] text-center">{num2}</span>
                        <span className="text-slate-400">=</span>
                    </div>

                    <input
                        ref={inputRef}
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="input-large shadow-inner bg-white mb-8 border-pink-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                        placeholder="?"
                        min="0"
                    />

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all text-xl"
                        >
                            तपासा ✔️
                        </button>
                        <button
                            type="button"
                            onClick={generateProblem}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all text-xl"
                        >
                            पुढचा प्रश्न ⏭️
                        </button>
                    </div>
                </form>
            </div>

            {feedback && (
                <div className={`mt-8 p-6 rounded-2xl text-center text-2xl font-bold shadow-md animate-in zoom-in duration-300 ${isCorrect
                        ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                        : 'bg-red-100 text-red-800 border-2 border-red-300'
                    }`}>
                    {feedback}
                </div>
            )}
        </div>
    );
}
