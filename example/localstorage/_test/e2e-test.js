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
/*global sleep */
/*global pause */
/*global fireEnterOn */
/*global QueryString */

"use strict";


describe('Starting application', function() {

    describe('No todos', function() {

        it('Should NOT display main section when there are no item', function() {
            // set up
            browser().navigateTo("/localstorage/" + QueryString.fw);


            expect(repeater('section#main').count()).toEqual(1);
            expect(element('section#main:visible').count()).toBe(0);
        });
        it('Should NOT display footer section when there are no item', function() {
            // set up
            expect(repeater('footer#footer').count()).toEqual(1);
            expect(element('footer#footer:visible').count()).toBe(0);

        });
    });
    describe('New todo', function() {
        it('Should display a section with input to add a new todo', function() {
            // set up
            expect(repeater('input#new-todo').count()).toEqual(1);
            expect(element('input#new-todo:visible').count()).toBe(1);
        });
        it('Should create a new todo on enter, clearing input text, adding it to the list', function() {
            jQueryFunction('input#new-todo', 'val', 'a first todo');
            jQueryFunction('input#new-todo', 'change');
            expect(element('input#new-todo').val()).toBe('a first todo');
            fireEnterOn('input#new-todo');
            expect(element('input#new-todo').val()).toBe('');
            expect(element('section#main:visible').count()).toBe(1);
            expect(element('ul#todo-list > li').count()).toBe(1);
            expect(element('ul#todo-list > li:eq(0) > div > label').text()).toBe('a first todo');
        });
        it('Should trim() the text when adding a new todo', function() {
            jQueryFunction('input#new-todo', 'val', ' a second todo ');
            jQueryFunction('input#new-todo', 'change');
            fireEnterOn('input#new-todo');
            expect(element('ul#todo-list > li').count()).toBe(2);
            expect(element('ul#todo-list > li:eq(1) > div > label').text()).toBe('a second todo');

        });

    });

});