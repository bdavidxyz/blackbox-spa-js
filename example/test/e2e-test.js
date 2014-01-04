/*global describe*/
/*global it*/
/*global browser*/
/*global expect*/
/*global repeater*/
/*global jQueryFunction*/
/*jslint node: true */

"use strict";


describe('Starting application', function () {
    it('Should display main view', function () {
        browser().navigateTo("/" + ROOT_URL);
        
        //jQueryFunction('body', 'focus');
        activateXHRlog();
        pause();
        jQueryFunction('input.toggle:eq(1)', 'click');
        
        // also works
        // element('input.toggle:eq(1)').click();
        expect(lastRequest("PUT").body()).toEqual({"title":"item1","completed":true, "id":1});
        expect(lastRequest("PUT").url()).toEqual("/todos/1");
    });
});