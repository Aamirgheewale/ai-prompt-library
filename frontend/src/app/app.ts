import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav style="padding:10px; background:#eee;">
      <a routerLink="/prompts">All Prompts</a> |
      <a routerLink="/add-prompt">Add Prompt</a>
    </nav>
    <hr>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
