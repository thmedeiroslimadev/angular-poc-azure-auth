import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AzureAdServiceService {
  isUserLoggedIn: Subject<boolean> = new Subject<boolean>();
}
