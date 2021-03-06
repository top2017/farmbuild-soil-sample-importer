<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [FarmBuild Soil Sample Importer](#farmbuild-soil-sample-importer)
  - [Getting Started](#getting-started)
  - [Units](#units)
  - [Exception handling](#exception-handling)
  - [Google Analytics for tracking API usage](#google-analytics-for-tracking-api-usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# FarmBuild Soil Sample Importer

This is the soil sample importer module of farm build JavaScript library.


## Getting Started

To get you started use the navigation on the left side of this page to explore different function of soil sample importer.


## Units
In all calculations we are using metric units.

## Exception handling
All functions return undefined in case that there is an error related to wrong input values.

## Google Analytics for tracking API usage
DEDJTR wants to understand the usage of the API, so please include the below API when you call calculate function.
The track API calls GA using its own tracking name so you can embedded in your application even though you already have
GA implementation.

Example
```
var organisationName = 'your organisation name';
//Calling the track API for the usage
farmbuild.soilSampleImporter.ga.trackSoilSampleImporter(organisationName);
```

