import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TheatreService } from '../../core/services/theatre.service';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  standalone: false,
  styleUrls: ['./add-theatre.component.css'],
})
export class AddTheatreComponent implements OnInit {
  addTheatreForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private theatreService: TheatreService
  ) {}

  ngOnInit(): void {
    this.addTheatreForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      location: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      capacity: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.addTheatreForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.theatreService.addTheatre(this.addTheatreForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Theatre added successfully!';
          this.addTheatreForm.reset();
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage =
            error.error.message || 'An unexpected error occurred.';
        },
      });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
