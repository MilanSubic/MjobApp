package web.mjob.services;

public interface EmailService {
    void sendSimpleMailApproved(String recipient) throws Exception;

    void sendSimpleMailDeleted(String recipient) throws Exception;
    void sendSimpleMailNotApproved(String recipient) throws Exception;

}
