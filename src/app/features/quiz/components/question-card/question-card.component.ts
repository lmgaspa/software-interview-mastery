import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-question-card',
  imports: [NgFor, NgClass],
  template: `
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title mb-3">{{ prompt }}</h5>

      <div class="vstack gap-2">
        <button
          *ngFor="let option of options; index as i"
          type="button"
          class="btn"
          [ngClass]="selected === i ? 'btn-primary' : 'btn-outline-primary'"
          (click)="select(i)">
          {{ option }}
        </button>
      </div>
    </div>
  </div>
  `
})
export class QuestionCardComponent {
  @Input() prompt = '';
  @Input() options: string[] = [];
  @Input() selected: number | null = null;

  @Output() choose = new EventEmitter<number>();
  select(i: number) { this.choose.emit(i); }
}
