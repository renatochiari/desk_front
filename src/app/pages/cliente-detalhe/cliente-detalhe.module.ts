import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteDetalhePageRoutingModule } from './cliente-detalhe-routing.module';

import { ClienteDetalhePage } from './cliente-detalhe.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteDetalhePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ClienteDetalhePage]
})
export class ClienteDetalhePageModule { }
