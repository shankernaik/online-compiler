import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalpopupComponent } from '../modalpopup/modalpopup.component';
import { sourcecode } from '../Models/sourcecode.model';
import { SourcecodesService } from '../services/sourcecodes.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { HttpClientTestingModule } from '@angular/common/http/testing';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  compoName="aditya";//testing
  output:string='';                           
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code:string='';
  originalCode: string = 'function x() { // TODO }';
    addSourcecoderequest: sourcecode={
      id: '',
      code: '/*---Type your code here---*/\nfunction main() {\nwarn("Welcome to Javascript!!!");\n}\nmain();',
      output: ''
    }
    //this function is responsible for modal pop up
    OpenPopup(){
      this.matdialog.open(ModalpopupComponent,{width:'40%',height:'48%',enterAnimationDuration:'800ms',
      data:{codeObject:this.addSourcecoderequest}//this will send id of stored code in modalpopup component
    })
    }
    idOfStoredCode:string='link for show';
      //this is to run source code and return output without adding it to database
    runSourceCode(){
      this.sourcecodesService.runSourceCodeService(this.addSourcecoderequest) //calling the method of services to connent with server api 
      .subscribe({
        next:(code)=>{
          console.log(code);//debug purpose
          this.ngxService.startBackground("do-background-things"); //spinner start
          setTimeout(() => {
            this.ngxService.stopBackground("do-background-things"); // stop foreground spinner of the master loader with 'default' taskId
              this.output = code.output; //showing output on terminal of executed code
              this.sourcecodesService.sendNotification(this.output);
            }, 3000);
        }
      })
    }
    //this is to get a specific id based on given id in url 
    getSourceCode(id:string){
      this.sourcecodesService.getSourceCodeService(id)
      .subscribe({
        next:(sourceCode)=>{
          console.log(sourceCode); //just for debbugging purpose
          this.addSourcecoderequest.code=sourceCode.code; 
          this.output =sourceCode.output; 
          this.sourcecodesService.sendNotification(this.output); 
        } 
      }) 
    }
    constructor(private sourcecodesService: SourcecodesService,private matdialog:MatDialog,private ngxService: NgxUiLoaderService) { }
    public href: string = '';
    ngOnInit(): void {
    this.href=window.location.href.substring(37,73);//this is to get current url and get only id from that url
    this.getSourceCode(this.href);//for getting a specific code with a given id in url
  }
}
