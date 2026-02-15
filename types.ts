export enum Topic {
  FRACTIONS = 'FRACTIONS', // Ordinary fractions
  MIXED = 'MIXED',         // Mixed numbers
}

export enum Operation {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
  MIXED = 'MIXED_OPS' // Randomly mixed operations
}

export interface FractionPart {
  whole?: number;
  numerator: number;
  denominator: number;
}

export interface MathProblem {
  id: string;
  operand1: FractionPart;
  operand2: FractionPart;
  operator: '+' | '−' | '×' | ':'; // Using visual symbols
  solution?: FractionPart; // Optional solution for answer key
}

export interface GeneratorSettings {
  topic: Topic;
  operation: Operation;
  count: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface WordProblemResult {
  question: string;
  answer: string;
}
