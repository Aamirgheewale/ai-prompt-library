import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-add-prompt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-xl mx-auto bg-white p-8 rounded-xl border shadow-sm">
      <h2 class="text-xl font-semibold mb-6">Create New Prompt</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-5">
        <div>
          <input formControlName="title"
                 placeholder="Title"
                 class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <div *ngIf="form.controls.title.touched && form.controls.title.invalid"
               class="text-red-600 text-sm mt-1">
            Title must be at least 3 characters
          </div>
        </div>
        <div>
          <textarea formControlName="content"
                    placeholder="Prompt content..."
                    rows="6"
                    class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <div *ngIf="form.controls.content.touched && form.controls.content.invalid"
               class="text-red-600 text-sm mt-1">
            Content must be at least 20 characters
          </div>
        </div>
        <div>
          <input type="number"
                 formControlName="complexity"
                 placeholder="Complexity (1-10)"
                 class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <button type="submit"
                [disabled]="form.invalid"
                class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
          Create Prompt
        </button>
      </form>
    </div>
  `
})
export class AddPromptComponent {
  form: any;

  constructor(
    private fb: FormBuilder,
    private promptService: PromptService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      complexity: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.promptService.createPrompt(this.form.value).subscribe({
      next: () => {
        alert('Prompt created!');
        this.router.navigate(['/prompts']);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
