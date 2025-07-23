import { Component, OnInit } from '@angular/core';

export interface Card {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  cards: Card[] = [];
  selectedCard: Card | null = null;
  isNewCard: boolean = false;

  ngOnInit(): void {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      this.cards = JSON.parse(storedCards);
    } else {
      this.cards = [
        { id: 1, title: 'Card 1', description: 'This is the description for card 1.' },
        { id: 2, title: 'Card 2', description: 'This is the description for card 2.' },
        { id: 3, title: 'Card 3', description: 'This is the description for card 3.' }
      ];
      localStorage.setItem('cards', JSON.stringify(this.cards));
    }
  }

  openEditModal(card: Card): void {
    this.selectedCard = { ...card };
    this.isNewCard = false;
  }

  addNewCard(): void {
    const newCard: Card = {
      id: Date.now(),
      title: 'New Card',
      description: ''
    };
    this.selectedCard = newCard;
    this.isNewCard = true;
  }

  deleteCard(card: Card): void {
    this.cards = this.cards.filter(c => c.id !== card.id);
    localStorage.setItem('cards', JSON.stringify(this.cards));
  }

  saveDescription(updatedCard: Card): void {
    if (this.isNewCard) {
      this.cards.push(updatedCard);
    } else {
      const index = this.cards.findIndex(c => c.id === updatedCard.id);
      if (index > -1) {
        this.cards[index] = { ...updatedCard };
      }
    }
    localStorage.setItem('cards', JSON.stringify(this.cards));
    this.selectedCard = null;
    this.isNewCard = false;
  }

  cancelEdit(): void {
    this.selectedCard = null;
    this.isNewCard = false;
  }
}
