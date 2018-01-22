# MARVELOUS MUNIs

Coding project for ThousandEyes

For this project, you will be using d3.js (http://d3js.org) to draw the real-time positions of San Francisco's buses and trains (SF Muni).

## What To Do

- [x] Draw a base map of San Francisco using the given GeoJSON
- [x] Draw SF Muni vehicles
- [x] Dynamically update their locations every 15 seconds. Use NextBus real-time data feed: http://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf
- [x] Transition vehicles from one position to the next
- [x] Provide a separate HTML control for selecting a subject of routes to show. Only vehicles of the selected routes should be drawn on the map.

## Commands

### Running the App
`yarn install`  
`yarn start`

### Running Tests
`yarn test`

## Notes

Thanks for the coding project! It was really fun to get the chance to work with D3, SVGs, and React all in a single exercise. I'm sure I just scratched the surface, but I definitely learned plenty along the way.

I wanted to take this section to highlight some areas that need work and some technical oddities

* Performance, performance, performance! The Chrome timeline tool is reading about ~15FPS when the vehicles transition. That's pretty unacceptable and if given more time I wanted to find more optimized ways to transition the vehicles from point A to point B. On top of this, I have an eventListener that tracks the resizing event of the window to scale the SVG accordingly. Unfortunately, this is also a pretty taxing event. Some steps I've taken to lessen this effect was to use `shouldComponentUpdate` and `PureComponents` to reduce the number of renders that were being fired.

* By simply removing the streets from the SVG (line 33 of `BaseMap.js`), the performance jumps to around ~40 FPS. Generating those paths are incredibly expensive, and if given more time I'd like to find more ways to create a more performant experience. 

* I've opted to use a wrapper component to encapsulate the application state. `AppState` wraps the relevant data for the app and passes a callback to set it. This was just a quick and convenient way to handle the app's state in a 'global' object. This is also where I made the application a function of the window's `width` and `height` by saving it in the appState. This allowed me to do transformations on the SVG when the window changed. Again, this needs more optimization.

* The application is primarily driven by two states: routeList and vehicleData. `Routelist` is an object who's keys are the routeTags. This allows us to assume a O(1) lookup when asking whether a vehicle should be visible or not when using its routeTag to query routeList. The `initial-route-list.json` initializes all the routes as visible and receives updates from the NextBus network call in `RouteControl.js` component. 

* The `vehicleData` is simply a list of vehicles and their associated geographic data fetched from the NextBus services.

Overall, I had a great time putting all this together. If there are any questions please feel free to reach out to me at bteng22@gmail.com