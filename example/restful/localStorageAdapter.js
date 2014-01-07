var _setItem = Storage.prototype.setItem;

var currentTodos = [];


Storage.prototype.getItem = (function(key) {
   console.log("getItem " + key);
   if (whiteList(key)) {
      var result = null;
      // $.ajax({
      //    url: "/todos",
      //    type: "GET",
      //    async: false,
      //    success: function(e) {
      //       result = e;
      //    }
      // });

      var request = new XMLHttpRequest();
      request.open('GET', '/todos', false); // `false` makes the request synchronous
      request.send(null);

      if (request.status === 200) {
         result = JSON.parse(request.responseText);
         console.log(typeof(result));
      } else {
         throw {
            message: "unable to fetch todos"
         };
      }

      return JSON.stringify(result);

   } else {
      return this.call(localStorage, key);
   }
}).bind(Storage.prototype.getItem);

var startingIdCounter = 3;

Storage.prototype.setItem = (function(key, value) {

   console.log("setItem " + key + " " + value);

   if (!whiteList(key) || this === window.localStorage) {
      this.call(localStorage, key, value);
      return;
   }

   var currentValues = prepareInput(key, JSON.parse(value));

   if (currentValues.length === currentTodos.length + 1) { // addition

      // more or less unique id
      currentValues[currentValues.length - 1].id = startingIdCounter + 1;
      startingIdCounter += 1;

      var postRequest = new XMLHttpRequest();
      postRequest.open("POST", "/todos");
      postRequest.setRequestHeader("Content-type", "application/json; charset=utf-8");
      postRequest.send(JSON.stringify(currentValues[currentValues.length - 1]));


   } else if (currentValues.length === currentTodos.length) { // modification
      var modifiedValue = _.find(currentValues, function(e) {
         return _.isEmpty(_.where(currentTodos, e));
      });

      // find correct id for modifiedValue
      var currentIndex = _.indexOf(currentValues, modifiedValue);
      var currentId = currentTodos[currentIndex].id;
      modifiedValue.id = currentId;
      currentValues[currentIndex].id = currentId;

      var putRequest = new XMLHttpRequest();
      putRequest.open("PUT", "/todos/" + modifiedValue.id);
      putRequest.setRequestHeader("Content-type", "application/json; charset=utf-8");
      putRequest.send(JSON.stringify(modifiedValue));

   } else if (currentValues.length === currentTodos.length - 1) { // deletion
      var deletedValue = _.find(currentTodos, function(e) {
         return _.isEmpty(_.where(currentValues, e));
      });

      // find correct id for deletedValue
      deletedValue.id = currentTodos[_.indexOf(currentTodos, deletedValue)].id;

      var deleteRequest = new XMLHttpRequest();
      deleteRequest.open("DELETE", "/todos/" + deletedValue.id);
      deleteRequest.send();

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

var prepareInput = function(key, value) {

   var result = [];

   switch (key) {
      case "todos-jquery":
         _.each(value, function(e) {
            var newitem = _.pick(e, "completed", "title");
            result.push(newitem);
         });
         break;
      case "todos-knockoutjs":
         _.each(value, function(e) {
            if (!_.has(e, "completed")) {
               e.completed = false;
            }
            var newitem = _.pick(e, "completed", "title");
            result.push(newitem);
         });
         break;
      default:
         throw {
            message: "unknow framework " + framework
         };
   }
   return result;

};