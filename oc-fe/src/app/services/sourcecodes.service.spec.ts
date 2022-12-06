import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { sourcecode } from '../Models/sourcecode.model';
import { SourcecodesService } from './sourcecodes.service';
describe('SourcecodesService', () => {
  let sourcecodeservice:SourcecodesService;
  let httpTestingController: HttpTestingController;
  let addSorceCodeRequest:sourcecode;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SourcecodesService],
      imports: [ HttpClientTestingModule ]
    });
    sourcecodeservice = TestBed.inject(SourcecodesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  describe('getSourceCodeService()', () => {
    it('should return single post when getpost is called with postId', () => {
      sourcecodeservice.getSourceCodeService('1').subscribe();
      const request = httpTestingController.expectOne(
        `https://localhost:7127/api/SourceCode?id=1`
      );
      expect(request.request.method).toBe('GET');
    });
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(sourcecodeservice).toBeTruthy();
  });
});