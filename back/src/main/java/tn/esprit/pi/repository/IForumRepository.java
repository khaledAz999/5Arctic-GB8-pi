package tn.esprit.pi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi.entities.Forum;

@Repository
public interface IForumRepository extends CrudRepository<Forum,Long> {
}
