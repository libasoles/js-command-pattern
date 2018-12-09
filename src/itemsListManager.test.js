const ListManager = require('./itemsListManager');

class MockCommmand {
  constructor() { this.name = 'mockCommand'; }
  execute() { }   
}

class MockAddCommmand {
  constructor(item) { 
      this.name = 'MockAddCommmand';
      this.item = item; 
      this.execute = this.execute.bind(this);       
  }
  execute(list) { return [...list, this.item]; }   
}

test('it should keep track of history', () => {
  const manager = new ListManager('testList');
  manager.do(new MockCommmand());
  expect(manager.history).toEqual(['mockCommand']);
});

test('it retrieves list name', () => {
  const manager = new ListManager('testList');
  expect(manager.name).toBe('testList');
});

test('it supports names with spaces', () => {
  const manager = new ListManager('test list ok');
  manager.do(new MockCommmand());
  expect(manager.name).toEqual('test list ok');
  expect(manager.history).toEqual(['mockCommand']);
});

test('it retrieves items list', () => {
  const manager = new ListManager('testList');
  manager.do(new MockAddCommmand('something'));
  expect(manager.list).toEqual(['something']);
});
