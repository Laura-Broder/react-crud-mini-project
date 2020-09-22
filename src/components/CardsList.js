import React from "react";
import ProductCard from "./ProductCard";

class CardsList extends React.Component {
  state = {
    editMode: false,
  };
  handleDelete = (cardID) => {
    this.props.onDelete(cardID);
  };
  handleEdit = (cardID) => {
    this.props.onEdit(cardID);
    this.setState({ editMode: true });
  };
  handleEditSubmit = (editedProduct) => {
    this.props.onSubmit(editedProduct);
    setTimeout(() => this.setState({ editMode: false }), 1000);
  };
  render() {
    const cardsArray = this.props.data;

    if (cardsArray.length === 0) {
      return <div>{this.props.msg}</div>;
    }

    const cardsElements = this.props.data.map((item) => {
      return (
        <ProductCard
          id={item.id}
          key={item.id}
          name={item.name}
          price={item.price}
          color={item.color}
          imgUrl={item.imgUrl}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          onSubmit={this.handleEditSubmit}
        />
      );
    });
    return <div className="cards-container">{cardsElements}</div>;
  }
}

export default CardsList;
