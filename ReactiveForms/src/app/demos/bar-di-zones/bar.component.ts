import { Component, Inject, OnInit } from '@angular/core';
import { BarUnidadeconfig, BAR_UNIDADE_CONFIG } from './bar.config';
import { BarServices, BarServicesMock } from './bar.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  providers: [
    {
      provide: BarServices, useClass: BarServicesMock
    }
  ]
})
export class BarComponent implements OnInit {

  barBebida1: string;
  apiConfigManual : BarUnidadeconfig;
  apiConfig: BarUnidadeconfig;
  constructor(
    private _barServices: BarServices,
    @Inject('ConfigManualUnidade') private _apiConfigManual: BarUnidadeconfig,
    @Inject(BAR_UNIDADE_CONFIG) private _apiConfig: BarUnidadeconfig
    ) { }

  ngOnInit() {
    this.barBebida1 = this._barServices.obterBebidas();
    this.apiConfigManual = this._apiConfigManual;
    this.apiConfig = this._apiConfig;
  }

}
