import React from "react";
import CustomButton from "./CustomButton";
import SearchBar from "./SearchBar";

class EditProductCardForm extends React.Component {
  state = {
    name: this.props.name,
    imgUrl: this.props.imgUrl,
    price: this.props.price,
    color: this.props.color,
    id: this.props.id,
  };
  handleSaveClick = () => {};

  onInputChange = (term, inputName) => {
    switch (inputName) {
      case "name":
        this.setState({ name: term });
        break;
      case "imgUrl":
        this.setState({ imgUrl: term });
        break;
      case "price":
        this.setState({ price: term });
        break;
      case "color":
        this.setState({ color: term });
        break;
      default:
        break;
    }
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };
  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="card center">
        <h2>Product Name:</h2>
        <SearchBar
          value={this.state.name}
          inputName="name"
          onChange={this.onInputChange}
          placeholder="At least 3 chars"
        />
        <h3>Image URL:</h3>
        <SearchBar
          value={this.state.imgUrl}
          inputName="imgUrl"
          onChange={this.onInputChange}
          placeholder="A valid Url"
        />
        <h3>Price:</h3>
        <SearchBar
          value={this.state.price}
          inputName="price"
          onChange={this.onInputChange}
          placeholder="More then 0"
        />
        <h3>Color:</h3>
        <SearchBar
          value={this.state.color}
          inputName="color"
          onChange={this.onInputChange}
          placeholder="At least 3 chars"
        />
        <CustomButton
          type="submit"
          value={this.state.id}
          content="Save"
          onClick={this.handleSaveClick}
          clickOnce="true"
        />
      </form>
    );
  }
}

export default EditProductCardForm;
