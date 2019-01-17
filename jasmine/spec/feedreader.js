/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /*
         * This function tests allFeeds variable has been defined
         * and that it is not empty.
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a function that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('feed urls should be defined and not empty', () => {
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            };
        });

        /* This is a function that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('feed names should be defined and not empty', () => {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            };
        });
    });


    /* New test suite named "The menu" */
    describe('The menu', () => {
        /* This is a function that ensures the menu element is
         * hidden by default.
         */
        it('menu should be hidden by default', () => {
            expect( $('body').hasClass('menu-hidden') ).toBe(true);
        });

         /* This is a function that ensures the menu changes
          * visibility when the menu icon is clicked. This test has
          * two expectations: does the menu display when clicked and
          * does it hide when clicked again.
          */
         it('should be visible when clicked and hidden when clicked', () => {
             let sideMenu = $('body'),
             menuIcon = $('.menu-icon-link');
             menuIcon.click();
             expect( $(sideMenu).hasClass('menu-hidden') ).toBe(false);
             menuIcon.click();
             expect( $(sideMenu).hasClass('menu-hidden') ).toBe(true);
         });
    });

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* This is a function that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        it('entries should be more than 0', (done) => {
            let entriesLen = $(".feed .entry").length;
            expect(entriesLen).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
