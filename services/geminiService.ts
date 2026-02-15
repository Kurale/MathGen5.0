import { GoogleGenAI, Type } from "@google/genai";
import { Operation, Topic, WordProblemResult } from "../types";

const createClient = () => {
    // Only initialize if key is present. Logic handled in component to show UI feedback.
    if (!process.env.API_KEY) {
        throw new Error("API Key missing");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateWordProblem = async (topic: Topic, operation: Operation): Promise<WordProblemResult> => {
    try {
        const ai = createClient();
        
        const topicStr = topic === Topic.FRACTIONS ? "Обыкновенные дроби" : "Смешанные числа";
        let opStr = "Смешанные действия";
        if (operation === Operation.ADD) opStr = "Сложение";
        if (operation === Operation.SUBTRACT) opStr = "Вычитание";
        if (operation === Operation.MULTIPLY) opStr = "Умножение";
        if (operation === Operation.DIVIDE) opStr = "Деление";

        const prompt = `
            Составь интересную математическую текстовую задачу для учеников 5 класса.
            Тема: ${topicStr}.
            Действие: ${opStr}.
            Задача должна быть жизненной (еда, строительство, хобби, школа).
            Числа должны быть адекватными для счета в уме или на бумаге (без огромных знаменателей).
            
            Верни ответ строго в формате JSON:
            {
                "question": "Текст задачи...",
                "answer": "Полное решение и ответ..."
            }
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        answer: { type: Type.STRING }
                    },
                    required: ['question', 'answer']
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");
        
        return JSON.parse(text) as WordProblemResult;

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};
