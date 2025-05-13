import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FieldPlacementComponent } from './field-positioner.component';

describe('FieldPlacementComponent', () => {
  let component: FieldPlacementComponent;
  let fixture: ComponentFixture<FieldPlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FieldPlacementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
