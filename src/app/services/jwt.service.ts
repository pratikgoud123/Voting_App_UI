import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor() { }

  public getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  public destroyToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }
  
}