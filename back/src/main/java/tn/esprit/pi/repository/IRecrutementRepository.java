package tn.esprit.pi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Recrutement;

@Repository
public interface IRecrutementRepository extends CrudRepository<Recrutement,Long> {
}
