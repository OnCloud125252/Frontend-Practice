# Frontend Skills

This website demonstrates popular frontend optimization techniques such as denouncing, throttling, and more.  
Using these techniques may help *improve page load times*, *decrease server load*, and *enhance overall user experience*.  

## Debouncing
A technique used to prevent a server from being overwhelmed with requests by limiting the number of requests that can be made within a certain time frame.  

In this example, debouncing was used to prevent the search function from being triggered too often while the user is typing.  
There's a settings panel that allows the user to choose how many seconds should elapse before triggering the search function, as well as an option to specify how many search results should be shown.

### Popular Use Cases of Debouncing
- Search bar  
    > When a user types into a search bar, it's common for the search function to be triggered after a short delay to prevent unnecessary requests. Debouncing can be used to limit the number of search requests made by delaying the search function until the user has stopped typing.

- Scroll events  
    > Websites often use scroll events to trigger animations or load more content as the user scrolls down the page. Debouncing can be used to prevent multiple scroll events from firing rapidly, which can cause performance issues.

- Button clicks  
    > In some cases, clicking a button can trigger an action that sends requests to a server, such as submitting a form. Debouncing can be used to limit the number of requests made when a user clicks a button multiple times in quick succession.