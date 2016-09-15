# hackmit-splash
This is the HackMIT Splash Page.

We've configured Github pages to look at the `master` branch. Therefore, `master` is a sacred branch, do not commit there unless you are 100% certain it is deploy-ready.

Testing
-------

To view the splash page on your own computer, simply run `python -m SimpleHTTPServer` in this directory. Then, go to `http://localhost:8000` to view your version.

Dev
---

Make sure to compile your scss appropriately. Something like `sass --watch /some/path/hackmit-splash/stylesheets/scss:/some/path/hackmit-splash/stylesheets` suffices.

Here's a good script to convert logo images: `mogrify -trim -resize 500 -transparent white -format png assets/images/logos/*`

License
-------

Copyright (c) 2016 HackMIT. Released under CC BY-SA. See the [license](LICENSE.md) for details.
