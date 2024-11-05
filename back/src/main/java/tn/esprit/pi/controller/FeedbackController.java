package tn.esprit.pi.controller;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pi.entities.Feedback;
import tn.esprit.pi.repository.IFeedbackRepository;
import tn.esprit.pi.services.GestionFeedbackImpl;
import tn.esprit.pi.services.IGestionFeedback;

import java.util.List;
import java.util.stream.Collectors;

@RestController
//@CrossOrigin("*")
@RequestMapping("/feedback")
public class FeedbackController {

    private  GestionFeedbackImpl gestionFeedbackImpl;
    @Autowired
    private   IFeedbackRepository iFeedbackRepository;


    private  final JavaMailSender emailSender;

    public FeedbackController(GestionFeedbackImpl gestionFeedbackImpl, IFeedbackRepository iFeedbackRepository, JavaMailSender emailSender) {
        this.gestionFeedbackImpl = gestionFeedbackImpl;

        this.iFeedbackRepository = iFeedbackRepository;

        this.emailSender = emailSender;

    }

    @Autowired
    IGestionFeedback iGestionFeedback;
    @GetMapping("/getAllFeedbacks")
    public List<Feedback> getAll(){
        return iGestionFeedback.retrieveAllFeeddbacks();
    }
    @PostMapping("/ajoutFeedback")
    public Feedback ajoutFeedback(@RequestBody Feedback feedback){
        Feedback addedFeedback = iGestionFeedback.addorUpdateFeedback(feedback);

        try {
            sendFeedbackEmail(addedFeedback);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return addedFeedback;
    }

    private void sendFeedbackEmail(Feedback feedback) throws MessagingException {
        String to = "frikha540@gmail.com"; // Adresse e-mail statique
        String subject = "Confirmation de réclamation";
        String text =
                "\n" +
                "Je vous remercie d'avoir pris le temps de nous faire part de votre réclamation . Votre feedback est crucial pour nous aider à améliorer notre environnement de travail.\n" +
                "\n" +
                "Je tiens à vous assurer que nous prenons cette question très au sérieux. Actuellement, notre équipe RH examine attentivement votre réclamation afin de comprendre les détails et de trouver la meilleure solution possible.\n" +
                "\n" +
                "Nous comprenons l'importance de traiter rapidement cette situation et nous nous efforçons de fournir une réponse dans les plus brefs délais. Votre patience pendant cette période est grandement appréciée.\n" +
                "\n" +
                "Je vous tiendrai informé(e) de tout progrès concernant votre réclamation. En attendant, n'hésitez pas à me contacter si vous avez des questions ou des préoccupations supplémentaires.\n" +
                "\n" +
                "Merci encore pour votre compréhension et votre coopération.\n" +
                "\n" +
                "Cordialement,";

        // Envoyer l'e-mail
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);

        emailSender.send(message);
    }

    @GetMapping("/getFeedbackId/{id}")
    public Feedback getFeedbackId(@PathVariable("id") long id){

        return iGestionFeedback.retrieveFeedback(id);
    }
    @DeleteMapping("/deleteID/{id}")
    public  void delete(@PathVariable("id") long id){
        iGestionFeedback.removeFeedback(id);
    }
    @PutMapping ("/updateFeedback")
    public Feedback updateFeedback(@RequestBody  Feedback feedback){
        return iGestionFeedback.addorUpdateFeedback(feedback);
    }
    @GetMapping("/searchReclamation")
    List<Feedback> searchReclamation(@RequestParam(value = "keyword") String keyword) {
        List<Feedback> allReclamations = iGestionFeedback.retrieveAllFeeddbacks();
        return allReclamations.stream()
                .filter(story ->
                        story.getDescriptionReclamation().toLowerCase().contains(keyword.toLowerCase()) ||
                                story.getName().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }

}
