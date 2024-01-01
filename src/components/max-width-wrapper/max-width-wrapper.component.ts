import { Component,Input } from '@angular/core';

@Component({
  selector: 'max-width-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './max-width-wrapper.component.html',
  styleUrl: './max-width-wrapper.component.css'
})
export class MaxWidthWrapperComponent {
  @Input() className :string | undefined
}
