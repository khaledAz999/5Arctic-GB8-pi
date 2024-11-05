import { Component } from '@angular/core';
import { ReclamationService } from 'src/app/services/Reclamation.service';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/model/Reclamation';


@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent {


  reclamations: Reclamation[]=[];
  searchKeyword: string = '';
  p: number = 1;

  reponseContenu: string = '';

  constructor(private service: ReclamationService, private router: Router) { }
  
  ngOnInit() {
   this.getReclamations();

  }
 
  
  getReclamations(): void {
    this.service.listreclamation().subscribe(
      (data:any) => {
        this.reclamations = data;
        console.log('tasks:', data);

      },
      error => {
        console.error('Erreur lors de la récupération des tasks', error);
      }
    );
  }
  
 
  
   deleteReclamation(id: number): void {
    this.service.deleteReclamation(id)
      .subscribe(() => {
        this.reclamations = this.reclamations.filter(reclamationn => reclamationn.id !== id);
      });
  } 
  modifierreclamation(id: any) {
    this.router.navigate(['modifierreclamation' + '/' +id]);
  }


  searchReclamations(): void {
    if (this.searchKeyword.trim() !== '') {
      this.service.searchReclamations(this.searchKeyword).subscribe(
        data => {
          this.reclamations = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Erreur lors de la recherche des taks', error);
        }
      );
    } else {
      this.ngOnInit();
    }
  } 


  openResponseForm(reclamation: Reclamation): void {
    this.router.navigate(['reponse', reclamation.id], { state: { reclamationDetails: reclamation } });
}






}
