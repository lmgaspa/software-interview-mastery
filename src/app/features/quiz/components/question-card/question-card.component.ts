import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-question-card',
  imports: [CommonModule],
  template: `
  <div class="card-glass">
    <div class="d-flex justify-content-between align-items-start mb-2">
      <h2 class="h3 m-0">{{ prompt }}</h2>

      <!-- badges de meta -->
      <div class="d-flex gap-2 flex-wrap">
        <span *ngIf="topic" class="badge text-bg-dark text-uppercase">{{ topic }}</span>
        <span *ngIf="version" class="badge text-bg-secondary text-uppercase">{{ version }}</span>
      </div>
    </div>

    <div class="vstack gap-3 mt-3">
      <button
        *ngFor="let opt of options; let i = index"
        class="btn w-100"
        [ngClass]="optionClass(i)"
        (click)="choose.emit(i)">
        {{ opt }}
      </button>
    </div>
  </div>
  `
})
export class QuestionCardComponent {
  @Input() prompt!: string;
  @Input() options!: string[];
  @Input() selected: number | null = null;

  // metadados opcionais
  @Input() topic?: string;    // ex.: "Collections", "Exceptions"...
  @Input() version?: string;  // ex.: "java-8", "java-17", "java-21"

  @Output() choose = new EventEmitter<number>();

  optionClass(i: number) {
    // ajuste se tiver estado de certo/errado; por ora destaca o selecionado
    return this.selected === i ? 'btn-primary' : 'btn-outline-light';
  }
}
