import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeMediaComponent } from './poke-media.component';

describe('PokeMediaComponent', () => {
  let component: PokeMediaComponent;
  let fixture: ComponentFixture<PokeMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeMediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
