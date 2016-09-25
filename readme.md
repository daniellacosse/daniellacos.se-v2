# daniellacos.se
### version 2

i'm sick of these frameworks. let's cut out the "muddle man"

### TODO:
* media/gallery/sharing icons
* permalink route
* sharing

* favorites — "star"
* filter toggles
* attach more sources/documents/infinite scrolling
  * XHRHttpRequest to server
  * hardest part of this whole thing is ensuring feed is consistent and ordered from all sources

* productionizing
  * aws deploy script

* known bugs (check TODOs)
  * hiding tooltips properly
    * make them pointy on one end
  * camelcase property leak
  * the fucking icon font travesty
  * don't squish the articles so much on resize
  * babel & compressor not working (opera)
  * close arrow button doesn't pin to top
  * improve deploy script further

* resize, scroll, keypress window event listeners
  * save scroll depth
  * "infinite scrolling"
  * responsiveness (but I don't think we need to do too much)
  * navigate with arrow keys

* browser support
  * IE
    * don't bother: alternate message, link to chrome
  * safari
    * text flash on transition (backface-visibility issue, probably)
  * mobile
    * doesn't quite fit

* preprocess image & iframe body tags.
 * load on scroll (img & iframe)

* for show:
  * debugging/error handling
  * reload server on file change (webpack-dev-server?)
  * tests

  NOTES: list of sources
    tumblr
    twitter
    medium (soon)
    vine   (maybe?)
    youtube
    vimeo
    soundcloud
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
