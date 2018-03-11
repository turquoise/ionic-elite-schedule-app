import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TeamsPage } from '../teams/teams';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  public tournaments: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApiProvider,
    public loadingController: LoadingController ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TournamentsPage');
    let loader = this.loadingController.create({
      content: 'Getting tournaments...'
      //spinner: 'dots'
    });
    loader.present().then( () => {
      this.eliteApi.getTournaments().then( data => {
        this.tournaments = data;
        loader.dismiss();
      });
    });

  }

  itemTapped($event, tournament) {
    //this.nav.pop();
    this.nav.push(TeamsPage, tournament);
  }

}
