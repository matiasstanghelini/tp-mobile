import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'habits',
        loadComponent: () =>
          import('../pages/habits/habits.page').then((m) => m.HabitsPage),
      },
      {
        path: 'today',
        loadComponent: () =>
          import('../pages/today/today.page').then((m) => m.TodayPage),
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('../pages/stats/stats.page').then((m) => m.StatsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/habits',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/habits',
    pathMatch: 'full',
  },
];
