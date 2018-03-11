import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//import { TeamDetailPage } from '../team-detail/team-detail';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  
  public teams = [];
  // public teams = [
  //   { id: 1, name: 'HC Elite'},
  //   { id: 2, name: 'Team Takeover'},
  //   { id: 3, name: 'DC Thunder'}
  // ];



  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private eliteApi : EliteApiProvider
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TeamsPage');
    // reference to the actual tournament that was passed in.
    let selectedTournament = this.navParams.data;
    this.eliteApi.getTournamentData(selectedTournament.id)
      .subscribe( data => {
        this.teams = data.teams;
      });

  }

  itemTapped($event, team) {
    this.nav.push(TeamHomePage, team);
  }

}
