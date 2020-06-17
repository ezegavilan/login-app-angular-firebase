import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  recordarme: boolean = false;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  onSubmit( form: NgForm ){
    if ( form.invalid ){
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere porfavor...'
    });
    Swal.showLoading();

    this.auth.registrarUsuario(this.usuario)
    .subscribe( resp => {
      Swal.close();
      if ( this.recordarme ){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigate(['home']);
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear cuenta',
        text: err.error.error.message
      });
    }
    );
  }


}
