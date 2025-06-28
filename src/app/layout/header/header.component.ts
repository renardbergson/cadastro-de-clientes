import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NzLayoutModule, NzMenuModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
