import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from './formulario/formulario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  titulo = 'CRUD de Productos';
  
  // Lista de productos
  productos = [
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', descripcion: 'Descripción 3', precio: 300 }
  ];

  productoParaEditar: any = null;

  guardarProducto(producto: any) {
    if (producto.id) {
      // Actualizar
      const index = this.productos.findIndex(p => p.id === producto.id);
      if (index !== -1) {
        this.productos[index] = producto;
      }
    } else {
      // Agregar nuevo
      const nuevoId = this.productos.length > 0 
        ? Math.max(...this.productos.map(p => p.id)) + 1 
        : 1;
      this.productos.push({
        id: nuevoId,
        ...producto
      });
    }
    this.productoParaEditar = null;
  }

  editarProducto(producto: any) {
    this.productoParaEditar = { ...producto };
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productos = this.productos.filter(p => p.id !== id);
    }
  }

  cancelarEdicion() {
    this.productoParaEditar = null;
  }
}