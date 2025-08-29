import { Component, inject } from '@angular/core';
import { QuizStore } from '../../../../core/state/quiz.store';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-result',
  imports: [NgFor, NgIf],
  template: `
  <div class="container py-4" style="max-width:880px">
    <div class="mb-4">
      <h2>Results</h2>
      <p class="lead mb-1">
        Score: <strong>{{ store.score() }}</strong> / {{ store.total() }}
      </p>
    </div>

    <div class="accordion" id="accordionReview">
      <div class="accordion-item" *ngFor="let q of store.questions(); index as i">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" [attr.data-bs-target]="'#c'+i">
            Q{{ i+1 }} — {{ q.prompt }}
          </button>
        </h2>
        <div [id]="'c'+i" class="accordion-collapse collapse" data-bs-parent="#accordionReview">
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item"
                  *ngFor="let op of q.options; index as j"
                  [class.list-group-item-success]="j === q.answerIndex"
                  [class.list-group-item-danger]="j === store.answers()[i] && j !== q.answerIndex">
                {{ op }}
              </li>
            </ul>
            <div class="mt-3" *ngIf="q.explanation">
              <strong>Explanation:</strong> {{ q.explanation }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 d-flex gap-2">
      <button class="btn btn-outline-secondary" (click)="goHome()">Home</button>
      <button class="btn btn-primary" (click)="retry()">Retry same set</button>
    </div>
  </div>
  `
})
export class ResultPage {
  store = inject(QuizStore);
  private router = inject(Router);

  goHome() { this.router.navigateByUrl('/'); }
  retry() {
    // só reinicia o índice e respostas (mantém mesmas perguntas carregadas)
    this.store.reset(this.store.questions());
    this.router.navigateByUrl('/play');
  }
}
