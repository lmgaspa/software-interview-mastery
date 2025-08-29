export type Topic = 'java' | 'spring';
export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface Question {
  id: string;               // ex.: "java-b-001"
  topic: Topic;             // 'java' | 'spring'
  difficulty: Difficulty;   // 'basic' | 'intermediate' | 'advanced'
  prompt: string;           // enunciado (em inglês)
  options: string[];        // múltipla escolha
  answerIndex: number;      // índice da resposta correta
  explanation?: string;     // explicação breve
}
