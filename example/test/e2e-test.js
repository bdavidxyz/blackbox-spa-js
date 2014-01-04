/*global describe*/
/*global it*/
/*global browser*/
/*global expect*/
/*global repeater*/
/*global jQueryFunction*/
/*jslint node: true */
/*global element */
/*global lastRequest */
/*global ROOT_URL */
/*global activateXHRlog */
/*global pause */

"use strict";


describe('Starting application', function() {
    it('Should display defaults elements', function() {
        // set up
        browser().navigateTo("/" + ROOT_URL);
        activateXHRlog();

        // assert
        expect(repeater('input.toggle').count()).toEqual(3);
        expect(element('li:eq(0)').text()).toMatch("item0");
        expect(element('li:eq(1)').text()).toMatch("item1");
        expect(element('li:eq(2)').text()).toMatch("item2");

    });

    it('Should be able to toggle completion', function() {
        element('input.toggle:eq(1)').click();
        expect(lastRequest("PUT").body()).toEqual({
            "title": "item1",
            "completed": true,
            "id": 1
        });
        expect(lastRequest("PUT").url()).toEqual("/todos/1");
    });
    it('Should be able to add a new item', function() {
        jQueryFunction('input#new-todo', 'val', 'anotherTodo');
        jQueryFunction('input#new-todo', 'change');
        fireEnterOn('input#new-todo');
        expect(lastRequest("POST").body()).toEqual({
            "title": "anotherTodo",
            "completed": false,
            "id": 4
        });
        expect(lastRequest("POST").url()).toEqual("/todos");
    });
    it('Should be able to toggle completion', function() {
        element('input.toggle:eq(3)').click();
        expect(lastRequest("PUT").body()).toEqual({
            "title": "anotherTodo",
            "completed": true,
            "id": 4
        });
        expect(lastRequest("PUT").url()).toEqual("/todos/4");
    });
    it('Should be able to edit task description', function() {
        //
    });
});