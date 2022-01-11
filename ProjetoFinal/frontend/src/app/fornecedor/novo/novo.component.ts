import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil'

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { CepConsulta } from '../models/endereco';
import { StringUtils } from 'src/app/utils/string-utils';



@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  fornecedorForm: FormGroup;
  fornecedor: Fornecedor = new Fornecedor();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento: string = "CNPJ (requerido)";

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService) {

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cnpj: 'CNPJ em formato inválido',
        cpf: 'CPF em formato inválido'
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido',
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    this.fornecedorForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cnpj]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],
      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required, NgBrazilValidators.cep]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })
    });

    this.fornecedorForm.patchValue({
      tipoFornecedor: '2', ativo: true
    })
  }

  ngAfterViewInit(): void {

    this.tipoFornecedorForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      this.configurarElementosValidacao();
      this.validarFormulario();
    });

    this.configurarElementosValidacao();
  }

  trocarValidacaoDocumento() {

    if (this.tipoFornecedorForm().value === "1") {
      this.documento().clearAsyncValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf])
      this.textoDocumento = "CPF (Requerido)";
    } else {
      this.documento().clearAsyncValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj])
      this.textoDocumento = "CNPJ (Requerido)"
    }
  }

  configurarElementosValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    })
  }
  validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
    this.mudancasNaoSalvas = true;
  }


  tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('tipoFornecedor');
  }
  documento(): AbstractControl {
    return this.fornecedorForm.get('documento');
  }

  adicionarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {
      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);
      this.formResult = JSON.stringify(this.fornecedor);

      this.fornecedor.endereco.cep = StringUtils.somenteNumeros(this.fornecedor.endereco.cep);
      this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);

      this.fornecedorService.novoFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.fornecedorForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedor/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  buscaCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if(cep.length < 8) return;

    this.fornecedorService.consultaCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro)
      );
  }
  preencherEnderecoConsulta(cepConsulta: CepConsulta) {
    this.fornecedorForm.patchValue({
      endereco: {
        cep : cepConsulta.cep,
        logradouro: cepConsulta.logradouro,
        bairro : cepConsulta.bairro,
        cidade : cepConsulta.localidade,
        estado : cepConsulta.uf
      }
    })
  }
}