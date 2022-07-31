import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLeafletLocateComponent } from './ngx-leaflet-locate.component';

describe('NgxLeafletLocateComponent', () => {
  let component: NgxLeafletLocateComponent;
  let fixture: ComponentFixture<NgxLeafletLocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxLeafletLocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxLeafletLocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
