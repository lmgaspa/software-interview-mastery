import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, Topic, Difficulty } from '../../models/question.model';
import { firstValueFrom, map } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class QuestionLoaderService {
  private http = inject(HttpClient);

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

  private shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  private shuffleQuestion(question: Question) {
    const correct = question.options[question.answerIndex];
    const shuffled = this.shuffleArray(question.options);
    const newIndex = shuffled.indexOf(correct);
    return { ...question, options: shuffled, answerIndex: newIndex };
  }

  async load(topic: Topic, level: Difficulty): Promise<Question[]> {
    const url = this.fileMap[topic][level];
    const questions = await firstValueFrom(
      this.http.get<Question[]>(url).pipe(
        map(qs => qs.map(q => this.shuffleQuestion(q)))
      )
    );
    // Aqui garantimos apenas 10 aleatórias
    return this.shuffleArray(questions).slice(0, 10);
  }
}
