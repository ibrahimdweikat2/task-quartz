import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToTableComponent } from './add-to-table.component';

describe('AddToTableComponent', () => {
  let component: AddToTableComponent;
  let fixture: ComponentFixture<AddToTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
