import React from "react";

class SearchBar extends React.Component {
  state = { term: this.props.value };
  handleInputChange = (event) => {
    this.setState({ term: event.target.value });
    this.props.onChange(event.target.value, event.target.name);
  };

  render() {
    return (
      <div>
        <label>{this.props.label} </label>
        <input
          placeholder={this.props.placeholder}
          type="text"
          name={this.props.inputName}
          value={this.state.term}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default SearchBar;
