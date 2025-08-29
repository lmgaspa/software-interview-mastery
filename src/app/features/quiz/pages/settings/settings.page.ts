import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionLoaderService } from '../../../../core/services/question-loader.service';
import { QuizStore } from '../../../../core/state/quiz.store';
import { Difficulty, Topic } from '../../../../models/question.model';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [FormsModule],
  template: `
  <div class="container py-4" style="max-width:720px">
    <h2 class="mb-3">Quiz Settings</h2>

    <form (ngSubmit)="start()" class="vstack gap-3">
      <div>
        <label class="form-label">Topic</label>
        <select class="form-select" [(ngModel)]="topic" name="topic">
          <option value="java">Java</option>
          <option value="spring">Spring</option>
        </select>
      </div>

      <div>
        <label class="form-label">Difficulty</label>
        <select class="form-select" [(ngModel)]="difficulty" name="difficulty">
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <button class="btn btn-primary" [disabled]="loading">
        {{ loading ? 'Loading...' : 'Start Quiz' }}
      </button>
    </form>
  </div>
  `
})
export class SettingsPage {
  private loader = inject(QuestionLoaderService);
  private store  = inject(QuizStore);
  private router = inject(Router);

  topic: Topic = 'java';
  difficulty: Difficulty = 'basic';
  loading = false;

  async start() {
    this.loading = true;
    const data = await this.loader.load(this.topic, this.difficulty);
    this.store.topic.set(this.topic);
    this.store.difficulty.set(this.difficulty);
    this.store.reset(data);
    this.loading = false;
    this.router.navigateByUrl('/play');
  }
}
