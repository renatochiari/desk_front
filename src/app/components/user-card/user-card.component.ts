import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { SecurityUtil } from 'src/app/util/security.util';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  public usuario: UsuarioModel = null;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.usuario = SecurityUtil.get();
  }

  logOut() {
    SecurityUtil.clear();
    this.navCtrl.navigateRoot('/login');
  }

}
