const ListManager = require('./itemsListManager');
const AddItemCommmand = require('./listCommands').AddItemCommmand;
const RemoveItemCommand = require('./listCommands').RemoveItemCommand;

const manager = new ListManager('numbers');
manager.do(new AddItemCommmand(5));
manager.do(new AddItemCommmand(7));
manager.do(new AddItemCommmand(3));
manager.do(new RemoveItemCommand(5));

const history = manager.history.join(' > ');
const list = manager.list.join(', ');

console.log("List:", manager.name);
console.log("Operations:", history);
console.log("Result:", list);
