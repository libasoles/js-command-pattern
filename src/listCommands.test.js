const AddItemCommmand = require('./listCommands').AddItemCommmand;
const RemoveItemCommand = require('./listCommands').RemoveItemCommand;

test('it should add an item to a new list', () => {
  const command = new AddItemCommmand(5);
  const result = command.execute([]);
  expect(result).toEqual([5]);
});

test('it should add an item to an existing list', () => {
  const command = new AddItemCommmand(5);
  const result = command.execute([3, 7]);
  expect(result).toEqual([3, 7, 5]);
});

test('it should remove an item from a list', () => {
  const command = new AddItemCommmand(5);
  const result = command.execute([]);
  expect(result).toEqual([5]);
});

test('it shouldn\'t fail when removing something that doesn\'t exists', () => {
  const command = new RemoveItemCommand(5);
  const result = command.execute([2, 7]);
  expect(result).toEqual([2, 7]);
});

test('it shouldn\'t fail when removing something from an empty list', () => {
  const command = new RemoveItemCommand(7);
  const result = command.execute([]);
  expect(result).toEqual([]);
});

