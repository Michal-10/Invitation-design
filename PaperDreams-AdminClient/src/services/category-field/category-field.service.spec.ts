import { TestBed } from '@angular/core/testing';

import { CategoryFieldService } from './category-field.service';

describe('CategoryFieldService', () => {
  let service: CategoryFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
