import React from "react";
import CustomButton from "./CustomButton";
import SearchBar from "./SearchBar";

class AddProductCardForm extends React.Component {
  state = {
    name: "",
    imgUrl: "",
    price: "",
    color: "",
    id: this.props.nextID,
  };
  handleSaveClick = () => {};

  componentDidMount = () => {
    // console.log(this.props.nextID);
    // console.log(this.state.id);
  };
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
  renderForm = () => {
    return (
      <form onSubmit={this.onFormSubmit} className="add-new-form center">
        <div className="add-new-form-inner">
          <div>
            <h2>Product Name:</h2>
            <SearchBar
              value={this.state.name}
              inputName="name"
              onChange={this.onInputChange}
              placeholder="At least 3 chars"
            />
          </div>
          <div>
            <h3>Image URL:</h3>
            <SearchBar
              value={this.state.imgUrl}
              inputName="imgUrl"
              onChange={this.onInputChange}
              placeholder="A valid Url"
            />
          </div>
          <div>
            <h3>Price:</h3>
            <SearchBar
              value={this.state.price}
              inputName="price"
              onChange={this.onInputChange}
              placeholder="More then 0"
            />
          </div>
          <div>
            <h3>Color:</h3>
            <SearchBar
              value={this.state.color}
              inputName="color"
              onChange={this.onInputChange}
              placeholder="At least 3 chars"
            />
          </div>
        </div>

        <CustomButton
          type="submit"
          value={this.state.id}
          content="Save"
          onClick={this.handleSaveClick}
        />
      </form>
    );
  };
  render() {
    return this.renderForm();
  }
}

export default AddProductCardForm;
