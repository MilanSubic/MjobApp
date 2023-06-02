package web.mjob.services.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import web.mjob.services.EmailService;
@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private final JavaMailSender javaMailSender;
    @Value("${spring.mail.username}") private String sender;

    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    @Async
    public void sendSimpleMailApproved(String primaoc, Integer brojClanskeKarte)  {
        SimpleMailMessage mailMessage
                = new SimpleMailMessage();
        mailMessage.setFrom(sender);
        mailMessage.setTo(primaoc);
        String textMaila="Poštovani, \n\nVaš zahtjev za nalog je odobren, broj vaše članske karte je "+brojClanskeKarte+".\nDobro došli u MJob!\n\nSrdačan pozdrav,\nMJob admin tim";
        mailMessage.setText(textMaila);
        mailMessage.setSubject("Potvrda o registraciji");
        javaMailSender.send(mailMessage);
    }

    @Override
    @Async
    public void sendSimpleMailDeleted(String recipient) {

        SimpleMailMessage mailMessage
                = new SimpleMailMessage();
        mailMessage.setFrom(sender);
        mailMessage.setTo(recipient);
        String textMaila="Poštovani, \n\nVaš nalog je obrisan.\nAko smatrate da se radi o grešci, obratite se administratorskom timu putem e-maila!\n\nSrdačan pozdrav,\nMJob admin tim";
        mailMessage.setText(textMaila);
        mailMessage.setSubject("Brisanje naloga");
        javaMailSender.send(mailMessage);

    }
    @Override
    @Async
    public void sendSimpleMailNotApproved(String recipient)  {

        SimpleMailMessage mailMessage
                = new SimpleMailMessage();
        mailMessage.setFrom(sender);
        mailMessage.setTo(recipient);
        String textMaila="Poštovani, \n\nVaš zahtjev za nalog nije odobren.\nAko smatrate da se radi o grešci, obratite se administratorskom timu putem e-maila!\n\nSrdačan pozdrav,\nMJob admin tim";
        mailMessage.setText(textMaila);
        mailMessage.setSubject("Odbijen zahtjev");
        javaMailSender.send(mailMessage);

    }
    @Override
    @Async
    public void sendSimpleMailAboutReactivation(String recipient)  {

        SimpleMailMessage mailMessage
                = new SimpleMailMessage();
        mailMessage.setFrom(sender);
        mailMessage.setTo(recipient);
        String textMaila="Poštovani, \n\nVaš zahtjev za nalog je ponovo aktivan.\n\nSrdačan pozdrav,\nMJob admin tim";
        mailMessage.setText(textMaila);
        mailMessage.setSubject("Odbijen zahtjev");
        javaMailSender.send(mailMessage);

    }
}
