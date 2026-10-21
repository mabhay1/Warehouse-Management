import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyModelPopup } from './my-model-popup';

describe('MyModelPopup', () => {
  let component: MyModelPopup;
  let fixture: ComponentFixture<MyModelPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyModelPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(MyModelPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
