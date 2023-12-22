import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeLoaderComponent } from './poke-loader.component';

describe('PokeLoaderComponent', () => {
  let component: PokeLoaderComponent;
  let fixture: ComponentFixture<PokeLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
