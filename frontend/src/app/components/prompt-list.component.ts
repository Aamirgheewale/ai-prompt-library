import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding:20px;">
      <h2>All Prompts</h2>
      <div *ngIf="loading">Loading prompts...</div>
      <div *ngIf="!loading">
        <div *ngIf="prompts.length === 0">No prompts available.</div>
        <div *ngFor="let prompt of prompts"
             style="border:1px solid #ccc; padding:10px; margin:10px 0; border-radius:8px;">
          <h3>{{ prompt.title }}</h3>
          <p>Complexity: <strong>{{ prompt.complexity }}</strong></p>
          <a [routerLink]="['/prompts', prompt.id]">View Details →</a>
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
