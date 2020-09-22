import React from "react";
import CardsList from "./components/CardsList";
import AddProductCardForm from "./components/AddProductCardForm";
import ErrorMsg from "./components/ErrorMsg";
import ReactSpinner from "./components/ReactSpinner";
import productsApi from "./api/productsApi";
import "./App.css";

class App extends React.Component {
  state = {
    fullData: [],
    status: "Loading...",
    editMode: false,
    errorMsg: "",
    displaySpinner: false,
    nextID: "",
  };
  getNextID = () => {
    if (this.state.fullData.length !== 0) {
      const lastIndex = this.state.fullData.length - 1;
      const lastID = this.state.fullData[lastIndex].id;
      // console.log(parseInt(lastID) + 1);
      return parseInt(lastID) + 1;
    }
  };
  getData = async () => {
    this.setState({ displaySpinner: true });
    let res = {};
    try {
      res = await productsApi.get();
      this.setState({
        fullData: res.data,
        status: res.statusText,
        nextID: this.getNextID(),
      });
      // console.log("rendered");
      this.setState({ displaySpinner: false });

      return res.statusText;
    } catch {
      // make handleError function
      console.log(res.status);
      console.log(res.statusText);
      this.setState({ status: res.statusText });
      return res.statusText;
    }
  };
  handleDelete = async (CardID) => {
    this.setState({ displaySpinner: true });

    let res = {};
    try {
      res = await productsApi.delete(CardID);
      this.getData();
      return res.statusText;
    } catch {
      console.log(res.status);
      console.log(res.statusText);
      return res.statusText;
    }
  };

  handleEdit = (CardID) => {
    this.setState({ editMode: true });
    // console.log(this.state.editMode);
    // console.log(CardID);
  };

  validateImgUrl = (url) => {
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        return false;
      });
  };
  inputValidation = (newProduct) => {
    let msgArray = [];
    if (newProduct.name.length < 3) {
      msgArray.push("Product name is less then 3 chars.");
    }
    // change imgUrl validation:
    // if (!this.validateImgUrl(newProduct.imgUrl)) {
    //   msgArray.push("Image Url is invalid");
    // }
    if (!(parseInt(newProduct.price) > 0)) {
      msgArray.push("Price is invalid");
    }
    if (newProduct.color.length < 3) {
      msgArray.push("Color is less then 3 chars.");
    }
    return msgArray;
  };
  handleSave = () => {};
  handleSubmit = async (newProduct) => {
    this.setState({ displaySpinner: true });

    const validationMsg = this.inputValidation(newProduct);
    this.setState({ errorMsg: validationMsg });
    if (validationMsg.length === 0) {
      let res = {};
      try {
        res = await productsApi.post("", newProduct);
        this.getData();
        return res.statusText;
      } catch {
        console.log(res.status);
        console.log(res.statusText);
        return res.statusText;
      }
    } else {
      this.setState({ displaySpinner: false });
    }
  };
  handleEditSubmit = async (editedProduct) => {
    this.setState({ displaySpinner: true });

    const validationMsg = this.inputValidation(editedProduct);
    if (validationMsg.length === 0) {
      let res = {};
      try {
        res = await productsApi.put(editedProduct.id, editedProduct);
        console.log(res);
        this.getData();
        this.setState({ editMode: false });
        return res.statusText;
      } catch {
        console.log(res.status);
        console.log(res.statusText);
        return res.statusText;
      }
    } else {
      this.setState({ errorMsg: validationMsg });
    }
  };
  componentDidMount = () => {
    this.getData();
  };
  renderErrorMsg = () => {
    // console.log(this.state.errorMsg);
    if (this.state.errorMsg.length !== 0) {
      return <ErrorMsg content={this.state.errorMsg} />;
    }
  };
  render() {
    return (
      <div className="mainContainer center">
        <header>
          <h1>Shop</h1>
          <a href="https://www.linkedin.com/in/laura-broder-01257662">
            made By <span className="credit"> Laura Broder</span>
          </a>
        </header>
        <div className="content">
          {this.state.displaySpinner && <ReactSpinner />}
          <AddProductCardForm
            onSubmit={this.handleSubmit}
            onSave={this.handleSave}
            nextID={this.state.nextID}
          />
          {this.renderErrorMsg()}
          <CardsList
            onSubmit={this.handleEditSubmit}
            data={this.state.fullData}
            msg={this.state.status}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
        </div>
        <footer>
          <a href="https://mockapi.io/">
            <span className="credit">MockAPI </span>created at
            "https://mockapi.io/"
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
