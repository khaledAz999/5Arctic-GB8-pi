package tn.esprit.pi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Categorie_sponsor;

@Repository
public interface ICategorie_sponsorRepository extends CrudRepository<Categorie_sponsor,Long> {
}
