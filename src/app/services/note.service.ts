import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, retry, throwError } from 'rxjs';
import { Note, NoteCreate } from '../interfaces/Note';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = "http://127.0.0.1:8000/api"

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getNotes(search: string = ''): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl + `/notes`, {
      params: new HttpParams({
        fromObject: {
          search
        }
      })
    }).pipe(
      delay(1500),
      retry(1),
      catchError(this.errorHandler.bind(this)),
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }

  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(this.apiUrl + `/notes/${id}`)
  }

  deleteNote(id: number): Observable<string> {
    return this.http.delete<string>(this.apiUrl + `/notes/${id}`)
  }

  createNote(note: any): Observable<Note> {
    return this.http.post<Note>(this.apiUrl + `/notes`, note)
  }

  updateNote(note: Note, data: any): Observable<Note> {
    return this.http.post<Note>(this.apiUrl + `/notes/${note.id}`, data)
  }


}
