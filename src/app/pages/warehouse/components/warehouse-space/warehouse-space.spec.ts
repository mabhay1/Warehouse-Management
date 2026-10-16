import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarehouseSpace } from './warehouse-space';

describe('WarehouseSpace', () => {
  let component: WarehouseSpace;
  let fixture: ComponentFixture<WarehouseSpace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseSpace],
    }).compileComponents();

    fixture = TestBed.createComponent(WarehouseSpace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
