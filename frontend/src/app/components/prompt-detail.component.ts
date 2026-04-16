import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:20px;">
      <button (click)="goBack()">← Back</button>
      <div *ngIf="loading">Loading prompt...</div>
      <div *ngIf="!loading && prompt">
        <h2>{{ prompt.title }}</h2>
        <p><strong>Complexity:</strong> {{ prompt.complexity }}</p>
        <p><strong>Views:</strong> {{ prompt.view_count }}</p>
        <hr>
        <p>{{ prompt.content }}</p>
      </div>
      <div *ngIf="!loading && !prompt">Prompt not found.</div>
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
