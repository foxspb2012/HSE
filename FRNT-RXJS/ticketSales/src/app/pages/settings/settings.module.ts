import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { StatisticComponent } from './statistic/statistic.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent,
    ChangePasswordComponent,
  ],
  exports: [
    StatisticComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    TabViewModule,
    TableModule,
    ToastModule,
  ],
  providers: [MessageService]
})
export class SettingsModule {
}
