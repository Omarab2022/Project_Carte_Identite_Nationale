package com.SI.SI.Services.ServiceImpl;

import com.SI.SI.Services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Override
    public void sendStatusUpdateEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("your-verified-email@gmail.com"); // Explicitly set FROM address
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            logger.info("Email sent successfully to: " + to);
        } catch (MailException e) {
            logger.error("Failed to send email to: " + to, e);
            // You might want to implement a retry mechanism or store failed emails
            throw new RuntimeException("Email sending failed", e);
        }
    }
}
