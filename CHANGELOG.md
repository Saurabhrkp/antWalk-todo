# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.3.0](///compare/v1.2.0...v1.3.0) (2024-06-14)


### Features

* **auth:** adds auth route with register & login endpoints e003cf1
* **auth:** adds authentication middleware for todo route 86ad285
* **email:** adds email sender function 9a9ab19
* **env:** adds jwt & email env variables 2345fb7
* moves logger to helper folder a39e715
* **todos:** adds new todos api endpoints for CRUD fb4bf91


### Bug Fixes

* fixes import and param name 5385fc4
* updates email body 916ca16

## [1.2.0](///compare/v1.1.0...v1.2.0) (2024-06-14)


### Features

* **auth:** adds jwt tokens functions ba2f7aa
* **sql:** updates database init sql file ea86655
* **www:** adds database connection in www file 0d3f172

## [1.1.0](///compare/v0.0.9...v1.1.0) (2024-06-14)


### Features

* adds scripts and packages requires for app 71a79ea
* **babel:** adds babel config for running es6 fcb98e4
* **database:** adds database file eec103f
* **init:** adds init.sql file for initialiting database tables 0cc25c4

### 0.0.9 (2024-06-13)


### Features

* adds config file to get env vars cdd5341
* adds empty index route 2954e19
* adds logger to logger data for debugging 6d7cfa0
* **apilogger:** adds new api logger for logging api requests 7f163de
* **app:** adds main express server app file e8866ab
* **www:** adds main http server file to boot express app 6697949
