import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.page.html',
  styleUrls: ['./frame.page.scss'],
})
export class FramePage implements OnInit {

  public appPages = [
    { title: 'Home', url: '', icon: 'home' },
    { title: 'Clientes', url: 'cliente', icon: 'people' }
  ];

  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goToPage(page: string) {
    this.menuCtrl.close();
    this.navCtrl.navigateRoot(page);
  }

}
