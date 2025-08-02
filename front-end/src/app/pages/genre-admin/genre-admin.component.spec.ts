import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAdminComponent } from './genre-admin.component';

describe('GenreAdminComponent', () => {
  let component: GenreAdminComponent;
  let fixture: ComponentFixture<GenreAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
