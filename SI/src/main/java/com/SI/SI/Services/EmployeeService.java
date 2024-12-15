package com.SI.SI.Services;


import io.jsonwebtoken.Jwts;

public interface EmployeeService {
    String authenticate(String email, String password);
    public boolean validateToken(String token) ;
    public String getEmailFromToken(String token);
}
