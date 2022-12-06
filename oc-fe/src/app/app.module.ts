import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './editor/editor.component';
import { TerminalComponent } from './terminal/terminal.component';
import { SourcecodesService } from './services/sourcecodes.service';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxUiLoaderModule } from "ngx-ui-loader";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditorComponent,
    TerminalComponent,
    ModalpopupComponent,
  ],
  imports: [
    //importing required modules
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MonacoEditorModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgxUiLoaderModule,
    HttpClientModule
  ],
  providers: [
    SourcecodesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
