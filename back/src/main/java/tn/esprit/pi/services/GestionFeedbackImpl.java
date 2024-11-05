package tn.esprit.pi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi.entities.Feedback;
import tn.esprit.pi.entities.Utilisateur;
import tn.esprit.pi.repository.IFeedbackRepository;
import tn.esprit.pi.repository.IUtilisateurRepository;

import java.util.List;
@Service
public class GestionFeedbackImpl implements IGestionFeedback {
    @Autowired
    IFeedbackRepository feedbackRepository;
    public List<Feedback> retrieveAllFeeddbacks(){
        return (List<Feedback>) feedbackRepository.findAll();
    }
    public Feedback addorUpdateFeedback (Feedback feedback ){
        return feedbackRepository.save(feedback);
    }
    public void removeFeedback(Long id){
        feedbackRepository.delete(feedbackRepository.findById(id).get());
    }
    public Feedback retrieveFeedback (Long id){
        return feedbackRepository.findById(id).get();
    }

}
