import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";


const admiRouterConfig : Routes = [
    {path : '', component: AdminDashboardComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(admiRouterConfig)
    ],
    exports:[
        RouterModule
    ]
})

export class AdminRoutingModule{}