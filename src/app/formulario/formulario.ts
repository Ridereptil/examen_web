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

  producto = { id: 0, nombre: '', descripcion: '' };
  esEdicion = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productoEdit'] && this.productoEdit) {
      this.producto = { ...this.productoEdit };
      this.esEdicion = true;
    }
  }

  onSubmit() {
    if (this.producto.nombre && this.producto.descripcion) {
      this.guardarProducto.emit(this.producto);
      this.reset();
    }
  }

  cancelar() {
    this.reset();
    this.cancelarEdicion.emit();
  }

  reset() {
    this.producto = { id: 0, nombre: '', descripcion: '' };
    this.esEdicion = false;
  }
}