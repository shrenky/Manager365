## manager365

Webpart built on SharePoint Framework to explore, manage SharePoint online resources.

Version 1.0 features (current version):<br/> 
1. Explore SharePoint online by different levels: tenant, site collection, site <br/>
   Administrator is able to specify level in webpart configuration. --Todo <br/>
   Administrator is able to configure specified sites to explore. --Todo <br/>
   User is able to explore sites, lists, views, fields, etc. --Todo <br/>
   User is able to view sites/lists/views/fields properties. --Todo <br/>
   Mock SharePoint data. --Todo <br/>
   Test by jest framework. --Todo <br/>
   Office fabric UI. --Todo <br/>
   
Version 2.0 features: <br/><br/>
2.  Manage site, list, items, fields, users --Todo <br/>
3.  Log Administrator actions in specified list (support undo?) --Todo <br/>


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
