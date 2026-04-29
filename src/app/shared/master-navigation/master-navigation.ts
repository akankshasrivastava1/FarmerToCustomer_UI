import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterModule, RouterOutlet } from "@angular/router";
import { Category } from '../../core/models/classes/Master.model';

@Component({
  selector: 'app-master-navigation',
  imports: [RouterModule],
  templateUrl: './master-navigation.html',
  styleUrl: './master-navigation.css',
})
export class MasterNavigation {
  @Input() activeTab!: 'PRODUCT' | 'ROLE' | 'CATEGORY';
  @Output() tabChange = new EventEmitter<'PRODUCT' | 'ROLE' | 'CATEGORY'>();

  selectTab(tab: 'PRODUCT' | 'ROLE' | 'CATEGORY') {
    this.tabChange.emit(tab);
  }
  
}
