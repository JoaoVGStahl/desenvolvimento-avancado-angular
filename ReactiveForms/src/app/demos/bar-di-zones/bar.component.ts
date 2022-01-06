import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BarUnidadeconfig, BAR_UNIDADE_CONFIG } from './bar.config';
import { BarFactory, BarServices, BarServicesMock } from './bar.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  providers: [
    /* {
      provide: BarServices, useClass: BarServicesMock
    }, */
    {
      provide: BarServices, useFactory: BarFactory, deps: [
        HttpClient, Injector
      ]
    }
  ]
})
export class BarComponent implements OnInit {

  barBebida1: string;
  apiConfigManual : BarUnidadeconfig;
  apiConfig: BarUnidadeconfig;
  dadosUnidade: string;

  constructor(
    private _barServices: BarServices,
    @Inject('ConfigManualUnidade') private _apiConfigManual: BarUnidadeconfig,
    @Inject(BAR_UNIDADE_CONFIG) private _apiConfig: BarUnidadeconfig
    ) { }

  ngOnInit() {
    this.barBebida1 = this._barServices.obterBebidas();
    this.apiConfigManual = this._apiConfigManual;
    this.apiConfig = this._apiConfig;

    this.dadosUnidade = this._barServices.obterUnidade();
  }

}
