# daniellacos.se
### version 2

i'm sick of these frameworks. let's cut out the "muddle man"

### TODO:
* permalink route
* sharing

* favorites — "star"
* filter toggles
* attach more sources/documents/infinite scrolling
  * count? omnipoint
  * XHRHttpRequest to server
  * hardest part of this whole thing is ensuring feed is consistent and ordered from all sources

* productionizing
  * deploy script (gulp)

* known bugs (check TODOs)
  * hiding tooltips properly
    * make them pointy on one end
  * camelcase property leak
  * don't squish the articles so much on resize
  * close arrow/share button doesn't pin to top

* resize, scroll, keypress window event listeners
  * save scroll depth
  * "infinite scrolling"
  * responsiveness (mobile doesn't quite fit - but I don't think we need to do too much)
  * navigate with arrow keys

* browser support
  * IE
    * don't bother: alternate message, link to chrome
  * safari
    * text flash on transition (backface-visibility issue, probably)

* preprocess image & iframe body tags.
 * load on scroll (img & iframe)

* for show:
  * debugging/error handling
  * tests

  NOTES: list of sources
    tumblr (X)
    twitter (~)
    medium (soon)
    vine   (maybe?)
    youtube
    vimeo
    soundcloud (X)
    github (repo/gist)

    s3 - there has to be a better option here
    google drive public folder?

    ** sane 'favorites' management **
    ** sane 'duplicates' management **

  categories
    favorites
    text
    media
    code
    gallery

  (icons for media/gallery/sharing)
