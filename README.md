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

I guess this is fine, because even when it's not using **command objects**, it assumes that all commands will be called with the generic `apply` method. However, this also assumes that each command _can have different number of arguments_. And I'm not happy with that because that goes against the _shared interface_ idea.

By other hand, stress here is in `Manager.execute()`, while in my understanding the `execute` interface implementation is relevant only in the commands, not in the Invoker (meaning, not in the manager we have seen in the example). Like `requestInfoCommand.execute()`.

Finally, the `Manager` is **tightly coupled** to the commands, while it should be able to receive commands _by injection_. Why? Because that way you will be ok with the [Open/Close principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) of Clean Code.

So, I wanted to make a _proof of concept_ by using objects instead of functions, and I came up with this example of a Storage, which basically handles lists. 

You can create lists like this:

`const carsListManager = new CarsListManager('cars');`

And add items like this:

`carsListManager.do(new AddItemCommmand('Volvo'));`

So, even when the Invoker has a "do" interface, the **Command Pattern** is not about that. The real thing occurs inside the manager:

```js
do(command) {
  command.execute;
} 
```

By the way, notice that we are keeping track of executing history, so we could implement `undo` operations later on:

```js
do(command) {
  command.execute;
  this.executed.push(command);
} 
```

My example is a _work in progress_, and it could be enhanced in several ways. But basically it shows what I wanted to show. 

For further research, see the wikipedia example for js:
https://en.wikipedia.org/wiki/Command_pattern#JavaScript

Feel free to commment. Comments are welcome.
 
