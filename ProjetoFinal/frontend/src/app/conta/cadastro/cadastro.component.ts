import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-components/form.base.components';

@Component({
  selector: 'app-cadastro', 
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];

  cadastroForm: FormGroup;
  usuario: Usuario;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router,
    private toastr: ToastrService) {
      super();
    this.validationMessages = {
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

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }
  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
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
          next => {this.processarSucesso(next)},
          error => {this.processarFalha(error)}
        );
        this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response : any){
    this.cadastroForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toast = this.toastr.success('Cadastro realizado com sucesso!','Bem-vindo!');
    if(toast){
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      })
    }
    
  }
  processarFalha(fail : any){
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa! :(');
  }

}
