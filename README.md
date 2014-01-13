# BlackboxJS


blackbox testing framework of any Single Page Application written in JS.

> "a functionnal test tool of a single page application should correctly check both 
> input (eg. visual content) and 
> output (eg. REST calls) 
> of the system under test."

## Version

 - 0.0.1 "very new"


## Motivation


- Main motivation : a functionnal test tool of a single page application should correctly check both input (visual content) and output (REST calls) of the system under test.
- Functionnal testing should be easy to read and write, so that businness and devs can talk about it.
- Such a tool must be technology agnostic, so that the functionnal test suite could be kept "as is" when upgrading or changing MVC framework.


## Docs

- BlackboxJS is a fork of [ngScenario](https://github.com/angular/bower-angular-scenario), so all docs about how to install, how to run, etc, applies.
- Input : User event should be fired with the [jQueryFunction](http://stackoverflow.com/questions/16400720/how-to-execute-jquery-from-angular-e2e-test-scope), see the sample in the example/restful/_test directory. There is also an attempt to fire any keyboard event, for example :

~~~.language-javascript
 fireEnterOn('input#new-todo');
~~~

- Output : All matchers of the original ngScenarios works, so the official docs apply. Moreover, you can test which last XHR request was sent :

~~~.language-javascript
expect(lastRequest("POST").body()).toEqual({
            "title": "anotherTodo",
            "completed": false,
            "id": 4
        });
~~~

There is also an adapter for localStorage
~~~.language-javascript
expect(windowLocalStorage("todos-" + QueryString.fw).getItem()).not().toContain("editing");
~~~


## Run the examples
1. Download the project
2. Install [node and npm](http://www.nodejs.org)
3. Go to the example folder and run `npm install` 
4. Run `node app.js` 

## Limitations

- The system under test runs in a iframe, which could be sometime a problem.
- Mouse gesture can not be simulated
- As of now, only MVC frameworks that integrates nicely with jQuery can use the tool.

## Credits

- blackbox-spa is a fork from [ngScenario](https://github.com/angular/bower-angular-scenario). However, ngScenario can not be used outside the Angular world. The tool has been hacked so that any javascript application could be blackbox-tested.
- Samples under test are all part of the TodoMVC project.

## TODOs :

- Extends the matchers so that any JS object can be easily asserted
- Find a way to trigger the events without jQuery
- Build a website with demo

## Final word

Any help, critiscism and comment, even bad ones, are warmly welcomed !