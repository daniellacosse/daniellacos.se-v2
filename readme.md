# [daniellacos.se](http://daniellacos.se)
### version 2

i'm sick of these frameworks. let's cut out the "muddle man"

## overview

I was running into some issues with [my old setup](http://v1.daniellacos.se):

* **Long loading tail** — several factors contributed to this; lack of SSR, no logic around intelligently loading external dependencies, no concentrated effort to cull # of requests made.
* **Lack of reliable platform service** — Heroku _says_ they don't put your dynos to sleep when you pay them money, but I've found that to not always be the case.
* **Angular.js** — what more do I need to say

Originally I'd planned to switch to the FED's 2016 poster boy, [React.js](https://facebook.github.io/react/), but considering the frameworks' sizable footprint _(~450kB)_ relative to the amount I wanted to achieve with my little portfolio I hand-roll my own thing. The end result?

> _30kB, single-request pages._ **Split-second page loads.** Clean. Elegant. Precise. Bold.

### what I did

Right now the lion's share of the server side code is DRYed up in the [helpers](https://github.com/daniellacosse/daniellacos.se-v2/tree/master/helpers) folder, with the following high-level s:  

##### [routing](https://github.com/daniellacosse/daniellacos.se-v2/blob/master/helpers/routing), [api](https://github.com/daniellacosse/daniellacos.se-v2/blob/master/helpers/api)

Largely the home to a ES6 [Route](https://github.com/daniellacosse/daniellacos.se-v2/blob/master/helpers/routing/index.js) class.

Each endpoint on the public-facing API is represented by a file in the [routes](https://github.com/daniellacosse/daniellacos.se-v2/tree/master/routes) folder, extending the base `Route` class with the following properties:

* `static path -> <String>` :: the express path template string
* `static cacheLifeInDays -> <Integer>` :: the number of days template results should be stored in the server's `_CACHE` folder
* `prefetch -> <Promise>` :: executed to pull in any necessary external data in order to hydrate the final response dispatch
* `dispatch -> response` :: returns the final response. Usually the result of a templating function. Return type is usually inferred by express.

_(TODO: about api fetchers)_

##### [document](https://github.com/daniellacosse/daniellacos.se-v2/blob/master/helpers/document)

The [Document](https://github.com/daniellacosse/daniellacos.se-v2/blob/master/helpers/document/index.js) class is meant to serve as the validation & curation chokepoint for all incoming data. The external fetchers in the [api](https://github.com/daniellacosse/daniellacos.se-v2/blob/master/helpers/api) folder have been setup to exclusively return Document collections to ensure a consistent schema across the 3rd party data I'm pulling in.

##### [asset](https://github.com/daniellacosse/daniellacos.se-v2/blob/master/helpers/asset), [templating](https://github.com/daniellacosse/daniellacos.se-v2/blob/master/helpers/templating)

Here I'm basically just abusing `DataURI`s and javascript's  `replace` function to load up all the scripts, styles and even image/font assets I need into a single file before sending it to the client. It's a pretty ham-fisted way of jamming in SSR and Code Splitting.

### the client

Now you may have noticed I actually don't seem to have a lot of HTML flying around here, that most of my templating seems to be pulling in and hydrating via scripts only.

Basically, while I knocked react's size, all I've really done is implemented a "micro framework" (really just a handful of methods) that heavily leverage the DOM's native API. It's heavily inspired by what React's actually doing. But with less features, more functional, and so less code.

##### [the "framework"](https://github.com/daniellacosse/daniellacos.se-v2/tree/master/client/_framework_)

At the moment, the entirety of this "micro framework" lives in a single, special folder in the client section of the code. The responsibilities of this code are two-fold: create and manage DOM elements, and store/retrieve data from `window.sessionStorage`.

All methods that manage the DOM are prepended with a `$` by convention, reminiscent of jQuery. The most essential of these is `$createElement`:

```js
const TEST_ELEMENT_ID = "testElement";
const TEST_ELEMENT_STYLE = {
  "font-size": "12px",
  "background": "white",
  "color": "black"
};

$createElement({
  id: TEST_ELEMENT_ID,
  name: "span",
  style: TEST_ELEMENT_STYLE,
  children: [
    $createElement({
      text: "Hello World!"
    })
  ],
  onMouseOver: "testElementHover()"
})
```

This element is then registered in the `window._COMPONENT_REGISTRY_` for later reference under its ID. [`$changeElements`](https://github.com/daniellacosse/daniellacos.se-v2/blob/master/client/_framework_/changeElement.js) uses this ID to then later locate the elements should you want to make changes at another time in a single transaction.

When doing so it's helpful to create different state objects in delta over the current properties of the element, like so:

```js
  const TEST_ELEMENT_STYLE$HOVER = {
    style: {
      ...TEST_ELEMENT_STYLE,
      "background": "black",
      "color": "white"
    }
  }

  function testElementHover() {
    $changeElements({
      [TEST_ELEMENT_ID]: {
        style: TEST_ELEMENT_STYLE$HOVER
      }
    })    
  }
```

That's the general idea. You can see more examples in the client's [component](https://github.com/daniellacosse/daniellacos.se-v2/tree/master/client/components) section.

Storage methods don't have any sort of convention, though I'm considering using the underscore to denote them. Most of these are simple, and act as convenience methods for accessing common resources.

_(TODO: storage/retrievers)_

### roadmap

#### — v2 —

* twitter & github oembeds

<hr>
#### — v2.1 (by 2017) —

* tags
* google drive support
* vimeo, gists
* permalink route & sharing
* help & contact menu
* **bug:** mobile doesn't quite fit
* **bug:** close arrow/share button don't pin to top


<hr>
#### — v2.2 (by Q2 2017 **MLP**) —

* duplicates management (circa override, manual override)
* favorites toggle & management

<hr>
#### — v2.2.1 —

* detail scroll & window keypress event listeners
  * **detail:** preprocess image & iframe body tags to load on scroll (image & iframe)
  * **detail & list:** save scroll depth

<hr>
#### — v2.2.2 —

* IE alternate message, link to chrome
* show private posts

<hr>
#### — v2.3 —

* infinite scrolling - JSON XHRHttpRequest to server omnipoint
* search bar
