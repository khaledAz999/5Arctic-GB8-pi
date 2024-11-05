    package tn.esprit.pi.services;

    import tn.esprit.pi.entities.Feedback;

    import java.util.List;

    public interface IGestionFeedback {
        public List<Feedback> retrieveAllFeeddbacks();

        public Feedback addorUpdateFeedback(Feedback feedback);

        public void removeFeedback(Long id);

        public Feedback retrieveFeedback(Long id);
    }