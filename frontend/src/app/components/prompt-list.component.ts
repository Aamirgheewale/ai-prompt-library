import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-5xl mx-auto">
      <h2 class="text-2xl font-semibold mb-8">All Prompts</h2>
      <div *ngIf="loading" class="text-gray-500">Loading prompts...</div>
      <div *ngIf="!loading && prompts.length === 0">No prompts available.</div>
      <div class="grid gap-5">
        <div *ngFor="let prompt of prompts"
             class="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
          <h3 class="text-lg font-semibold mb-2">{{ prompt.title }}</h3>
          <span class="text-xs px-3 py-1 rounded-full font-medium"
                [ngClass]="{
                  'bg-green-100 text-green-700': prompt.complexity <= 3,
                  'bg-yellow-100 text-yellow-700': prompt.complexity > 3 && prompt.complexity <= 7,
                  'bg-red-100 text-red-700': prompt.complexity > 7
                }">
            Complexity: {{ prompt.complexity }}
          </span>
          <div class="mt-4">
            <a [routerLink]="['/prompts', prompt.id]"
               class="text-blue-600 hover:underline">
              View Details →
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PromptListComponent implements OnInit {
  prompts: any[] = [];
  loading = true;

  constructor(private promptService: PromptService) {}

  ngOnInit() {
    console.log("🚀 PromptListComponent initialized");
    this.fetchPrompts();
  }

  fetchPrompts() {
    console.log("📡 Calling API: getPrompts()");
    this.promptService.getPrompts().subscribe({
      next: (data) => {
        console.log("✅ API RESPONSE RECEIVED:", data);
        this.prompts = data;
        this.loading = false;
        console.log("📊 Prompts length:", this.prompts.length);
        console.log("🔄 Loading state:", this.loading);
      },
      error: (err) => {
        console.error("❌ API ERROR:", err);
        this.loading = false;
        console.log("🔄 Loading state after error:", this.loading);
      }
    });
  }
}
