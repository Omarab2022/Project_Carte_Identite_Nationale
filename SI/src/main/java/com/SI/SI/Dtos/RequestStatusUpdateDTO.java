package com.SI.SI.Dtos;

// src/main/java/com/yourapp/dto/RequestStatusUpdateDTO.java

import com.SI.SI.Enums.RequestStatus;

import java.time.LocalDate;

public class RequestStatusUpdateDTO {
    private RequestStatus status;
    private LocalDate policeCenterDate;

    // Getters and Setters
    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public LocalDate getPoliceCenterDate() {
        return policeCenterDate;
    }

    public void setPoliceCenterDate(LocalDate policeCenterDate) {
        this.policeCenterDate = policeCenterDate;
    }
}
