import React from "react";

class ErrorMsg extends React.Component {
  state = {};
  renderMsg = (msgArray) => {
    if (msgArray.length === 0) return "";
    let i = 0;
    return msgArray.map((msg) => <p key={i++}>{msg}</p>);
  };

  render() {
    return <div className="errorMsg">{this.renderMsg(this.props.content)}</div>;
  }
}

export default ErrorMsg;
