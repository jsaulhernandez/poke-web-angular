import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSelectedPokemonsComponent } from './edit-selected-pokemons.component';

describe('EditSelectedPokemonsComponent', () => {
  let component: EditSelectedPokemonsComponent;
  let fixture: ComponentFixture<EditSelectedPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSelectedPokemonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSelectedPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
