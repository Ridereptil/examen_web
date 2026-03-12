import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrls: ['./formulario.css']
})
export class FormularioComponent {
  @Input() productoEdit: any = null;
  @Output() guardarProducto = new EventEmitter<any>();
  @Output() cancelarEdicion = new EventEmitter<void>();

  producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0
  };

  esEdicion = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productoEdit'] && this.productoEdit) {
      this.producto = { ...this.productoEdit };
      this.esEdicion = true;
    }
  }

  onSubmit() {
    if (this.validarFormulario()) {
      this.guardarProducto.emit(this.producto);
      this.resetFormulario();
    }
  }

  cancelar() {
    this.resetFormulario();
    this.cancelarEdicion.emit();
  }

  resetFormulario() {
    this.producto = {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0
    };
    this.esEdicion = false;
  }

  validarFormulario(): boolean {
    return this.producto.nombre?.trim() !== '' && 
           this.producto.descripcion?.trim() !== '' && 
           this.producto.precio > 0;
  }
}