import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { EventsComponent } from './events/events.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifierreclamationComponent } from './Reclamation/update-reclamation/update-reclamation.component';
import { AjouterreclamationComponent } from './Reclamation/add-reclamation/add-reclamation.component';
import { ListReclamationComponent } from './Reclamation/list-reclamation/list-reclamation.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { ListReclamationComponent } from './back/list-reclamation/list-reclamation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ForumComponent,
    EventsComponent,
    ClubsComponent,
    ContactComponent,
    NotFoundComponent,
    ProfileComponent,
    ModifierreclamationComponent,
    AjouterreclamationComponent,
   ListReclamationComponent,
   ChatbotComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    

  ],
  providers: [    
    DatePipe,
  ],
  bootstrap: [AppComponent]
 })
export class AppModule { }





