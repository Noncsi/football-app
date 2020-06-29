import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchInContainerComponent } from './match-in-container.component';

describe('MatchInContainerComponent', () => {
  let component: MatchInContainerComponent;
  let fixture: ComponentFixture<MatchInContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchInContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchInContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
