import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BarComponent } from "./bar.component";
import { BarUnidadeconfig, BAR_UNIDADE_CONFIG } from "./bar.config";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BarComponent
    ],
    exports: [
        BarComponent
    ]
})
export class BarModule {
    static forRoot(config : BarUnidadeconfig): ModuleWithProviders{
        return {
            ngModule: BarModule,
            providers:[
                {
                    provide: 'ConfigManualUnidade', useValue: config
                },
                {
                    provide: BAR_UNIDADE_CONFIG, useValue: config
                }
            ]
        }
    }

    static forChild(){
    }
 }