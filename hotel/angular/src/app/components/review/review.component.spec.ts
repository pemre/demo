import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewComponent } from './review.component';
import { Review } from '../../models/review';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    const expectedReview: Review = {
      positive: true,
      name: 'Emre',
      comment: 'It was fun'
    };
    component.review = expectedReview;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render review name and text', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.review-name').textContent).toContain('Emre');
    expect(compiled.querySelector('.review-text').textContent).toContain('It was fun');
  }));
});
