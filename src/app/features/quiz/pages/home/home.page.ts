import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink],
  template: `
  <div class="page-container d-flex flex-column align-items-center justify-content-center" style="min-height:80vh;">
  <div class="card-glass text-center w-100" style="max-width:700px;">
    <h1 class="display-4 fw-bold mb-3">Software Interview Mastery</h1>
    <p class="lead text-muted mb-4">Sharpen your Java & Spring interview skills with levels.</p>

    <div class="d-flex gap-3 justify-content-center">
      <a routerLink="/settings" class="btn btn-primary btn-lg px-4">Start Practicing</a>
    </div>
  </div>
</div>

  `
})
export class HomePage {}
