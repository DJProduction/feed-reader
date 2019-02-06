/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
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
        let feedListMenu = $('body');
        /* This is a function that ensures the menu element is
         * hidden by default.
         */
        it('menu should be hidden by default', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* This is a function that ensures the menu changes
         * visibility when the menu icon is clicked. This test has
         * two expectations: does the menu display when clicked and
         * does it hide when clicked again.
         */
        it('should be visible when clicked and hidden when clicked', () => {
            let menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect(feedListMenu.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(feedListMenu.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* This is a function that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach((done) => {
            loadFeed(0, done);
        });
        it('entry should be more than 0', (done) => {
            let entriesLen = $('.feed .entry').length;
            expect(entriesLen).toBeGreaterThan(0);
            done();
        });

        /* This is a function that loops through each entry url
         * in a feed object and ensures that the url is defined
         * and the url is not empty.
         */
        it('urls of entries should be defined and not empty', () => {
            let entriesLinks = $('.feed .entry-link');

            //Loop through each entry and check values
            entriesLinks.each((index, element) => {
                // Ensures each entry link is defined
                expect($(element)).toBeDefined();
                // Ensures entry link url is not equal to 0
                expect($(element).attr('href').length).toBeGreaterThan(0);
            });
        });
    });

    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        /* This is a asynchronous function that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let currentFeeds, // Current list of feeds being displayed
            secondFeeds; // second list of feeds being displayed

        // Uses callback function to load the 2 feeds and ensure the second
        // feed does not load until the first feed is done
        // Places each loaded feeds into an array
        beforeEach((done) => {
            loadFeed(0, () => {
                currentFeeds = $('.feed').html();
                loadFeed(1, () => {
                    secondsFeeds = $('.feed').html();
                    done();
                }); // end of second loadFeed
            }); // end of first loadFeed
        });

        it('should load new feed when new feed list item is selected', () => {
            expect(currentFeeds !== secondFeeds).toBe(true)
        });
    });
}());
