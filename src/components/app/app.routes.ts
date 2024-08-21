import { Routes } from '@angular/router';
import { InputComponent } from '../input/input.component';
import { OutputComponent } from '../output/output.component';

const titlePrefix = 'Number';

export const routes: Routes = [
  { path: 'input', component: InputComponent, title: `${titlePrefix}: Input` },
  {
    path: 'output',
    component: OutputComponent,
    title: `${titlePrefix}: Output`,
  },
  { path: '', redirectTo: '/input', pathMatch: 'full' },
];
