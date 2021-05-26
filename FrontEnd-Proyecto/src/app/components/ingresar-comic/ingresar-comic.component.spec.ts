import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarComicComponent } from './ingresar-comic.component';

describe('IngresarComicComponent', () => {
  let component: IngresarComicComponent;
  let fixture: ComponentFixture<IngresarComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarComicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
