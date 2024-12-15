package com.SI.SI.Dtos;


import com.SI.SI.Enums.RequestStatus;

import java.time.LocalDate;

public class RequestStatusUpdateDTO {
    private RequestStatus status;
    private LocalDate policeCenterDate;


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
