import { TestBed } from '@angular/core/testing';
import { SliceArrayPipe } from './slice-array.pipe';

describe('SliceArrayPipe', () => {
  let pipe: SliceArrayPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SliceArrayPipe]
    });

    pipe = TestBed.inject(SliceArrayPipe);
  });

  it('should create an instance of SliceArrayPipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should slice array based on buttonNumber and step', () => {
    const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    expect(pipe.transform(inputArray, 1, 3)).toEqual([1, 2, 3]);
    expect(pipe.transform(inputArray, 2, 3)).toEqual([4, 5, 6]);
    expect(pipe.transform(inputArray, 3, 3)).toEqual([7, 8, 9]);

    expect(pipe.transform(inputArray, 4, 3)).toEqual([10]);

    expect(pipe.transform([], 1, 3)).toEqual([]);
  });

});
