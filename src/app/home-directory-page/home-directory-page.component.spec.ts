import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDirectoryPageComponent } from './home-directory-page.component';

describe('HomeDirectoryPageComponent', () => {
  let component: HomeDirectoryPageComponent;
  let fixture: ComponentFixture<HomeDirectoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDirectoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDirectoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
