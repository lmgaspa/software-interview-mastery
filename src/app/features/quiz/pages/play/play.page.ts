import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../../../core/state/quiz.store';
import { NgIf } from '@angular/common';
import { QuestionCardComponent } from '../../components/question-card/question-card.component';

@Component({
  standalone: true,
  selector: 'app-play',
  imports: [NgIf, QuestionCardComponent],
  template: `
  <div class="container py-4" style="max-width:820px">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <span class="badge text-bg-secondary me-2 text-uppercase">{{ store.topic() }}</span>
        <span class="badge text-bg-info text-uppercase">{{ store.difficulty() }}</span>
      </div>
      <div class="text-muted">
        {{ store.currentIndex() + 1 }} / {{ store.total() }}
      </div>
    </div>

    <ng-container *ngIf="store.currentQuestion() as q; else noData">
      <app-question-card
        [prompt]="q.prompt"
        [options]="q.options"
        [selected]="selected()"
        (choose)="onChoose($event)">
      </app-question-card>

      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-outline-secondary" (click)="prev()" [disabled]="store.currentIndex()===0">Previous</button>
        <button class="btn btn-primary" (click)="next()">{{ ctaLabel() }}</button>
      </div>
    </ng-container>

    <ng-template #noData>
      <div class="alert alert-warning">No questions loaded. Go to Settings.</div>
    </ng-template>
  </div>
  `
})
export class PlayPage {
  store = inject(QuizStore);
  private router = inject(Router);

  selected = computed(() => this.store.answers()[this.store.currentIndex()]);

  onChoose(i: number) { this.store.answerCurrent(i); }

  prev() { this.store.prev(); }

  next() {
    const last = this.store.currentIndex() === this.store.total() - 1;
    if (last) {
      this.store.next(); // avança para estado "finished"
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
