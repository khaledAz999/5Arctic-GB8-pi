package tn.esprit.pi.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import tn.esprit.pi.entities.Feedback;
import tn.esprit.pi.repository.IFeedbackRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class GestionFeedbackImplTest {

    @Autowired
    private GestionFeedbackImpl gestionFeedback;

    @MockBean
    private IFeedbackRepository feedbackRepository;

    @Test
    @Order(1)
    void testRetrieveAllFeedbacks() {
        List<Feedback> feedbackList = new ArrayList<>();
        feedbackList.add(new Feedback(1, "Feedback 1", "Description 1", LocalDate.now(), Feedback.CategorieType.positif));
        feedbackList.add(new Feedback(2, "Feedback 2", "Description 2", LocalDate.now(), Feedback.CategorieType.negatif));

        when(feedbackRepository.findAll()).thenReturn(feedbackList);

        List<Feedback> retrievedFeedbacks = gestionFeedback.retrieveAllFeeddbacks();
        Assertions.assertEquals(2, retrievedFeedbacks.size());
    }

    @Test
    @Order(2)
    void testAddOrUpdateFeedback() {
        Feedback feedback = new Feedback(1, "New Feedback", "New Description", LocalDate.now(), Feedback.CategorieType.neutre);

        when(feedbackRepository.save(feedback)).thenReturn(feedback);

        Feedback savedFeedback = gestionFeedback.addorUpdateFeedback(feedback);
        Assertions.assertNotNull(savedFeedback);
        Assertions.assertEquals("New Feedback", savedFeedback.getName());
    }

    @Test
    @Order(3)
    void testRetrieveFeedback() {
        Feedback feedback = new Feedback(1, "Feedback 1", "Description 1", LocalDate.now(), Feedback.CategorieType.positif);

        when(feedbackRepository.findById(1L)).thenReturn(Optional.of(feedback));

        Feedback retrievedFeedback = gestionFeedback.retrieveFeedback(1L);
        Assertions.assertNotNull(retrievedFeedback);
        Assertions.assertEquals("Feedback 1", retrievedFeedback.getName());
    }

    @Test
    @Order(4)
    void testRemoveFeedback() {
        Feedback feedback = new Feedback(1, "Feedback 1", "Description 1", LocalDate.now(), Feedback.CategorieType.positif);

        when(feedbackRepository.findById(1L)).thenReturn(Optional.of(feedback));

        // Call the remove method
        gestionFeedback.removeFeedback(1L);

        // Verify that the delete method was called
        verify(feedbackRepository, times(1)).delete(feedback);
    }
}
