import {  Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { CustomValidators } from 'ngx-custom-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-components/form.base.components';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];

  loginForm: FormGroup;
  usuario: Usuario;
  returnUrl: string;


  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router,
    private route: ActivatedRoute,
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
      }
    };
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    super.configurarMensagensValidacaoBase(this.validationMessages)
  }
  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.loginForm)
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([8, 100])]]
    })
  }
  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value)

      this.contaService.login(this.usuario)
        .subscribe(
          next => { this.processarSucesso(next) },
          error => { this.processarFalha(error) }
        );
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toast = this.toastr.success('Login realizado com sucesso!', 'Bem-vindo!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.returnUrl
          ? this.router.navigate([this.returnUrl])
          : this.router.navigate(['/home']);
      })
    }

  }
  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa! :(');
  }

}


