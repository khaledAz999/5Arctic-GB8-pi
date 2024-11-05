import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reclamation } from 'src/app/model/Reclamation';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private ajouterurl ='http://localhost:8088/pi/feedback/ajoutFeedback';
  private listurl ='http://localhost:8088/pi/feedback/getAllFeedbacks';
  private Url='http://localhost:8088/pi/feedback/deleteID';
  private Urls='http://localhost:8088/pi/feedback';
  private modifierurl = 'http://localhost:8088/pi/feedback/updateFeedback';
  private chatboturl = 'http://localhost:8088/pi/askQuestion';
/*  

  private userUrl='http://localhost:8085/rania/retrieveAllUsers';
 
  private apiUrl = 'http://localhost:8085/rania/reclamationStats';
  private apiReponseAjout ='http://localhost:8085/rania/addReponse';
  private apiReponseaffiche='http://localhost:8085/rania/retrieveAllReponse'; */
  constructor(private http: HttpClient) { }
  
 /* ajouterreclamation(reclamation: Reclamation) {
     return this.http.post<any>(this.ajouterurl, reclamation,httpOptions);
   }*/

   ajouterreclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.ajouterurl, reclamation, httpOptions);
  }
  askQuestion(userText: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    const payload = { userText: userText };
    return this.http.post<any>(this.chatboturl, payload, options);
  }
  
  listreclamation() {
    
    return this.http.get(this.listurl);
   }
    deleteReclamation(id: number): Observable<void> {
    const url = `${this.Url}/${id}`;
    return this.http.delete<void>(url);
  }
  searchReclamations(keyword: string): Observable<Reclamation[]> {
    const url = `${this.Urls}/searchReclamation?keyword=${keyword}`;
    return this.http.get<Reclamation[]>(url);
  }
  modifierreclamation(reclamation: Reclamation) {
    const Url = `${this.modifierurl}`;
    return this.http.put<Reclamation>(Url, reclamation);

   }
   getReclamation(id: any) {
    return this.http.get('http://localhost:8088/pi/feedback/getFeedbackId/' + id)
  }
  /*  supprimerreclamation(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:9000/pi/feedback/deleteID/${id}`);
   } */

/*   ajoutReponseToReclamation(id: number, reponseReclamation: ReponseReclamation): Observable<ReponseReclamation> {
    const url = `${this.Url}/reclamations/${id}/reponses`;
    return this.http.post<ReponseReclamation>(url, reponseReclamation, httpOptions);
}

 
 listreclamation() {
    
   return this.http.get(this.listurl);
  }

  listreponse() {
    
    return this.http.get(this.apiReponseaffiche);
   }
 

  
   modifierreclamation(id:number,reclamation: Reclamation) {
    const url = `${this.modifierurl}/${id}`;
    return this.http.put<Reclamation>(url, reclamation);

   }
 
  

   

   getReponse(id: any) {
    return this.http.get('http://localhost:8085/rania/getReponse/' + id)
  }
  

   getUsers() {
    
    return this.http.get(this.userUrl);
   }


   searchReclamations(keyword: string): Observable<Reclamation[]> {
    const url = `${this.Url}/searchReclamation?keyword=${keyword}`;
    return this.http.get<Reclamation[]>(url);
  }

 

  getReclamationByName(name: string): Observable<Reclamation> {
    const url = `${this.Url}/getReclamationByName/${name}`;
    return this.http.get<Reclamation>(url);
} 
 */
}
