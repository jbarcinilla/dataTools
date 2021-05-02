import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dataToolsFront';
  departamentos = [];
  paises = [];
  ciudades = [];
  formRegEmpresa: FormGroup;
  constructor(public fb: FormBuilder, private toastr: ToastrService) {
    this.formRegEmpresa = this.fb.group({
      tipoDoc: ['', [Validators.required]],
      nroDoc: ['', [Validators.required]],
      nombEmpresa: ['', [Validators.required]],
      dirEmpresa: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      departamentos: ['', [Validators.required]],
      ciudades: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.paises = [
      { 'codpais': '57', 'nombrepais': 'Colombia' },
    ]
    this.departamentos = [
      { 'codPais': '57', 'codDepartamento': '1', 'nombreDepartamento': 'Amazonas' },
      { 'codPais': '57', 'codDepartamento': '2', 'nombreDepartamento': 'Antioquia' },
    ]
    this.ciudades = [
      { 'codciudad': '101', 'coddepartamento': '1', 'nombre': 'La chorrera' },
      { 'codciudad': '102', 'coddepartamento': '1', 'nombre': 'Leticia' },
      { 'codciudad': '103', 'coddepartamento': '1', 'nombre': 'Mirití-Paraná' },
      { 'codciudad': '104', 'coddepartamento': '1', 'nombre': 'Puerto Alegría' },
      { 'codciudad': '105', 'coddepartamento': '1', 'nombre': 'Tarapacá' },
      { 'codciudad': '106', 'coddepartamento': '1', 'nombre': 'El Encanto' },
      { 'codciudad': '201', 'coddepartamento': '2', 'nombre': 'Medellin' },
      { 'codciudad': '202', 'coddepartamento': '2', 'nombre': 'Bello' },
      { 'codciudad': '203', 'coddepartamento': '2', 'nombre': 'Itagüí' },
      { 'codciudad': '204', 'coddepartamento': '2', 'nombre': 'Envigado' },
      { 'codciudad': '205', 'coddepartamento': '2', 'nombre': 'Apartadó' },
      { 'codciudad': '206', 'coddepartamento': '2', 'nombre': 'Caucasia' },
      { 'codciudad': '207', 'coddepartamento': '2', 'nombre': 'Rionegro' },
      { 'codciudad': '208', 'coddepartamento': '2', 'nombre': 'Chigorodó' },
      { 'codciudad': '209', 'coddepartamento': '2', 'nombre': 'Turbo' },
    ]

  }

  buscarDepartamentoPorPais() {
    const codPais = this.formRegEmpresa.get('pais').value;
    this.departamentos = this.departamentos.filter(departamentos => departamentos.codPais === codPais);
    console.table(this.departamentos);
    return this.departamentos
  }

  buscarCiudadPorPais() {
    const codDep = this.formRegEmpresa.get('departamentos').value;
    this.ciudades = this.ciudades.filter(ciudades => ciudades.coddepartamento === codDep);
    console.table(this.ciudades);
    return this.ciudades;
  }

  private async guardarEmpresa(empresa:any) {
    const options = {
      method: 'POST',
      body: JSON.stringify(empresa),
      headers: new Headers({
        'content-type': 'application/json',
       /* 'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'*/
        
      }),
    };
    const response = await fetch(environment.url + 'guardarEmpresa', options);
    return await response.json();
  }

  submit() {
    if (this.formRegEmpresa.valid) {
      console.log(this.formRegEmpresa.value);
      this.guardarEmpresa(this.formRegEmpresa.value).then((respuesta) => {
       if (respuesta>0){
         this.showSuccess('Empresa Registrada con exito....','Registro');
        }
      }).catch(error => console.error(error));
    }
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }


}
