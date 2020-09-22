import React from "react";

class CustomButton extends React.Component {
  state = {
    btnType: this.props.type,
    btnValue: this.props.value,
    btnContent: this.props.content,
    disabled: false,
    clickOnce: this.props.clickOnce,
  };
  handleBtnClick = (e) => {
    if (this.state.disabled) {
      return;
    }
    setTimeout(() => this.setState({ disabled: true }), 0);

    const buttonValue = e.target.value;
    this.props.onClick(buttonValue);
    if (!this.state.clickOnce)
      setTimeout(() => this.setState({ disabled: false }), 1000);
  };
  render() {
    return (
      <button
        type={this.state.btnType}
        value={this.state.btnValue}
        onClick={this.handleBtnClick}
        disabled={this.state.disabled}>
        {this.state.disabled ? "Working..." : this.state.btnContent}
      </button>
    );
  }
}

export default CustomButton;
