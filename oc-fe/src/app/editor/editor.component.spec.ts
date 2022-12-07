import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditorComponent } from './editor.component';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SourcecodesService } from '../services/sourcecodes.service';
describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        
        {provide: MatDialog,},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {}}
        ],
      imports: [
        HttpClientTestingModule ,
        MatDialogModule
      ],
      declarations: [ EditorComponent ,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('testing title',()=>{
    expect(component.compoName).toBe("aditya");
  })
  //testing
  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(EditorComponent);
    const component = fixture.debugElement.componentInstance;
    spyOn(component,"getSourceCode").and.returnValue([]);
    component.ngOnInit();
    expect(component.href).toEqual('');
  })
  it('should call runSourceCode', () => {
    const fixture = TestBed.createComponent(EditorComponent);
    const app = fixture.componentInstance;
    spyOn(component,"runSourceCode").and.stub();
    let service = fixture.debugElement.injector.get(SourcecodesService);
    component.runSourceCode();
    expect(component.runSourceCode).toHaveBeenCalled();
});
});