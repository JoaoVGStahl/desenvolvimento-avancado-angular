import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { CustomValidators } from 'ngx-custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];

  loginForm: FormGroup;
  usuario: Usuario;
  returnUrl: string;

  validationMessage: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.validationMessage = {
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
    this.genericValidator = new GenericValidator(this.validationMessage);
  }
  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.loginForm);
    });
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


