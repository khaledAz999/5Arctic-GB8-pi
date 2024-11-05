package tn.esprit.pi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Evenement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nomEvenement;
    private String lieuEvenement;
    private String actionEvenement;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    @Enumerated(EnumType.STRING)
    private Event_type eventType;
    @ManyToMany
    @JsonIgnore
    private List<Utilisateur> utilisateurs;
    @ManyToMany
    @JsonIgnore
    private List<Club> clubs;
    /*@OneToMany(mappedBy = "evenement")
    private List<Feedback>feedbacks;*/
    @ManyToMany(mappedBy ="evenements")
    private List<Sponsors> sponsors;
    @OneToMany(mappedBy = "evenement")
    private List<Logistique> logistiques;

}
