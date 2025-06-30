import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'today',
    loadComponent: () => import('./pages/today/today.page').then( m => m.TodayPage)
  },
  {
    path: 'habits',
    loadComponent: () => import('./pages/habits/habits.page').then( m => m.HabitsPage)
  },
  {
    path: 'stats',
    loadComponent: () => import('./pages/stats/stats.page').then( m => m.StatsPage)
  },
];
