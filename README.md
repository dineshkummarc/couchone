# Couchio Hosting Signup and Invite App

Hello and welcome to the Readme! This app is used by Couchio for invite code requests and usage.

## Setup

To install, couchapp push this to a database, and then configure CouchDB to have a vhost like:

    local.couchone.com:5984 = /couchone/_design/couchone/_rewrite

Or probably actually more like:

    api.couchone.com = /couchone/_design/couchone/_rewrite

This app can coexist with the couchone api server just fine (as long as no one needs databases on it called any of: style, images, vendor, invite.) That's right, don't install it in a db called "invite."

Once you have the app installed, visit your server's `/` path and you should see the invite request form.

## Care and Feeding

The basic plan is that we have documents that look roughly like:

    {
       "_id": "419114634b8c23979ce8de0e78000642",
       "_rev": "6-e78d983c9e0e86a3881be587385a0e21",
       "type": "invite",
       "state": "ready",
       "invite_email": "jchris@couch.io",
       "subdomain": "jchris",
       "signup_email": "jchris@couch.io"
    }

The important field is `state`. It starts out as "request" if an end user created it from the request form, or "open" if we created from our backlog of invite requests. When we decide to invite the user, we change the state to "open", and send an email with a URL like [http://api.couchone.com/invite/419114634b8c23979ce8de0e78000642](http://api.couchone.com/invite/419114634b8c23979ce8de0e78000642). 

Then the user visits, claiming their invite and choosing a subdomain. When they do that, they save the doc with a state of "rsvp", and the deploy bot can get to work.

The deploy bot can then go in and do a bunch of stuff (with whatever state transitions are needed.) When the CouchDB server is ready and running, the deploy bot (needs to be logged into the couchone API server as a user with the role "deploy") can save the invite doc with the state "ready". At that point the user will see the page refresh with a link to Futon on their CouchDB subdomain. (I still need to write the magic refresh code. For now, the user can manually refresh the page. I'm gonna write that refresh code tomorrow.)

## TODO

create new host
  UNIQUE CHECK on subdomain

install initial couchapps

config vhosts
