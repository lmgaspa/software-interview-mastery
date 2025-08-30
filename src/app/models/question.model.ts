export type Topic = 'java' | 'spring';
export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface Question {
  id: string;               // ex.: "java-b-001"
  difficulty: Difficulty;   // 'basic' | 'intermediate' | 'advanced'
  prompt: string;           // enunciado (em inglês)
  options: string[];        // múltipla escolha
  answerIndex: number;      // índice da resposta correta
  explanation?: string;     // explicação breve
    /** NOVO: metadados por pergunta */
  topic?: string;          // ex.: "Collections", "Exceptions", "Threads"…
  version?: string;        // ex.: "java-8", "java-17", "java-21"
}
