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
    <div style="padding:20px;">
      <h2>Add New Prompt</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div>
          <label>Title</label><br>
          <input formControlName="title" />
          <div *ngIf="form.controls.title.touched && form.controls.title.invalid">
            Title must be at least 3 characters
          </div>
        </div>
        <br>
        <div>
          <label>Content</label><br>
          <textarea formControlName="content"></textarea>
          <div *ngIf="form.controls.content.touched && form.controls.content.invalid">
            Content must be at least 20 characters
          </div>
        </div>
        <br>
        <div>
          <label>Complexity (1–10)</label><br>
          <input type="number" formControlName="complexity" />
        </div>
        <br>
        <button type="submit" [disabled]="form.invalid">Create Prompt</button>
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
