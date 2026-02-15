import { FractionPart, MathProblem, Operation, Topic } from '../types';

// Helper: Greatest Common Divisor
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

// Helper: Least Common Multiple (not strictly needed for generation but good for solutions)
const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

// Helper: Simplify a fraction
const simplify = (f: FractionPart): FractionPart => {
  const common = gcd(f.numerator, f.denominator);
  let num = f.numerator / common;
  let den = f.denominator / common;
  let whole = f.whole || 0;

  if (num >= den) {
    whole += Math.floor(num / den);
    num = num % den;
  }
  
  // If num becomes 0, technically it's just the whole number, but we keep denominator structure for consistency in rendering if needed,
  // or return 0/1. For this specific type, we usually keep it clean.
  return { whole, numerator: num, denominator: den };
};

const FRIENDLY_DENOMINATORS = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 25, 50, 100];

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDenominator = () => {
  return FRIENDLY_DENOMINATORS[Math.floor(Math.random() * FRIENDLY_DENOMINATORS.length)];
};

export const generateProblem = (topic: Topic, operation: Operation, difficulty: string): MathProblem => {
  const isMixed = topic === Topic.MIXED;
  
  // Determine actual operator if MIXED_OPS is selected
  let currentOp = operation;
  if (operation === Operation.MIXED) {
    const ops = [Operation.ADD, Operation.SUBTRACT, Operation.MULTIPLY, Operation.DIVIDE];
    currentOp = ops[Math.floor(Math.random() * ops.length)];
  }

  let opSymbol: '+' | '−' | '×' | ':' = '+';
  switch (currentOp) {
    case Operation.ADD: opSymbol = '+'; break;
    case Operation.SUBTRACT: opSymbol = '−'; break;
    case Operation.MULTIPLY: opSymbol = '×'; break;
    case Operation.DIVIDE: opSymbol = ':'; break;
  }

  // Generate Operands
  // Ensure denominators are compatible or friendly
  let d1 = getRandomDenominator();
  let d2 = getRandomDenominator();

  // For easy mode, make denominators same for add/sub
  if (difficulty === 'easy' && (currentOp === Operation.ADD || currentOp === Operation.SUBTRACT)) {
    d2 = d1;
  }

  let n1 = getRandomInt(1, d1 - 1);
  let n2 = getRandomInt(1, d2 - 1);
  
  let w1 = isMixed ? getRandomInt(1, 5) : 0;
  let w2 = isMixed ? getRandomInt(1, 5) : 0;

  // Logic to prevent negative results in subtraction
  if (currentOp === Operation.SUBTRACT) {
    // Calculate effective values
    const val1 = w1 + n1 / d1;
    const val2 = w2 + n2 / d2;
    
    if (val2 > val1) {
      // Swap them
      [n1, n2] = [n2, n1];
      [d1, d2] = [d2, d1];
      [w1, w2] = [w2, w1];
    }
    
    // Edge case: if they are equal, regenerate numerator 1 to be larger
    if (Math.abs(val1 - val2) < 0.0001) {
      w1 += 1; 
    }
  }
  
  // Logic for Division: Ensure no division by zero (already handled by n range 1..d-1)
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    operand1: { whole: w1 || undefined, numerator: n1, denominator: d1 },
    operand2: { whole: w2 || undefined, numerator: n2, denominator: d2 },
    operator: opSymbol
  };
};

export const generateBatch = (count: number, topic: Topic, operation: Operation, difficulty: string): MathProblem[] => {
  const problems: MathProblem[] = [];
  for (let i = 0; i < count; i++) {
    problems.push(generateProblem(topic, operation, difficulty));
  }
  return problems;
};
