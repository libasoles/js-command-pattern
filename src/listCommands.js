 class AddItemCommmand {
   
  get name() {
    return `addItemToList(${this.item})`;
  }
  
  constructor(item) {
    this.item = item;
    this.execute = this.execute.bind(this);
  }
   
  execute(state) {
    return state.concat(this.item);
  }
} 

class RemoveItemCommand {
  
  get name() {
    return `removeItemFromList(${this.item})`;
  }
  
  constructor(item) {
    this.item = item;
    this.execute = this.execute.bind(this);
  }
  
  execute(state) {
    return state.filter(i => i !== this.item);
  }
} 

module.exports = {
  AddItemCommmand,
  RemoveItemCommand,
}
