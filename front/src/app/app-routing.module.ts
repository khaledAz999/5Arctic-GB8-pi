import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { EventsComponent } from './events/events.component';
import { ClubsComponent } from './clubs/clubs.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { ModifierreclamationComponent } from './Reclamation/update-reclamation/update-reclamation.component';
import { AjouterreclamationComponent } from './Reclamation/add-reclamation/add-reclamation.component';
import { ListReclamationComponent } from './Reclamation/list-reclamation/list-reclamation.component';
import {ChatbotComponent} from './chatbot/chatbot.component'
const routes: Routes = [

  //route par defaut
  {path:'' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component : HomeComponent },
  { path: 'forum', component : ForumComponent },
  { path: 'events', component : EventsComponent },
  { path: 'clubs', component : ClubsComponent },
  { path: 'AddReclamation', component : AjouterreclamationComponent },
  { path: 'login', component : LoginComponent },
  { path: 'profile', component : ProfileComponent },
  { path: 'contact', component : ContactComponent },
  { path: 'listreclamation', component : ListReclamationComponent },
  { path: 'modifierreclamation/:id', component : ModifierreclamationComponent },
  { path: 'Chatbot', component : ChatbotComponent },

    //route parametré
/*
  { path: 'detail/:id' , component : DetailProductComponent},
  { path: 'appartement/:id' , component : AppartementComponent},*/
  //route NotFound
  {path:'**' , component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
