import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingEmailComponent } from './marketing-email.component';

describe('MarketingEmailComponent', () => {
  let component: MarketingEmailComponent;
  let fixture: ComponentFixture<MarketingEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
