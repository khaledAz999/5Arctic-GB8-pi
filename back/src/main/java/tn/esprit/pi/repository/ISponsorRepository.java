package tn.esprit.pi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Sponsors;

@Repository
public interface ISponsorRepository extends CrudRepository<Sponsors,Long> {
}
