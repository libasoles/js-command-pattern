const withState = require('./state').withState; 
const getState = require('./state').getState;

class ItemsListManager {
   
  get history() {
    return this.executed.map(i => i.name);    
  }
  
  get list() {
    return getState()[this.name];    
  }
  
  constructor(name) {
    this.name = name;
    this.executed = [];
  }
    
  do(command) {
    withState(this.name, command.execute);
    this.executed.push(command);
  }  
}

module.exports = ItemsListManager;
