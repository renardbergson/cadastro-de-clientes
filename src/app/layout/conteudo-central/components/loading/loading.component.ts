import { Component, Input } from '@angular/core';

import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-loading',
  imports: [NzSpinModule],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  @Input() mensagem: string = '';
}
