I've seen examples of **Command Pattern** that I don't consider accurate. This video in particular seems to me like a misleading approach: 
https://www.youtube.com/watch?v=NxsHi7nQQQI

But let's check [this one from O`Reilly webpage](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s08.html): 

```js
var CarManager = {
  
    requestInfo: function( model, id ){
        return "The information for " + model + " with ID " + id + " is foobar";
    },
    
    buyVehicle: function( model, id ){
        return "You have successfully purchased Item " + id + ", a " + model;
    },
    
    arrangeViewing: function( model, id ){
        return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
    }

};

CarManager.execute = function ( name ) {
    return CarManager[name] && CarManager[name].apply( CarManager, [].slice.call(arguments, 1) );
};

CarManager.execute( "arrangeViewing", "Ferrari", "14523" );

```

I guess this is fine, because even when it's not using **command objects**, it assumes that all commands will be called with the generic `apply` method.

However, stress here is in `Manager.execute()`, while in my understanding the `execute` interface implementation is relevant only in the commands, not in the Invoker (meaning, not in the manager we have seen in the example). Like `requestInfoCommand.execute()`.

By other hand, the `Manager` is **tightly coupled** to the commands, while it should be able to receive commands _by injection_. Why? Because that way you will be Ok with the [Open/Close principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) of Clean Code when you need to add _new commands_ to the manager.

[This other example](http://www.discoversdk.com/blog/learning-the-command-pattern-in-javascript) (of a Calculator) likes me more because it uses objects as messages:

`Calculator.calc({type: "divide", num1: 1, num2: 6});`

That's very close to _actions_ in *Redux*, btw. Like: `dispatch({type: "DIVIDE", payload: [1, 6]})`.

Still, these kind of messages carries data but doesn't have any functionality on themselves. They trigger tightly coupled methods in the calculator (which is Ok for this example but wouldn't be enough for other scenarios). Finally, I must say that anyway I prefer this syntax to the previous one because is quite good in a semantic sense (object literals do the trick).

All of that being said, I wanted to make a _proof of concept_ by using classes instead of functions, and I came up with this example of a Storage, which basically handles lists. 

You can create lists like this:

`const carsListManager = new CarsListManager('cars');`

And add items like this:

`carsListManager.do(new AddItemCommmand('Volvo'));`

So, even when the Invoker has a "do" interface, the **Command Pattern** is not about that. The real thing occurs inside the manager:

```js
do(command) {
  command.execute();
} 
```

By the way, notice that we are keeping track of executing history, so we could implement `undo` operations later on:

```js
do(command) {
  command.execute();
  this.executed.push(command);
} 
```

I haven't implemented that yet, but check this anyway:

```
const manager = new ListManager('Numbers');
manager.do(new AddItemCommmand(5));
manager.do(new AddItemCommmand(7));
manager.do(new AddItemCommmand(3));
manager.do(new RemoveItemCommand(5));

const history = manager.history.join(' > ');
console.log(history);
```

So, my example is a _work in progress_, and it could be enhanced in several ways. But basically it shows what I wanted to show. 

For further research, see the wikipedia example for js:
https://en.wikipedia.org/wiki/Command_pattern#JavaScript

Feel free to commment. Comments are welcome.
 
