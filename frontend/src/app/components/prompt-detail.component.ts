import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-3xl mx-auto bg-white p-8 rounded-xl border shadow-sm">
      <button (click)="goBack()"
              class="mb-6 text-blue-600 hover:underline">
        ← Back
      </button>
      <div *ngIf="loading" class="text-gray-500">Loading prompt...</div>
      <div *ngIf="!loading && prompt">
        <h2 class="text-2xl font-semibold mb-4">{{ prompt.title }}</h2>
        <div class="flex gap-3 mb-5">
          <span class="px-3 py-1 rounded-full bg-gray-100 text-sm">
            Complexity: {{ prompt.complexity }}
          </span>
          <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
            👁 Views: {{ prompt.view_count }}
          </span>
        </div>
        <p class="text-gray-700 leading-relaxed">{{ prompt.content }}</p>
      </div>
    </div>
  `
})
export class PromptDetailComponent implements OnInit {
  prompt: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!id) {
        this.loading = false;
        return;
      }
      this.fetchPrompt(id);
    });
  }

  fetchPrompt(id: number) {
    this.loading = true;
    this.prompt = null; // reset old data
    this.promptService.getPrompt(id).subscribe({
      next: (data) => {
        console.log("DETAIL RESPONSE:", data);
        this.prompt = data;
        this.loading = false;
        this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
