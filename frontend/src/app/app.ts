import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 text-gray-800">
      <nav class="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">
        <div class="text-xl font-semibold">🚀 Prompt Library</div>
        <div class="flex gap-6 items-center">
          <a routerLink="/prompts"
             class="text-gray-600 hover:text-blue-600 transition">
            All Prompts
          </a>
          <a routerLink="/add-prompt"
             class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Prompt
          </a>
        </div>
      </nav>
      <main class="p-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}
