import { Component } from '@angular/core';
import { MaxWidthWrapperComponent } from '../max-width-wrapper/max-width-wrapper.component';
import { IconsComponent } from '../icons/icons.component';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [MaxWidthWrapperComponent,IconsComponent,HlmButtonDirective,RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
