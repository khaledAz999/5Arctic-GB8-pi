import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation, CategorieType } from 'src/app/model/Reclamation';
import { ReclamationService } from 'src/app/services/Reclamation.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/Notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AjouterreclamationComponent {
  BlocForm: FormGroup;
  reclamations: Reclamation[] = [];
  formSubmitted = false;
  notificationShown = false; // New boolean flag to track notification

  constructor(
    private service: ReclamationService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    let formControls = {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      dateSoumission: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      descriptionReclamation: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?!.*bad).*$/i) // Pattern to disallow "bad"
      ]),
      categorie: new FormControl('', [
        Validators.required,
      ]),
    };
    this.BlocForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
  }

  get name() { return this.BlocForm.get('name'); }
  get dateSoumission() { return this.BlocForm.get('dateSoumission'); }
  get descriptionReclamation() { return this.BlocForm.get('descriptionReclamation'); }
  get categorie() { return this.BlocForm.get('categorie'); }

  validateField(field: string) {
    return (
      this.BlocForm.get(field)?.invalid &&
      (this.BlocForm.get(field)?.touched || this.formSubmitted)
    );
  }

  getErrorMessage(field: string) {
    if (this.BlocForm.get(field)?.hasError('required')) {
      return 'This field is required';
    }
    if (this.BlocForm.get(field)?.hasError('minlength')) {
      return 'This field must contain at least 4 characters';
    }
    if (this.BlocForm.value.descriptionReclamation.toLowerCase().includes('bad') && !this.notificationShown) {
      this.notificationShown = true; // Set flag to true to indicate notification shown
      this.toastr.success('Please do not use inappropriate language.');
      return;
    }
    return '';
  }

  addReclamation() {
    this.formSubmitted = true;
    if (this.BlocForm.invalid) {
      return;
    }
    const data = this.BlocForm.value;

    if (data.descriptionReclamation.toLowerCase().includes('bad')) {
      return;
    }

    const newReclamation = new Reclamation(
      undefined,
      data.descriptionReclamation,
      data.name,
      data.dateSoumission,
      data.categorie,
    );

    console.log('Reclamation:', newReclamation);
    this.service.ajouterreclamation(newReclamation).subscribe(
      res => {
        console.log(res);
        console.log('add succfuly ', res)
        this.router.navigate(['listreclamation']);
      },
      err => {
        console.error('Erreur lors de l\'ajout de la réclamation :', err);
        if (err instanceof HttpErrorResponse) {
          console.error('Error:', err.error);
        }
      }
    );
  }
}
