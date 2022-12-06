import { Component, OnInit } from '@angular/core';
import { SourcecodesService } from '../services/sourcecodes.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  constructor(private sourcecodesService:SourcecodesService,) { }
  output:string='';
  ngOnInit(): void {
    //calling message 
    this.sourcecodesService.notificationSubject.subscribe(message=>this.output=message);
  }
}
