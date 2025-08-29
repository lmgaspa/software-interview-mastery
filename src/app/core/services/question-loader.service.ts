import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, Topic, Difficulty } from '../../models/question.model';
import { firstValueFrom } from 'rxjs';

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

  async load(topic: Topic, level: Difficulty): Promise<Question[]> {
    const url = this.fileMap[topic][level];
    return await firstValueFrom(this.http.get<Question[]>(url));
  }
}
