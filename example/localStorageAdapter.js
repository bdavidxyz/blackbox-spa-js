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

      $.ajax({
         url: "/todos/" + deletedValue.id,
         type: "DELETE",
      });

   }

   currentTodos = currentValues;

}).bind(Storage.prototype.setItem);


var whiteList = function(key) {
   if (key === "todos-jquery") return true;
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