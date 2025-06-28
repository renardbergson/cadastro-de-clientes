import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'formulario-cadastro',
  imports: [NzInputModule, NzIconModule, NzSelectModule, NzButtonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

}
