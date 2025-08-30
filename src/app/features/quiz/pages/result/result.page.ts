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
          <button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse"
                  [attr.data-bs-target]="'#c'+i">
            Q{{ i+1 }} — {{ q.prompt }}
          </button>
        </h2>

        <div [id]="'c'+i" class="accordion-collapse collapse" data-bs-parent="#accordionReview">
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item d-flex align-items-center"
                  *ngFor="let op of q.options; index as j"
                  [class.list-group-item-success]="
                     store.answers()[i] === q.answerIndex && j === q.answerIndex
                  "
                  [class.list-group-item-danger]="
                     store.answers()[i] !== q.answerIndex && j === store.answers()[i]
                  ">

                <!-- Caso ACERTOU (mostra apenas o check verde na correta) -->
                <i *ngIf="store.answers()[i] === q.answerIndex && j === q.answerIndex"
                   class="bi bi-check-circle-fill text-success me-2"></i>

                <!-- Caso ERROU: opção marcada errada mostra X vermelho -->
                <i *ngIf="store.answers()[i] !== q.answerIndex && j === store.answers()[i]"
                   class="bi bi-x-circle-fill text-danger me-2"></i>

                <!-- Caso ERROU: mostrar seta/mira na opção correta -->
                <i *ngIf="store.answers()[i] !== q.answerIndex && j === q.answerIndex"
                   class="bi bi-arrow-right-circle-fill text-success me-2"></i>

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
      <button class="btn btn-ghost-dark" (click)="goHome()">Home</button>
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
    // reinicia índice e respostas (mantém mesmas perguntas carregadas)
    this.store.reset(this.store.questions());
    this.router.navigateByUrl('/play');
  }
}
