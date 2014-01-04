var _setItem = Storage.prototype.setItem;

var currentTodos = [];


Storage.prototype.getItem = (function(key) {
   console.log("getItem " + key);
   if (whiteList(key)) {
      var result = null;
      $.ajax({
         url: "/todos",
         type: "GET",
         async: false,
         success: function(e) {
            result = e;
         }
      });
      return JSON.stringify(result);
      
   } else {
      return this.call(localStorage, key);
   }
}).bind(Storage.prototype.getItem);

Storage.prototype.setItem = (function(key, value) {
   console.log("setItem");

   if (!whiteList(key) || this === window.localStorage) {
      this.call(localStorage, key, value);
      return;
   }

   // do what you want if setItem is called on localStorage
   console.log("setItem " + key + " " + value);

   var currentValues = JSON.parse(value);

   if (currentValues.length === currentTodos.length + 1) { // addition

      // more or less unique id
      currentValues[currentValues.length - 1].id = Math.floor(Math.random() * 10000);

      $.ajax({
         url: "/todos",
         type: "POST",
         processData: false,
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         data: JSON.stringify(currentValues[currentValues.length - 1])
      });

   } else if (currentValues.length === currentTodos.length) { // modification
      var modifiedValue = _.find(currentValues, function(e) {
         return _.isEmpty(_.where(currentTodos, e));
      });

      // find correct id for modifiedValue
      var currentIndex = _.indexOf(currentValues, modifiedValue);
      var currentId = currentTodos[currentIndex].id;
      modifiedValue.id = currentId;
      currentValues[currentIndex].id = currentId;

      $.ajax({
         url: "/todos/" + modifiedValue.id,
         type: "PUT",
         processData: false,
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         data: JSON.stringify(modifiedValue)
      });

   } else if (currentValues.length === currentTodos.length - 1) { // deletion
      var deletedValue = _.find(currentTodos, function(e) {
         return _.isEmpty(_.where(currentValues, e));
      });

      // find correct id for deletedValue
      deletedValue.id = currentTodos[_.indexOf(currentTodos, deletedValue)].id;

      $.ajax({
         url: "/todos/" + deletedValue.id,
         type: "DELETE",
      });

   }

   currentTodos = currentValues;

}).bind(Storage.prototype.setItem);


var whiteList = function(key) {
   return _.contains([
      "todos-jquery", 
      "todo-gwt", 
      "todos-knockoutjs"
      ], key);
};

/*
 *
 * Format correctly a new item according to the framework used
 *
 */
var addItem = function(framework, item) {
   switch (framework) {
      case "todos-jquery":
         item.id = Date.now();
         break;
      default:
         throw {
            message: "unknow framework " + framework
         };
   }
};