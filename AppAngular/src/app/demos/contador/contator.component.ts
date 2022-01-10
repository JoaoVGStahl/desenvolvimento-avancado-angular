import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container main-container">
    <h1>Contador</h1>
    <div class="contator">
      <div>
        <div 
          (keydown)="onKeyUp($event)"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)"
          tabindex="0">
          <p>{{ valor }}</p>
          <div tabindex="-1">
            <button type="button" tabindex="-1" (click)="incrementar()" [disabled]="valor === max">
              +
            </button>
            <button type="button" tabindex="-1" (click)="decrementar()" [disabled]="valor === min">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class ContadorComponent {
  @Input() passo: number = 1;
  @Input() min: number = 0;
  @Input() max: number = 100;

  @Output() alterado = new EventEmitter<number>();

  valor: number = 0;
  foco: boolean;

  incrementar() {
    if (this.valor < this.max) {
      this.valor = this.valor + this.passo;
      this.alterado.emit(this.valor);
    }
  }

  decrementar() {
    if (this.valor > this.min) {
      this.valor = this.valor - this.passo;
      this.alterado.emit(this.valor);
    }
  }

  onBlur(event: FocusEvent) {
    this.foco = false;
    event.preventDefault();
    event.stopPropagation();
  }

  onKeyUp(event: KeyboardEvent) {
    let handlers = {
      ArrowDown: () => this.decrementar(),
      ArrowUp: () => this.incrementar()
    };

    if (handlers[event.code]) {
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  onFocus(event: FocusEvent) {
    this.foco = true;
    event.preventDefault();
    event.stopPropagation();
  }
}