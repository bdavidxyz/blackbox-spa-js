var _setItem = Storage.prototype.setItem;

var currentTodos = [];

Storage.prototype.setItem = function(key, value) {
   if (this === window.localStorage) {
      // do what you want if setItem is called on localStorage
      console.log("setItem " + key + " " + value);

      var currentValues = JSON.parse(value);

      if (currentValues.length === currentTodos.length + 1) {  // addition

         var addedItem = _.last(currentValues);
         addItem(key, addedItem);

         $.ajax({
            url: "/todos",
            type: "POST",
            data: JSON.stringify(_.last(currentValues))
         });

      } else if (currentValues.length === currentTodos.length) { // modification
         var modifiedValue =  _.find(currentValues, function(e) {return _.isEmpty(_.where(currentTodos, e));});
         $.ajax({
            url: "/todos",
            type: "PUT",
            data: JSON.stringify(modifiedValue)
         });
      }


      currentTodos = currentValues;
   } else {
      // fallback to default action
      _setItem.apply(this, arguments);
   }
};


/*
 *
 * Format correctly a new item according to the framework used
 *
 */
var addItem = function (framework, item) {
   switch (framework) {
      case "todos-jquery":
         item.id = Date.now();
         break;
      default:
         throw {
            message: "unknow framework " + framework
         };
   }
});