import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injector, NgZone, OnInit } from '@angular/core';
import { BarUnidadeconfig, BAR_UNIDADE_CONFIG } from './bar.config';
import { BarFactory, BarServices, BarServicesMock, BebidaService } from './bar.service';

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
    },
    {
      provide: BebidaService, useExisting: BarServices
    }
  ]
})
export class BarComponent implements OnInit {

  barBebida1: string;
  barBebida2: string;
  apiConfigManual: BarUnidadeconfig;
  apiConfig: BarUnidadeconfig;
  dadosUnidade: string;
  
  

  constructor(
    private _barServices: BarServices,
    @Inject('ConfigManualUnidade') private _apiConfigManual: BarUnidadeconfig,
    @Inject(BAR_UNIDADE_CONFIG) private _apiConfig: BarUnidadeconfig,
    private _bebidaService : BebidaService,
    private ngZone: NgZone  
  ) { }

  ngOnInit() {
    this.barBebida1 = this._barServices.obterBebidas();
    this.apiConfigManual = this._apiConfigManual;
    this.apiConfig = this._apiConfig;

    this.dadosUnidade = this._barServices.obterUnidade();
    this.barBebida2 = this._bebidaService.obterBebidas();
  }

  public progress : number = 0;
  public label: string;

  processWithinAngularZone(){
    this.label = 'dentro';
    this.progress = 0;
    this._increasseProgress(() => console.log('Finalizado por dentro!'));
  }

  processOutsideOfAngularZone(){
    this.label = 'fora';
    this.progress = 0;
    this.ngZone.runOutsideAngular(() =>{
      this._increasseProgress(()=>{
        this.ngZone.run(() =>{
          console.log('Finalizado por fora!');
        })
      })
    })
  }

  _increasseProgress(doneCallback: () => void){
    this.progress += 1;

    console.log(`Processo Atual: ${this.progress}%`);
    if(this.progress < 100){
      window.setTimeout(() => this._increasseProgress(doneCallback), 10);
    }else{
      doneCallback();
    }
  }

}
