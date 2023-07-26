import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ClienteListComponent } from "./cliente-list/cliente-list.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { UserCardComponent } from "./user-card/user-card.component";

@NgModule({
    declarations: [
        NavbarComponent,
        UserCardComponent,
        ClienteListComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        NavbarComponent,
        UserCardComponent,
        ClienteListComponent
    ]
})
export class ComponentsModule { }