// src/app/models/question.model.ts

export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export type Topic =
  | 'java'
  | 'spring'
  | 'git'
  | 'sql'
  | 'nosql'
  | 'designPatterns'
  | 'dockerK8s'
  | 'aws'
  | 'testsCiCd';

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;

  // Campos opcionais usados no app/template
  topic?: Topic | string;
  difficulty?: Difficulty;
  explanation?: string;

  // 🔧 adicionando 'version' para corrigir o erro no template
  version?: string;
}
