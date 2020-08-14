export default {
  required(label) {
    return (value) => {
      if (value === "") {
        return "请输入" + label
      }
      return true
    }
  }
}
