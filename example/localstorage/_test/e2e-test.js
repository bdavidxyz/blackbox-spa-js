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
    it('Should get all items', function() {
        // set up
        browser().navigateTo("/localstorage/" + QueryString.fw);
        jQueryFunction('input#new-todo', 'val', 'anotherTodo');
        jQueryFunction('input#new-todo', 'change');
        fireEnterOn('input#new-todo');        
        pause();
    });
});