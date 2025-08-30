// settings.page.ts (substitua só este componente)

import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { QuestionLoaderService } from '../../../../core/services/question-loader.service';
import { QuizStore } from '../../../../core/state/quiz.store';
import { Difficulty, Topic } from '../../../../models/question.model';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [CommonModule, NgIf, FormsModule, RouterLink],
  template: `
    <div class="container py-4" style="max-width:720px">
      <div class="page-header d-flex align-items-center justify-content-between mb-3">
        <a routerLink="/home" class="btn btn-light btn-icon" aria-label="Back to Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <span class="d-none d-sm-inline ms-2 fw-semibold">Menu</span>
        </a>
        <h2 class="mb-0">Quiz Settings</h2>
      </div>

      <form (ngSubmit)="start()" class="vstack gap-4">
        <div>
          <label class="form-label">Topic</label>
          <select class="form-select" [(ngModel)]="topic" name="topic">
            <option *ngFor="let t of topics" [value]="t">
              {{ labelTopic(t) }}
            </option>
          </select>
        </div>

        <div>
          <label class="form-label">Difficulty</label>
          <select
            class="form-select"
            [(ngModel)]="difficulty"
            name="difficulty"
            [disabled]="isSingleFileTopic(topic)">
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <small *ngIf="isSingleFileTopic(topic)" class="text-muted">
            This topic has a single question file; difficulty is ignored.
          </small>
        </div>

        <button class="btn btn-primary" [disabled]="loading">
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

  // ✅ todos os tópicos que sua model já declara
  topics: Topic[] = [
    'java',
    'spring',
    'git',
    'nosql',
    'designPatterns',
    'dockerK8s',
    'aws',
    'testsCiCd',
  ];

  // ✅ tópicos com arquivo único (no seu service)
  private singleFileTopics = new Set<Topic>([
    'git',
    'nosql',
    'designPatterns',
    'dockerK8s',
    'aws',
    'testsCiCd',
  ]);

  topic: Topic = 'java';
  difficulty: Difficulty = 'basic';
  loading = false;

  isSingleFileTopic(t: Topic) {
    return this.singleFileTopics.has(t);
  }

  labelTopic(t: Topic) {
    switch (t) {
      case 'java': return 'Java';
      case 'spring': return 'Spring';
      case 'git': return 'Git';
      case 'nosql': return 'NoSQL';
      case 'designPatterns': return 'Design Patterns';
      case 'dockerK8s': return 'Docker & Kubernetes';
      case 'aws': return 'AWS';
      case 'testsCiCd': return 'Tests & CI/CD';
      default: return t;
    }
  }

  async start() {
    this.loading = true;
    // Pode passar difficulty sempre; o service ignora para arquivo único
    const data = await this.loader.load(this.topic, this.difficulty);
    this.store.topic.set(this.topic);
    this.store.difficulty.set(this.difficulty);
    this.store.reset(data);
    this.loading = false;
    this.router.navigateByUrl('/play');
  }
}
