package tn.esprit.pi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pi.entities.Utilisateur;
import tn.esprit.pi.services.IGestionUtilisateur;

import java.util.List;

@RestController

@RequestMapping("/utilisateur")
public class UtilisateurController {
    @Autowired
    IGestionUtilisateur iGestionUtilisateur;
    @GetMapping("/getAll")
    public List<Utilisateur> getAll(){
        return iGestionUtilisateur.retrieveAllUtilisateurs();
    }
    @PostMapping("/ajout")
    public Utilisateur ajoutUtilisateur(@RequestBody Utilisateur utilisateur){
        return iGestionUtilisateur.addorUpdateUtilisateur(utilisateur);
    }
    @GetMapping("/getUtilisateurId/{id}")
    public Utilisateur getUtilisateurId(@PathVariable("id") long id){

        return iGestionUtilisateur.retrieveUtilisateur(id);
    }
    @DeleteMapping("/deleteID/{id}")
    public  void delete(@PathVariable("id") long id){
        iGestionUtilisateur.removeUtilisateur(id);
    }
    @PutMapping ("/updateUtilisateur")
    public Utilisateur updateUtilisateur(@RequestBody  Utilisateur utilisateur){
        return iGestionUtilisateur.addorUpdateUtilisateur(utilisateur);
    }
}
