import { Injectable, signal, computed } from '@angular/core';
import { Difficulty, Question, Topic } from '../../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuizStore {
  topic = signal<Topic>('java');
  difficulty = signal<Difficulty>('basic');
  questions = signal<Question[]>([]);
  currentIndex = signal(0);
  answers = signal<number[]>([]); // guarda índice marcado pelo usuário

  currentQuestion = computed(() => this.questions()[this.currentIndex()] ?? null);
  total = computed(() => this.questions().length);
  isFinished = computed(() => this.currentIndex() >= this.total() && this.total() > 0);

  reset(questions: Question[]) {
    this.questions.set(questions);
    this.currentIndex.set(0);
    this.answers.set(Array(questions.length).fill(-1));
  }

  answerCurrent(optionIndex: number) {
    const idx = this.currentIndex();
    const copy = [...this.answers()];
    copy[idx] = optionIndex;
    this.answers.set(copy);
  }

  next() { this.currentIndex.update(v => Math.min(v + 1, this.total())); }
  prev() { this.currentIndex.update(v => Math.max(v - 1, 0)); }

  score = computed(() => {
    const qs = this.questions();
    return this.answers().reduce((acc, chosen, i) =>
      acc + (chosen === qs[i]?.answerIndex ? 1 : 0), 0
    );
  });
}
