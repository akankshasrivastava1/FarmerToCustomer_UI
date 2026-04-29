import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  imports: [],
  templateUrl: './delete-confirmation.html',
  styleUrl: './delete-confirmation.css',
})
export class DeleteConfirmation {
  @Input() deleteType: 'ROLE' | 'CATEGORY' | null = null;
  // deleteType: 'ROLE' | 'CATEGORY' | null = null;
  @Input() selectedDeleteId!: number | null;

  @Output() deleteConfirmed = new EventEmitter<void>();

  
 // Used only for display text
  @Input() entityName: string = 'item';

  // Fired when user confirms delete
  @Output() confirmDelete = new EventEmitter<void>();

  
}
