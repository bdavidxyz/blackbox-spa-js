var _setItem = Storage.prototype.setItem;

var currentTodos = [];

Storage.prototype.setItem = function(key, value) {
	if (this === window.localStorage) {
         // do what you want if setItem is called on localStorage
         console.log("setItem " + key + " " + value);

         var currentValue = JSON.parse(value);

         if (currentValue.length === currentTodos.length + 1) {
          $.ajax({
            url: "/todos",
            type: "POST",
            data: JSON.stringify(_.last(currentValue))
         }).done(function() {

         });
      }
      currentTodos = currentValue;
   } else {
         // fallback to default action
         _setItem.apply(this, arguments);
      }
   };