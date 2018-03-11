import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApiProvider {

  private baseUrl = 'https://angular2-course-c77b6.firebaseio.com/';
  private currentTournament: any = {};

  constructor(public http: Http) {
    //console.log('Hello EliteApiProvider Provider');
  }

  getTournaments() {
    return new Promise( resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
        .subscribe( res => resolve(res.json()));
    });
  }

  getTournamentData(tournamentId) : Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
      .map( response => {
        this.currentTournament = response.json();
        return this.currentTournament;
      });
  }

  getCurrentTournament() {
    return this.currentTournament;
  }

}
