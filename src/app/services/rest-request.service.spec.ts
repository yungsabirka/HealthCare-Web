import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestRequestsService } from './rest-requests.service';

describe('RestRequestsService', () => {
  let service: RestRequestsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestRequestsService],
    });

    service = TestBed.inject(RestRequestsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Проверяем, что нет неподтвержденных запросов HTTP
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request', () => {
    const testData = { message: 'Hello, World!' };
    const url = '/api/data';

    service.get(url).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should make a POST request', () => {
    const testData = { message: 'Data created successfully' };
    const url = '/api/data';
    const requestBody = { key: 'value' };

    service.post(url, requestBody).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestBody);
    req.flush(testData);
  });

  it('should make a PUT request', () => {
    const testData = { message: 'Data updated successfully' };
    const url = '/api/data';
    const requestBody = { key: 'value' };

    service.put(url, requestBody).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(requestBody);
    req.flush(testData);
  });

  it('should make a DELETE request', () => {
    const testData = { message: 'Data deleted successfully' };
    const url = '/api/data';

    service.delete(url).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('DELETE');
    req.flush(testData);
  });
});
