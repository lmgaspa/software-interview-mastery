import { Component, inject, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { QuizStore } from '../../../../core/state/quiz.store';
import { QuestionCardComponent } from '../../components/question-card/question-card.component';

@Component({
  standalone: true,
  selector: 'app-play',
  imports: [NgIf, RouterLink, QuestionCardComponent],
  template: `
    <div class="container py-4" style="max-width:820px; width:100%;">
      <!-- Header -->
      <div class="page-header d-flex justify-content-between align-items-center mb-3">
        <a routerLink="/" class="btn btn-light btn-icon" aria-label="Back to menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <span class="d-none d-sm-inline ms-2 fw-semibold">Menu</span>
        </a>

        <div>
          <span class="badge text-bg-secondary me-2 text-uppercase">{{ store.topic() }}</span>
          <span class="badge text-bg-info text-uppercase">{{ store.difficulty() }}</span>
        </div>

        <div class="text-muted small fw-semibold">
          {{ store.currentIndex() + 1 }} / {{ store.total() }}
        </div>
      </div>

      <!-- Question -->
      <ng-container *ngIf="store.currentQuestion() as q; else noData">
        <app-question-card
          [prompt]="q.prompt"
          [options]="q.options"
          [selected]="selected()"
          [topic]="q.topic"
          [version]="q.version"
          (choose)="onChoose($event)"
        >
        </app-question-card>

        <!-- Footer -->
        <div class="d-flex justify-content-between mt-3">
          <button
            class="btn btn-ghost-strong"
            (click)="prev()"
            [disabled]="store.currentIndex() === 0"
          >
            Previous
          </button>

          <button class="btn btn-primary" (click)="next()">
            {{ ctaLabel() }}
          </button>
        </div>
      </ng-container>

      <ng-template #noData>
        <div class="alert alert-warning">No questions loaded. Go to Settings.</div>
      </ng-template>
    </div>
  `,
})
export class PlayPage {
  store = inject(QuizStore);
  private router = inject(Router);

  selected = computed(() => this.store.answers()[this.store.currentIndex()]);
  onChoose(i: number) {
    this.store.answerCurrent(i);
  }
  prev() {
    this.store.prev();
  }

  next() {
    const last = this.store.currentIndex() === this.store.total() - 1;
    if (last) {
      this.store.next();
      this.router.navigateByUrl('/result');
    } else {
      this.store.next();
    }
  }

  ctaLabel() {
    const last = this.store.currentIndex() === this.store.total() - 1;
    return last ? 'Finish' : 'Next';
  }
}
