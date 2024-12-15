// request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { Observable, of, throwError } from 'rxjs';
import { RequestDTO } from '../Models/request.model';
import { RequestStatus } from '../Models/request-status.enum';
import { catchError, map, tap } from 'rxjs/operators';
import { RequestStatusUpdateDTO } from '../Models/request-status-update.dto';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) { }

  // Get all requests
  getAllRequests(): Observable<RequestDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<RequestDTO[]>(this.apiUrl, { headers });
  }

  updateRequestStatus(id: number, statusUpdate: RequestStatusUpdateDTO): Observable<RequestDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<RequestDTO>(`${this.apiUrl}/${id}/status`, statusUpdate, { headers });
  }

  getRequestByNumeroPreDemande(numeroPreDemande: string): Observable<RequestDTO | null> {
    const url = `${this.apiUrl}/search/numero`;
    return this.http.get<RequestDTO>(url, {
      params: { numeroPreDemande: numeroPreDemande }
    }).pipe(
      map(request => request || null),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          console.warn(`No request found for numero pre-demande: ${numeroPreDemande}`);
          return of(null);
        }
        return throwError(err);
      })
    );
  }
  createRequest(requestDTO: RequestDTO): Observable<RequestDTO> {
    console.log('Sending Request DTO:', requestDTO);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<RequestDTO>(this.apiUrl, requestDTO, { headers }).pipe(
      catchError((error) => {
        console.error('HTTP Error:', error);
        return throwError(error);
      })
    );
  }


  getRequestByCIN(cin: string): Observable<RequestDTO | null> {
    const url = `${this.apiUrl}/search/cin?cin=${cin}`;
    console.log('Searching CIN URL:', url); // Log the exact URL being called
    return this.http.get<RequestDTO>(url).pipe(
      tap(request => console.log('CIN Search Result:', request)), // Log the result
      map(request => request || null),
      catchError((err: HttpErrorResponse) => {
        console.error('CIN Search Error:', err); // Log any errors
        if (err.status === 404) {
          return of(null);
        }
        return throwError(err);
      })
    );
  }

  getRequestById(id: number): Observable<RequestDTO | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RequestDTO>(url).pipe(
      map(request => request || null),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          return of(null);
        }
        return throwError(err);
      })
    );
  }

  // Nouvelle méthode pour mettre à jour une demande
  updateRequest(id: number, requestDTO: RequestDTO): Observable<RequestDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<RequestDTO>(url, requestDTO, { headers });
  }


}
