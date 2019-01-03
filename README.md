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
   
   Webpart contains: <br/>
   <ul>
      <li>header (command bar)</li>
      <li>tree (left panel)</li>
      <li>properties (right panel)</li>
      <li>footer (status bar)</li>
  </ul>
   Treeview containing site collection and related components, like:</br>
  <ul><li>Subwebs (including App Webs)
  <li>List and libraries</li>
  <li>Site Columns</li>
  <li>Content Types</li>
  <li>Items and Field Values</li>
  <li>Views</li>
  <li>Features (activated)</li>
  <li>Site Users</li>
  <li>Site Groups</li>
  <li>Associated Visitor, Member and Owner groups</li>
  <li>Taxonomy (Term Store)</li>
  <li>User Profiles</li>
  <li>Workflows Templates</li>
  <li>Workflow Associations</li>
  <li>Event Receivers</li>
  <li>Properties</li>
  <li>List Templates</li>
  <li>Push Notifications</li>
  <li>Web Templates</li>
  <li>Role Assigments</li>
  <li>Role Definitions</li>
  <li>Recycle Bin (first and second stage)</li>
  <li>Root Folder including subfolders and files</li>
  <li>User Custom Actions</li>
  <li>Project Policies (Site Closure and Deletion)</li>
</ul>
The treeview includes the hidden objects (shown in gray) next to the default objects </br>
Show Treenode properties on property panel, property panel contains:</br>
<ul><li>"Properties"-tab shows all selected class properties<li>
  <li>"Raw Data"-tab shows the list items based on the columns of a list or library</li>
<li>"Schema XML"-tab shows the schema XML for List, Content Type, Field and View</li></ul>
</br>
Status bar showing selected node / object class
   
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
