package tn.esprit.pi.controller;
import java.util.Map;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
public class GeminiChatbotController {

    private String geminiApiKey = "AIzaSyDrUMC4UlDiIJEr0PfJPzMIRFgKLWsZDtw"; // Remplacez ceci par votre clé API Gemini

    // Flag to track if predefined text has been sent
    private boolean predefinedTextSent = false;
    // Predefined text to be sent only once
    private final String predefinedText = "you are a chatbot in a website called clubhub and i'm a student who want to ask u questions , reply to this message with hi";

    @PostMapping("/askQuestion")
    public ResponseEntity<String> generateContent(@RequestBody Map<String, String> requestBody) {
        String userText = requestBody.get("userText");

        RestTemplate restTemplate = new RestTemplate();

        // Définir le point de terminaison de l'API Gemini et la clé API
        String geminiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + geminiApiKey;

        // Préparer la charge utile
        String jsonPayload;
        if (!predefinedTextSent) {
            // Send predefined text only once at the beginning
            jsonPayload = String.format("{\"contents\":[{\"parts\":[{\"text\":\"%s\"}]}]}", predefinedText);
            predefinedTextSent = true; // Set flag to true after sending predefined text
        } else {
            // Send user's text as-is for subsequent requests
            jsonPayload = String.format("{\"contents\":[{\"parts\":[{\"text\":\"%s\"}]}]}", userText);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        // Envoyer une requête POST à l'API Gemini
        ResponseEntity<String> geminiResponse = restTemplate.postForEntity(geminiEndpoint, request, String.class);

        return ResponseEntity.ok(geminiResponse.getBody());
    }

    // Vous pouvez ajouter d'autres méthodes de contrôleur pour gérer d'autres fonctionnalités de votre chatbot

}
