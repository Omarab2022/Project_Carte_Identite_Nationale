package com.SI.SI.Services;


public interface EmailService {
    void sendStatusUpdateEmail(String to, String subject, String body);
}
