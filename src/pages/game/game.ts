import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';

import { EliteApiProvider } from '../../providers/elite-api/elite-api';


@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  public game: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApiProvider ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad GamePage');
    this.game = this.navParams.data;
  }

  teamTapped(teamId) {
    let tournamentData = this.eliteApi.getCurrentTournament();
    let team = tournamentData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);

  }

}
