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
        
// $('#new-todo').val('456');
// $('#new-todo').change();

// var e = jQuery.Event( 'keyup', { which: 13 } );
// $('#new-todo').trigger(e);
        pause();
        //element('input#new-todo').val("voila");
        jQueryFunction('input#new-todo', 'val', 'voila2');
        pause();
        jQueryFunction('input#new-todo', 'change');
        pause();
        fireEnterOn('input#new-todo');


        // // hack for input from keyboard
        // var evtInput = document.createEvent('Event');
        // evtInput.initEvent('input', true, false);
        // element('input#new-todo').query(function(el, done) {
        //     el[0].dispatchEvent(evtInput);
        //     done();
        // });
        pause();
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
    it('Should be able to edit task description', function() {
        //
    });
});