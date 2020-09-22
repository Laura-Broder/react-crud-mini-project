import axios from "axios";

export default axios.create({
  baseURL: "https://5f67855938ce8700163986d4.mockapi.io/products",
  dataType: "json",
});
