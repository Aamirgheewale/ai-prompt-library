import { Routes } from '@angular/router';
import { PromptListComponent } from './components/prompt-list.component';
import { PromptDetailComponent } from './components/prompt-detail.component';
import { AddPromptComponent } from './components/add-prompt.component';

export const routes: Routes = [
  { path: '', redirectTo: 'prompts', pathMatch: 'full' },
  { path: 'prompts', component: PromptListComponent },
  { path: 'prompts/:id', component: PromptDetailComponent },
  { path: 'add-prompt', component: AddPromptComponent }
];
