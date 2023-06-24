package web.mjob.services;

public interface EmailService {
    void sendSimpleMailApproved(String primaoc, Integer brojClanskeKarte);

    void sendSimpleMailDeleted(String recipient) ;
    void sendSimpleMailNotApproved(String recipient);
    void sendSimpleMailAboutReactivation(String recipient)  ;
}
