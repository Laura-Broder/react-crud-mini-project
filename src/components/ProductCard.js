import React from "react";
import CustomButton from "./CustomButton";
import EditProductCardForm from "./EditProductCardForm";

class ProductCard extends React.Component {
  state = {
    name: this.props.name,
    imgUrl: this.props.imgUrl,
    price: this.props.price,
    color: this.props.color,
    id: this.props.id,
    editMode: false,
  };
  updateState = (editedProduct) => {
    this.setState({
      name: editedProduct.name,
      imgUrl: editedProduct.imgUrl,
      price: editedProduct.price,
      color: editedProduct.color,
      id: editedProduct.id,
    });
  };
  handleDeleteClick = (cardID) => {
    this.props.onDelete(cardID);
  };
  handleEditClick = (cardID) => {
    this.setState({ editMode: true });
    this.props.onEdit(cardID);
  };
  handleEditSubmit = (editedProduct) => {
    this.updateState(editedProduct);
    this.props.onSubmit(editedProduct);
    this.setState({ editMode: false });
  };
  renderEditMode = () => {
    return (
      <EditProductCardForm
        name={this.state.name}
        imgUrl={this.state.imgUrl}
        price={this.state.price}
        color={this.state.color}
        id={this.state.id}
        onSubmit={this.handleEditSubmit}
      />
    );
  };
  renderCard = () => {
    return (
      <div className="card">
        <h2>{this.state.name}</h2>
        <img alt={this.state.name} src={this.state.imgUrl} />
        <div>
          <h3>Price:</h3>
          <p>{this.state.price}</p>
        </div>
        <div>
          <h3>Color:</h3>
          <p>{this.state.color}</p>
        </div>
        <div>
          <CustomButton
            type="button"
            value={this.state.id}
            content="Delete"
            onClick={this.handleDeleteClick}
            clickOnce="true"
          />
          <CustomButton
            type="button"
            value={this.state.id}
            content="Edit"
            onClick={this.handleEditClick}
            clickOnce="true"
          />
        </div>
      </div>
    );
  };
  render() {
    if (this.state.editMode) {
      return this.renderEditMode();
    } else {
      return this.renderCard();
    }
  }
}

export default ProductCard;
