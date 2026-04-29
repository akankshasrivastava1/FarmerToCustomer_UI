import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNavigation } from './master-navigation';

describe('MasterNavigation', () => {
  let component: MasterNavigation;
  let fixture: ComponentFixture<MasterNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
