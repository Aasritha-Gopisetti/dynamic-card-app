import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from './app.component';

@Component({
  selector: 'app-edit-modal',
  template: `
  <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
              background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;">
    <div style="background: white; padding: 20px; border-radius: 10px; width: 300px;">
      <h3>Edit Description</h3>
      <textarea [(ngModel)]="card.description" rows="5" style="width: 100%;"></textarea>
      <div style="text-align: right; margin-top: 10px;">
        <button (click)="onCancel()">Cancel</button>
        <button (click)="onSave()" [disabled]="!card.description.trim()">Save</button>
      </div>
    </div>
  </div>`
})
export class EditModalComponent {
  @Input() card!: Card;
  @Output() save = new EventEmitter<Card>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.card);
  }

  onCancel() {
    this.cancel.emit();
  }
}
