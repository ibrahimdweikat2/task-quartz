import { Component,Input } from '@angular/core';

@Component({
  selector: 'icons',
  standalone: true,
  imports: [],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.css'
})
export class IconsComponent {
  @Input() fill :string='#60a5fa'
  @Input() className : string | undefined 
}
