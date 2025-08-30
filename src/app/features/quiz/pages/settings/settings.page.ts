import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { QuestionLoaderService } from '../../../../core/services/question-loader.service';
import { QuizStore } from '../../../../core/state/quiz.store';
import { Difficulty, Topic } from '../../../../models/question.model';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="container py-4" style="max-width:720px">
      <!-- Header com botão voltar -->
      <div class="page-header d-flex justify-content-between align-items-center mb-4">
        <a routerLink="/" class="btn btn-light btn-icon" aria-label="Back to menu">
          <!-- Ícone seta -->
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <span class="d-none d-sm-inline ms-2 fw-semibold">Menu</span>
        </a>
        <h2 class="mb-0">Quiz Settings</h2>
        <div></div>
        <!-- espaço para balancear -->
      </div>

      <!-- Form -->
      <form (ngSubmit)="start()" class="settings-form vstack gap-4">
        <div class="row g-4">
          <div class="col-12 col-md-6">
            <label class="form-label">Topic</label>
            <select class="form-select" [(ngModel)]="topic" name="topic">
              <option value="java">Java</option>
              <option value="spring">Spring</option>
            </select>
          </div>

          <div class="col-12 col-md-6">
            <label class="form-label">Difficulty</label>
            <select class="form-select" [(ngModel)]="difficulty" name="difficulty">
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <button class="btn btn-primary align-self-start" [disabled]="loading">
          {{ loading ? 'Loading...' : 'Start Quiz' }}
        </button>
      </form>
    </div>
  `,
})
export class SettingsPage {
  private loader = inject(QuestionLoaderService);
  private store = inject(QuizStore);
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
