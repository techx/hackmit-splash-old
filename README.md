# hackmit-splash
This is the HackMIT Splash Page.

Since this Github pages, the public-facing branch is `gh-pages`. Therefore, `gh-pages` is a sacred branch, do not commit there unless you are 100% certain it is deploy-ready.

To deploy, push to `master`. Wait 30 seconds. Then it shows up on staging.hackmit.org. When you are 100% absolutely sure merge `master` into `gh-pages`.


Testing
-------

To view the splash page on your own computer, simply run `python -m SimpleHTTPServer` in this directory. Then, go to `http://localhost:8000` to view your version.

Dev
---

Make sure to compile your scss appropriately. Something like `sass --watch /some/path/hackmit-splash/stylesheets/scss:/some/path/hackmit-splash/stylesheets` suffices.