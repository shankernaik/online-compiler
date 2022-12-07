import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { sourcecode } from '../Models/sourcecode.model';
import { SourcecodesService } from '../services/sourcecodes.service';
@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {
  addSourcecoderequest: sourcecode={
    id: '',
    code: '',
    output: ''
  }
  idOfStoredCode:string='';
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private sourcecodesService:SourcecodesService,
  public dialogRef: MatDialogRef<ModalpopupComponent>) { }
  link='';
  enteredCaptcha:string='';
  errorMessage:string='';
  captcha:string=''; 
  show:boolean = false;
  //function for validation of captcha
  validateCaptcha(){
    if(this.enteredCaptcha == this.captcha){
      this.errorMessage='';
      this.addSourceCode();
    }
    else{
      this.errorMessage='Invalid captcha';
    }
  }
   //this function will call 'addSourceCodeService' method of 'sourcecodeService' so that it will call server api
  //add code to database after validation of captcha
  addSourceCode()
  {
    console.log('addy');//debug
    this.sourcecodesService.addSourceCodeService(this.addSourcecoderequest)
    .subscribe({
      next:(code)=>{ // http client returns code object
      this.idOfStoredCode=code.id; //storing code object
      }
    })
    this.idOfStoredCode=this.idOfStoredCode.toUpperCase();
    setTimeout(()=>{
      this.link = 'http://localhost:4200/api/SourceCode/'+this.idOfStoredCode;
      this.show=true;
    },1000);
  }
    result:string='';
    ngOnInit(): void {
      //this will generate captcha for the first time
      const chars='1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      this.captcha = chars[Math.floor(Math.random() * chars.length )];
      for(let i=0; i<6; i++){
        this.result = this.result + chars[Math.floor(Math.random() * chars.length )];
      }
      this.captcha = this.result;
      this.addSourcecoderequest=this.data.codeObject;    
    }
  //this is for regenerate captcha if user click on refresh icon
  genNewCaptcha(){
    this.result='';
    const chars='1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    this.captcha = chars[Math.floor(Math.random() * chars.length )];
    for(let i=0; i<6; i++){//using captcha length as 6
      this.result = this.result+ chars[Math.floor(Math.random() * chars.length )];
    }
    this.captcha = this.result;
  }
  }