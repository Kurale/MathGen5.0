import React, { useState } from 'react';
import { generateWordProblem } from '../services/geminiService';
import { Operation, Topic, WordProblemResult } from '../types';

interface GeminiWordProblemProps {
    topic: Topic;
    operation: Operation;
}

export const GeminiWordProblem: React.FC<GeminiWordProblemProps> = ({ topic, operation }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<WordProblemResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        setShowAnswer(false);
        try {
            const data = await generateWordProblem(topic, operation);
            setResult(data);
        } catch (e) {
            setError("Не удалось сгенерировать задачу. Проверьте API Key или попробуйте позже.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border border-blue-100 rounded-xl shadow-sm no-print">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Бонус от AI: Текстовая задача
                </h3>
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Думаю...
                        </>
                    ) : (
                        'Сгенерировать новую'
                    )}
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm mb-4">
                    {error}
                </div>
            )}

            {result && (
                <div className="space-y-4 animate-fadeIn">
                    <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                        <p className="text-gray-800 text-lg font-medium font-serif leading-relaxed">
                            {result.question}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={() => setShowAnswer(!showAnswer)}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium underline decoration-dashed underline-offset-4"
                        >
                            {showAnswer ? "Скрыть решение" : "Показать решение"}
                        </button>
                    </div>

                    {showAnswer && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-green-900 text-sm whitespace-pre-wrap">
                            {result.answer}
                        </div>
                    )}
                </div>
            )}
            
            {!result && !loading && !error && (
                <p className="text-gray-500 text-sm italic">
                    Нажмите кнопку, чтобы нейросеть придумала уникальную задачу по выбранной теме.
                </p>
            )}
        </div>
    );
};
