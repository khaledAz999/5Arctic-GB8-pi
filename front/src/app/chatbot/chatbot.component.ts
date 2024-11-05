import { Component } from '@angular/core';
import { ReclamationService } from 'src/app/services/Reclamation.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userText: string = '';
  chatHistory: any[] = [];
  showChat: boolean = false;
  showBubble: boolean = true; // New property to control the chat bubble visibility

  constructor(private reclamationService: ReclamationService) {}

  // Method to toggle the chat container and hide/show the chat bubble
  toggleChat(): void {
    this.showChat = !this.showChat;
    this.showBubble = !this.showChat; // Invert the showBubble value when showChat changes
  }

  // Method to send a message to the chatbot
  sendMessage(): void {
    if (this.userText.trim() !== '') {
      this.chatHistory.push({ sender: 'user', message: this.userText });
      this.reclamationService.askQuestion(this.userText).subscribe(response => {
        for (let candidate of response.candidates) {
          this.chatHistory.push({ sender: 'bot', message: candidate.content.parts[0].text });
        }
        this.userText = '';
      });
    }
  }
}