import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { SourcecodesService } from '../services/sourcecodes.service';
import { ModalpopupComponent } from './modalpopup.component';

describe('ModalpopupComponent', () => {
  let component: ModalpopupComponent;
  let fixture: ComponentFixture<ModalpopupComponent>;
  let enteredCaptcha:string='';
  let errorMessage:string='';
  let captcha:string=''; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalpopupComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} } ,
         [SourcecodesService]],
        
        imports: [
          HttpClientTestingModule 
        ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(ModalpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should find the <p> with fixture.debugElement.query(By.css)', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const paragraphDe = bannerDe.query(By.css('p'));
    const p: HTMLElement = paragraphDe.nativeElement;
    expect(p.textContent).toEqual('');
  });
  it('should validate captcha', () => {
    fixture.componentInstance.validateCaptcha();
    expect(fixture.componentInstance.enteredCaptcha).toEqual(captcha);
  });
  it('should fail validate captcha', () => {
    fixture.componentInstance.validateCaptcha();
    expect(fixture.componentInstance.enteredCaptcha).toEqual(errorMessage);
  });
  
  it('check if condition',()=>{
   fixture.detectChanges();
   fixture.whenStable().then(()=>{
    const element:HTMLDivElement=fixture.debugElement.nativeElement.querySelector('div');
    expect(element).not.toBeNull();
   })
  });
});
