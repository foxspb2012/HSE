import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CheckboxModule,
    InputTextModule,
    FormsModule
  ]
})
export class SettingsModule { }
