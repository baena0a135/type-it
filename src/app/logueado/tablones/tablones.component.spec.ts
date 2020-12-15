import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablonesComponent } from './tablones.component';

describe('TablonesComponent', () => {
  let component: TablonesComponent;
  let fixture: ComponentFixture<TablonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
