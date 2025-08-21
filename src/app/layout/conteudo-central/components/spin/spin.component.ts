import { Component } from '@angular/core';

import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-spin',
  imports: [NzSpinModule],
  template: `<nz-spin nzSize="small" nzSimple></nz-spin>`,
})
export class SpinComponent {}
