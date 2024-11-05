package tn.esprit.pi.entities;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Id;

@Embeddable
public class RecrutementId {

    private Long idClub;

    private Long idUtilisateur;
}
