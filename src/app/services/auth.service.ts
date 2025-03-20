import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// You can manage environment configs like this (Optional)
const BASE_API_URL =
  'https://noderqkdrxlu-w2pg--3000--5a421e5b.local-credentialless.webcontainer.io';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Register new user
   * @param user - user registration data
   */
  register(user: any): Observable<any> {
    const url = `${BASE_API_URL}/register`;

    return this.http
      .get(url)
      .pipe(catchError((error) => this.handleError(error)));

    // return this.http
    //   .post(url, user, this.getHttpOptions())
    //   .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Login user
   * @param credentials - user login credentials
   */
  login(credentials: any): Observable<any> {
    const url = `${BASE_API_URL}/login`;

    return this.http
      .post(url, credentials, this.getHttpOptions())
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Get HTTP options with headers
   */
  private getHttpOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return {
      headers,
      // withCredentials: true, // Enable this if you're working with cookies/sessions
    };
  }

  /**
   * Handle errors from HTTP requests
   * @param error - HTTP error response
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMsg = `Error Code: ${error.status}\nMessage: ${
        error.error?.error || error.message
      }`;
    }

    console.error('[AuthService Error]', errorMsg);

    return throwError(() => new Error(errorMsg));
  }
}
