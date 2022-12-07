import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { sourcecode } from '../Models/sourcecode.model';
import {Subject} from 'rxjs'; ////this is for sibiling component commununication
@Injectable({
  providedIn: 'root'
})

export class SourcecodesService {
  static value(value: any) {
    throw new Error('Method not implemented.');
  }
  addSorceCodeRequest(addSorceCodeRequest: any) {
    throw new Error('Method not implemented.');
  }
  baseApiUrl:string = environment.baseApiUrl;//content stored in environment.ts file
  constructor(private http: HttpClient) { }//Performs HTTP requests
  getSourceCodeService(id:string):Observable<sourcecode>{ //function for getting ID 
    return this.http.get<sourcecode>(this.baseApiUrl+'api/SourceCode?id='+id);
  }
  addSourceCodeService(addSorceCodeRequest:sourcecode):Observable<sourcecode>{//store code after execution and validation
    addSorceCodeRequest.id='00000000-0000-0000-0000-000000000000';
    return this.http.post<sourcecode>(this.baseApiUrl+'api/AddCodeToDatabase',addSorceCodeRequest);
}
  runSourceCodeService(addSorceCodeRequest:sourcecode):Observable<sourcecode>{//run code only
    addSorceCodeRequest.id='00000000-0000-0000-0000-000000000000';
    return this.http.post<sourcecode>(this.baseApiUrl+'api/SourceCode',addSorceCodeRequest);
  }
  //this is for sibiling component commununication
  public notificationSubject = new Subject<string>();//emits an event in a Subject with the next() method
    sendNotification(data:string){
    this.notificationSubject.next(data);
  }
}