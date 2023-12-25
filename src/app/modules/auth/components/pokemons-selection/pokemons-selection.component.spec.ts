import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsSelectionComponent } from './pokemons-selection.component';

describe('PokemonsSelectionComponent', () => {
  let component: PokemonsSelectionComponent;
  let fixture: ComponentFixture<PokemonsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
