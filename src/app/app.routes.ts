import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./features/quiz/quiz.routes').then(m => m.QUIZ_ROUTES) },
  { path: '**', redirectTo: '' }
];
