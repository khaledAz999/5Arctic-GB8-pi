package tn.esprit.pi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi.entities.Utilisateur;
import tn.esprit.pi.repository.IUtilisateurRepository;

import java.util.List;
@Service
public class GestionUtilisateurImpl implements IGestionUtilisateur{
    @Autowired
    IUtilisateurRepository utilisateurRepository;
    public List<Utilisateur> retrieveAllUtilisateurs(){
        return (List<Utilisateur>) utilisateurRepository.findAll();
    }
    public Utilisateur addorUpdateUtilisateur (Utilisateur utilisateur ){
        return utilisateurRepository.save(utilisateur);
    }
    public void removeUtilisateur (Long idUtilisateur){
        utilisateurRepository.delete(utilisateurRepository.findById(idUtilisateur).get());
    }
    public Utilisateur retrieveUtilisateur (Long idUtilisateur){
        return utilisateurRepository.findById(idUtilisateur).get();
    }
}
