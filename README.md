# Feedreader Project

## Project Overview

In this project you are given a web-based application that reads RSS feeds. All of the functions necessary for using the feed reader are included in the [app.js](js/app.js) file. This project also includes the web/testing suite [Jasmine](http://jasmine.github.io/). All the different tests were performed in the [feedreader.js](jasmine/spec/feedreader.js) file. Provided below will be a list of the different tests and the methods to perform each test.

---
## Test Types and How to Successfully Perform Each Test

### RSS Feeds
1. Test if the feeds array in the slide-menu have content.
   * **Pass**: Ensure that allFeeds has at least one item in the array.

   * **Example**:
   ```
   var allFeeds = [
    {
        name: 'Udacity Blog',
        url: 'http://blog.udacity.com/feed'
    };
   ```
2. Test if the feeds' urls property in the slide-menu are defined and none of them are empty.
   * **Pass**: Ensure that each item in the allFeeds array has a url property with at least 1 character.

    * **Example**: Incorrect: ~~`url;`~~ Instead: `url: 'http://blog.udacity.com/feed'`
3. Test if the feeds' names property in the slide-menu  are defined and none of them are empty.
   * **Pass**: Ensure that each item in the allFeeds array has a name property with at least 1 character.

   * **Example**: Incorrect: ~~`name;`~~ Instead: `name: 'Udacity Blog'`

### The Menu
1. Test if the slide-menu is hidden by default.
   * **Pass**: Ensure that when the `body` tag has the `'.menu-hidden'` class.

    * **Example**: `$('body').hasClass('menu-hidden');`
2. Test the visibility of the slide-menu item. Also check if the menu icon is clicked once to "show" then clicked again to "hide".
   * **Pass**: Ensure that when `menu-icon` is `clicked` the `'menu-hidden'` class is toggled on and off.

   * **Example**:
   ```
   menuIcon.click();
   expect(feedListMenu.hasClass('menu-hidden')).toBe(false);
   ```

### Initial Entries
1. Test the existance of any entries resulting from loading a given feed.
   * **Pass**: Ensure that the `loadFeed(feed,done)` function is called and completed. Then check if there are at least 1 entry in the `entriesLinks` variable.

   * **Example**:
    Make sure the feed is loaded and complete first.
   ```
    beforeEach((done) => {
        loadFeed(feed, done);
    });
   ```
   There should be one entry or more
   ```
    let entriesLen = $(".feed .entry").length;
    expect(entriesLen).toBeGreaterThan(0);
   ```

### New Feed Selection
1. Test if new entries are loaded after another feed from the slide-menu is clicked.
   * **Pass**: Ensure that `loadFeed(feed,done)` function is called and completed. Click another feed from the slide-menu. Then make sure  `loadFeed(secondFeed,done)` is called and completed. Check and confirm that the current entries are different from the origional entries loaded.

   * **Example**:
    Make sure the feed is loaded and complete first and saved for comparison.
   ```
    beforeEach((done) => {
        loadFeed(feed, done);
        Array.from(currentFeeds).forEach(feed => {
        arrayOfFirstFeeds.push(feed);
        });
    });
   ```
   Load second feed
   ```
   loadFeed(secondFeed, done);
   ```
   Check if a feed from the slide-menu was clicked
   ```
   feedList= $('.feed-list');
    feedList.click();
    expect(feedListMenu.hasClass('menu-hidden')).toBe(true);
   ```
   Compare the array of the first feed against the second feed
   ```
    for (let index = 0; index < arrayOfFirstFeeds.length; index++) {
        expect(arrayOfFirstFeeds[index] === arrayOfSecondsFeeds[index]).toBe(false);
    }
   ```

## Additional Test

### Initial Entries (Continued)

2. Test if the urls from the loaded entries are defined and none of them are empty.
   * **Pass**: Ensure that the `loadFeed(feed,done)` function is called and completed. Then check each `entriesLinks` item to make sure there is a `link` that is defined and not empty.

   * **Example**:
   Make sure the feed is loaded and complete first.
   ```
    beforeEach((done) => {
        loadFeed(feed, done);
    });
   ```
   Convert `entriesLinks` to an array.
   ```
    Array.from(entriesLinks).forEach(link => {
        arrayOfEntryLinks.push(link);
    });
   ```
   Ensure each array item is defined and not empty.
      ```
    for (entryLink of arrayOfEntryLinks) {
        expect(entryLink).toBeDefined();
        expect(String(entryLink).length).toBeGreaterThan(0);
    }
   ```