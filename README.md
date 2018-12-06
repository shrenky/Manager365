## manager365

Webpart built on SharePoint Framework to manage SharePoint online.

Version 1.0 features (current version): 
1.  Explore SharePoint online by different levels: tenant, site collection, site
    Administrator is able to specify level in webpart configuration. --Todo
    Administrator is able to configure specified sites to explore. --Todo

Version 2.0 features:
2.  Manage site, list, items, fields, users --Todo
3.  Log Administrator actions in specified list (support undo?) --Todo



### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
