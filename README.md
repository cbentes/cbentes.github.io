# Personal Website

This website is based on the al-folio template.
https://github.com/alshedivat/al-folio


## Setup

Run locally:
```
bundle exec jekyll serve
```

Build:
```
rm -rf _site
bundle exec jekyll build
```

Deploy:
```
git subtree push --prefix _site origin gh-pages
```
