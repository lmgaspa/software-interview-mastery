// src/app/core/services/question-loader.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Question, Topic, Difficulty } from '../../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionLoaderService {
  private http = inject(HttpClient);

  // Ajuste os caminhos conforme onde estão seus JSONs:
  // -> se os arquivos estão em src/assets/questions: use 'assets/...'
  // -> se estão em public/questions: use '/questions/...'
  private fileMap: Record<Topic, Record<Difficulty, string>> = {
    java: {
      basic:        'assets/questions/java.basic.json',
      intermediate: 'assets/questions/java.intermediate.json',
      advanced:     'assets/questions/java.advanced.json',
    },
    spring: {
      basic:        'assets/questions/spring.basic.json',
      intermediate: 'assets/questions/spring.intermediate.json',
      advanced:     'assets/questions/spring.advanced.json',
    }
  };

  private shuffleArray<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  private shuffleQuestion(q: Question): Question {
    const shuffled = this.shuffleArray(q.options);
    const correct = q.options[q.answerIndex];
    const answerIndex = shuffled.indexOf(correct);
    return { ...q, options: shuffled, answerIndex };
  }

  async load(topic: Topic, level: Difficulty): Promise<Question[]> {
    const url = this.fileMap[topic][level];
    return await firstValueFrom(
      this.http.get<Question[]>(url).pipe(
        map(qs => qs.map(q => this.shuffleQuestion(q)))
      )
    );
  }
}
