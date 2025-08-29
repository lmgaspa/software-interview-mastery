import { Component, Input } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-level-badge',
  imports: [NgClass, UpperCasePipe],
  template: `
    <span class="badge" [ngClass]="cls">{{ level | uppercase }}</span>
  `
})
export class LevelBadgeComponent {
  @Input() level: 'basic' | 'intermediate' | 'advanced' = 'basic';

  get cls() {
    return {
      'text-bg-success': this.level === 'basic',
      'text-bg-warning': this.level === 'intermediate',
      'text-bg-danger': this.level === 'advanced',
    };
  }
}
