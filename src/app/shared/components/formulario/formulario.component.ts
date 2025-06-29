import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'formulario-cadastro',
  imports: [NzInputModule, NzIconModule, NzSelectModule, NzButtonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  cliente: Cliente = Cliente.novoCliente();

  constructor(private clienteService: ClienteService) {}
  
  async submit() {
    const salvou = await this.clienteService.salvarCliente(this.cliente);
    if(salvou) {
      this.cliente = Cliente.novoCliente();
      alert('Cliente salvo com sucesso')
    };    
  }
}
