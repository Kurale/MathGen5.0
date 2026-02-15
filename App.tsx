import React, { useState, useEffect, useRef } from 'react';
import { Topic, Operation, MathProblem } from './types';
import { generateBatch } from './utils/math';
import { FractionDisplay } from './components/FractionDisplay';
import { GeminiWordProblem } from './components/GeminiWordProblem';

const App: React.FC = () => {
  // State
  const [topic, setTopic] = useState<Topic>(Topic.FRACTIONS);
  const [operation, setOperation] = useState<Operation>(Operation.MIXED);
  const [count, setCount] = useState<number>(12);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [showAnswerKey, setShowAnswerKey] = useState(false); // UI toggle only, logic not fully implemented for brevity of generation

  // Refs for printing
  const worksheetRef = useRef<HTMLDivElement>(null);

  // Initial Load
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = () => {
    const newProblems = generateBatch(count, topic, operation, difficulty);
    setProblems(newProblems);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      
      {/* Header / Toolbar - No Print */}
      <header className="bg-white border-b border-gray-200 shadow-sm z-10 no-print flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              MathGen <span className="text-blue-600">5.0</span>
            </h1>
            <p className="text-sm text-gray-500">Генератор рабочих листов для 5 класса</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button
              onClick={handleGenerate}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Обновить
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg className="mr-2 -ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Печать / PDF
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Controls - No Print */}
        <aside className="w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto no-print flex-shrink-0 z-0">
          <div className="p-6 space-y-8">
            
            {/* Topic Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Тема</label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input
                    type="radio"
                    name="topic"
                    value={Topic.FRACTIONS}
                    checked={topic === Topic.FRACTIONS}
                    onChange={() => setTopic(Topic.FRACTIONS)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-gray-900">Обыкновенные дроби</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input
                    type="radio"
                    name="topic"
                    value={Topic.MIXED}
                    checked={topic === Topic.MIXED}
                    onChange={() => setTopic(Topic.MIXED)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-gray-900">Смешанные числа</span>
                </label>
              </div>
            </div>

            {/* Operation Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Действие</label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as Operation)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
              >
                <option value={Operation.ADD}>Сложение (+)</option>
                <option value={Operation.SUBTRACT}>Вычитание (−)</option>
                <option value={Operation.MULTIPLY}>Умножение (×)</option>
                <option value={Operation.DIVIDE}>Деление (:)</option>
                <option value={Operation.MIXED}>Все действия</option>
              </select>
            </div>

            {/* Count & Difficulty */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Кол-во</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border py-2 px-3"
                />
               </div>
               <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Сложность</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border py-2 pl-2"
                >
                  <option value="easy">Легко</option>
                  <option value="medium">Норм.</option>
                  <option value="hard">Сложно</option>
                </select>
               </div>
            </div>
            
             <div className="pt-4 border-t border-gray-100">
               <p className="text-xs text-gray-400">
                 Совет: Настройте параметры и нажмите "Обновить". Используйте системный диалог печати (Ctrl+P) для сохранения в PDF или печати на бумагу.
               </p>
            </div>

          </div>
        </aside>

        {/* Main Content / Worksheet Preview */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8">
          <div className="max-w-[210mm] mx-auto bg-white shadow-lg min-h-[297mm] p-[15mm] md:p-[20mm] print:shadow-none print:w-full print:max-w-none print:p-0 print:m-0" ref={worksheetRef}>
            
            {/* Worksheet Header */}
            <div className="border-b-2 border-gray-800 pb-4 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 font-serif">Математика (5 класс)</h2>
                <p className="text-gray-600 mt-1 font-serif">
                   Тема: {topic === Topic.FRACTIONS ? 'Обыкновенные дроби' : 'Смешанные числа'}
                </p>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <span className="font-bold font-serif text-lg">Имя: _______________________</span>
                </div>
                <div className="text-sm text-gray-500 font-serif">
                   Дата: {new Date().toLocaleDateString('ru-RU')}
                </div>
              </div>
            </div>

            {/* Grid of Problems */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-16">
              {problems.map((prob, index) => (
                <div key={prob.id} className="print-break-inside-avoid flex items-center text-gray-900">
                  <span className="font-bold text-lg text-gray-500 mr-4 w-8">{index + 1}.</span>
                  
                  <div className="flex items-center text-2xl font-serif">
                    <FractionDisplay part={prob.operand1} />
                    
                    <span className="mx-4 font-medium">{prob.operator}</span>
                    
                    <FractionDisplay part={prob.operand2} />
                    
                    <span className="mx-4">=</span>
                    
                    {/* Placeholder for answer */}
                    <span className="w-24 border-b-2 border-gray-300 border-dashed transform translate-y-3"></span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Bonus Section */}
            <GeminiWordProblem topic={topic} operation={operation} />

          </div>
          
          <div className="h-16 no-print"></div> {/* Spacer */}
        </main>
      </div>
    </div>
  );
};

export default App;
