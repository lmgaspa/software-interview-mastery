import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, Topic, Difficulty } from '../../models/question.model';
import { firstValueFrom, map } from 'rxjs';

type FileMap = Record<Topic, string | Record<Difficulty, string>>;

@Injectable({ providedIn: 'root' })
export class QuestionLoaderService {
  private http = inject(HttpClient);

  // Ajuste os paths conforme os nomes reais dos seus arquivos
  private fileMap: FileMap = {
    // 3 arquivos por dificuldade
    java: {
      basic:        'assets/questions/java.basic.json',
      intermediate: 'assets/questions/java.intermediate.json',
      advanced:     'assets/questions/java.advanced.json',
    },
    spring: {
      basic:        'assets/questions/spring.basic.json',
      intermediate: 'assets/questions/spring.intermediate.json',
      advanced:     'assets/questions/spring.advanced.json',
    },

    // Arquivo único por tópico
    git:            'assets/questions/git.json',
    nosql:          'assets/questions/nosql.json',
    designPatterns: 'assets/questions/design-patterns.json',
    dockerK8s:      'assets/questions/docker-k8s.json',
    aws:            'assets/questions/aws.json',
    testsCiCd:      'assets/questions/tests-cicd.json',
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

  // Overloads: com e sem dificuldade
  async load(topic: Topic, level: Difficulty): Promise<Question[]>;
  async load(topic: Topic): Promise<Question[]>;
  async load(topic: Topic, level?: Difficulty): Promise<Question[]> {
    const entry = this.fileMap[topic];

    // Se for arquivo único, ignora 'level'
    const url =
      typeof entry === 'string'
        ? entry
        : entry[(level ?? 'basic') as Difficulty]; // default para basic se não vier level

    const questions = await firstValueFrom(
      this.http.get<Question[]>(url).pipe(
        map(qs => qs.map(q => this.shuffleQuestion(q)))
      )
    );

    // Retorna 10 aleatórias
    return this.shuffleArray(questions).slice(0, 10);
  }
}
