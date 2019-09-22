import { Card } from "../place-card/place-card";

class CardList {
  constructor(container, arrayCards) {
    this.container = container;
    this.arrayCards = arrayCards;
    this.cards = [];
    this.addcard();
  }

  addcard() {
    for (let i = 0; i < this.arrayCards.length; i++) {
      const card = new Card(
        this.arrayCards[i].name,
        this.arrayCards[i].link,
        this.arrayCards[i].likes.length,
        this.arrayCards[i]._id,
        this.arrayCards[i].owner.name,
        this.arrayCards[i].likes
      );
      // при загрузке активные мои иконки лайка

      card.likesName.forEach(element => {
        if (element.name === "Denis Romanenko") {
          card.cardDom
            .querySelector(".place-card__like-icon")
            .classList.add("place-card__like-icon_liked");
        }
      });
      // при загрузке активные мои иконки удаления
      if (card.developerName === "Denis Romanenko") {
        const doDelIconActiv = card.cardDom.querySelector(
          ".place-card__delete-icon"
        );
        doDelIconActiv.style.display = "block";
        this.cards.push(card.cardDom);
      } else {
        this.cards.push(card.cardDom);
      }
    }
    return this.cards;
  }
  render() {
    this.cards.forEach(element => {
      this.container.appendChild(element);
    });
  }
}

export { CardList };
