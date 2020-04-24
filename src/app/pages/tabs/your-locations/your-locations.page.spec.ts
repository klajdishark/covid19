import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourLocationsPage } from './your-locations.page';

describe('YourLocationsPage', () => {
  let component: YourLocationsPage;
  let fixture: ComponentFixture<YourLocationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourLocationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourLocationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
