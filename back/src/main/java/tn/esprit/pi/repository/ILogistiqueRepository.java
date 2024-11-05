package tn.esprit.pi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Logistique;

@Repository
public interface ILogistiqueRepository extends CrudRepository<Logistique,Long> {
}
