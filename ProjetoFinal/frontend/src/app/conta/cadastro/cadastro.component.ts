import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { CustomValidators } from 'ngx-custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];

  cadastroForm: FormGroup;
  usuario: Usuario;

  validationMessage: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService) {
    this.validationMessage = {
      email: {
        required: 'Informe o Email',
        email: 'Email Inválido'
      },
      password: {
        required: 'Informa a senha',
        rangeLength: 'A senha deve possuir entre 8 e 100 caracteres'
      },
      confirmPassword: {
        required: 'Informa a senha novamente',
        rangeLength: 'A senha deve possuir entre 8 e 100 caracteres',
        equalTo: 'As senhas são diferentes'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessage);
  }
  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([8, 100])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([8, 100]), CustomValidators.equalTo(senha)]);
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm
    })
  }
  adicionarConta() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)

      this.contaService.cadastrarUsuario(this.usuario)
        .subscribe(
          successo => {this.processarSucesso(successo)},
          falha => {this.processarFalha(falha)}
        );
    }
  }

  processarSucesso(response : any){
    
  }
  processarFalha(response : any){

  }

}
