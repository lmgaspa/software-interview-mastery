import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { SettingsPage } from './pages/settings/settings.page';
import { PlayPage } from './pages/play/play.page';
import { ResultPage } from './pages/result/result.page';

export const QUIZ_ROUTES: Routes = [
  { path: '', component: HomePage },
  { path: 'settings', component: SettingsPage },
  { path: 'play', component: PlayPage },
  { path: 'result', component: ResultPage }
];
