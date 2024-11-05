import { Component } from '@angular/core';
import { Reclamation } from 'src/app/model/Reclamation';
import { ReclamationService } from 'src/app/services/Reclamation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-reclamation',
  templateUrl: './update-reclamation.component.html',
  styleUrls: ['./update-reclamation.component.css']
})
export class ModifierreclamationComponent {
  id: any;
  BlocForm: FormGroup;
  formSubmitted = false;

  constructor(private service: ReclamationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
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
      ]),
      categorie: new FormControl('', [
        Validators.required,
      ])
    };
    this.BlocForm = this.fb.group(formControls);
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.id = id;
    this.service.getReclamation(this.id).subscribe((result: Reclamation) => {
      let reclamation = result;
      if (Array.isArray(reclamation.dateSoumission)) {
        let dateArray = reclamation.dateSoumission;
        let dateString = `${dateArray[0]}-${dateArray[1].toString().padStart(2, '0')}-${dateArray[2].toString().padStart(2, '0')}`;
        this.BlocForm.patchValue({
          descriptionReclamation: reclamation.descriptionReclamation,
          name: reclamation.name,
          dateSoumission: dateString,
          categorie: reclamation.categorie
        });
      }
    });
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
      return 'Ce champ est obligatoire';
    }
    if (this.BlocForm.get(field)?.hasError('minlength')) {
      return 'Ce champ doit contenir au moins 4 caractères';
    }
    return '';
  }

  modifierReclamation() {
    this.formSubmitted = true;
    if (this.BlocForm.invalid) {
      return;
    }
    let data = this.BlocForm.value;
    let reclamation = new Reclamation(
      this.id,
      data.descriptionReclamation,
      data.name,
      data.dateSoumission,
      data.categorie
    );
    this.service.modifierreclamation(reclamation).subscribe(
      () => {
        console.log('Reclamation updated successfully');
        this.router.navigate(['listreclamation']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating reclamation:', error);
      }
    );
  }
}
