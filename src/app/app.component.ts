import { Component } from '@angular/core';

export interface Card {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  cards: Card[] = [
    { id: 1, title: 'Card 1', description: 'This is the description for card 1.' },
    { id: 2, title: 'Card 2', description: 'This is the description for card 2.' },
    { id: 3, title: 'Card 3', description: 'This is the description for card 3.' }
  ];

  selectedCard: Card | null = null;

  openEditModal(card: Card) {
    this.selectedCard = { ...card };
  }

  saveDescription(updatedCard: Card) {
    const index = this.cards.findIndex(c => c.id === updatedCard.id);
    if (index > -1) {
      this.cards[index].description = updatedCard.description;
    }
    this.selectedCard = null;
  }

  cancelEdit() {
    this.selectedCard = null;
  }
}
