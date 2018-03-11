import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { MyTeamsPage } from '../my-teams/my-teams';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';
import 'rxjs/add/operator/map';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  public team: any = {};
  public games: any[];
  private tournamentData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApiProvider) {

  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    //console.log('this.team from team-details ', this.team);
    this.tournamentData = this.eliteApi.getCurrentTournament();
    this.games = _.chain(this.tournamentData.games)
                .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id )
                .map(g => {
                  let isTeam1 = (g.teamId === this.team.id);
                  let opponentName = isTeam1 ? g.team2 : g.team1;
                  let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                  return {
                    gameId: g.id,
                    opponent: opponentName,
                    time: Date.parse(g.time),
                    location: g.location,
                    locationUrl: g.locationUrl,
                    scoreDisplay: scoreDisplay,
                    homeAway: (isTeam1 ? "vs." : "at")
                  };
                })
                .value();
  }

  goHome() {
    //this.navCtrl.push(MyTeamsPage);
    console.log('parent ', this.navCtrl.parent );
    this.navCtrl.parent.parent.popToRoot();
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let opponentScore = (isTeam1 ? team2Score : team1Score);
      let winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }
  }

  gameClicked($event, game) {
    let sourceGame = this.tournamentData.games.find( g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

}
