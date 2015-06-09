/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

angular.module('farmbuild.soilSampleImporter')
    .factory('importFieldSelector',
    function ($log, farmdata, soilSampleImporter, importFieldTypes,
              collections, importFieldSelectionValidator) {
        $log.info("importFieldSelector ");

        var importFieldSelector = {},
            _paddocks = [],
            _types = importFieldTypes.toArray();


        importFieldSelector.createNew = function(myFarmData, columnHeaders, rows, paddockColumnIndex) {

            if(!importFieldSelectionValidator.validateCreateNew(columnHeaders, rows)) {
                return undefined;
            }

            _paddocks = myFarmData.paddocks;
            importFieldSelector.paddocks = _paddocks;

            var result= {
                "dateLastUpdated": new Date(),
                "results": {
                    "columnHeaders": columnHeaders,
                    "rows": rows
                },
                "importFieldDictionary": {},
                "paddockRowDictionary": {},
                "paddockNameColumn":paddockColumnIndex
            };
            return result;
        }


        importFieldSelector.save = function(myFarmData, importFieldsDefinition) {
            $log.info(JSON.stringify(importFieldsDefinition));

            if (!importFieldSelectionValidator.validateImportFieldsDefinition(importFieldsDefinition)) {
                return undefined;
            }

            for (var key in importFieldsDefinition.paddockRowDictionary) {
                for(var i=0; i<importFieldsDefinition.paddockRowDictionary[key].length; i++) {
                    var rowIndex = importFieldsDefinition.paddockRowDictionary[key][i];
                    importFieldsDefinition.results.rows[rowIndex][importFieldsDefinition.paddockNameColumn] = key;
                }
            }
            $log.info(JSON.stringify(importFieldsDefinition));
            return soilSampleImporter.toFarmData(myFarmData, importFieldsDefinition);

        }

        /**
         *
         * @param paddockSelection
         * @param paddock
         * @param rowIndex
         */
        importFieldSelector.connectRow =  function(paddockSelection, paddock, rowIndex) {
            if (!paddockSelection.paddockRowDictionary.hasOwnProperty(paddock.name)) {
                paddockSelection.paddockRowDictionary[paddock.name]= [];
            }
            collections.add(paddockSelection.paddockRowDictionary[paddock.name], rowIndex);

        }

        importFieldSelector.disconnectRow =  function(paddockSelection, paddock, index) {
            if (paddockSelection.paddockRowDictionary.hasOwnProperty(paddock.name)) {
                collections.remove(paddockSelection.paddockRowDictionary[paddock.name], index);
            }
        }

        importFieldSelector.resetPaddockRowDictionary =  function(paddockSelection) {
            paddockSelection.paddockRowDictionary = {};

            return paddockSelection;
        }

        /**
         * Add classification for column with given index
         * @param paddockSelection
         * @param classificationType
         * @param index
         */
        importFieldSelector.classifyColumn =  function(paddockSelection, classificationType, index) {
            paddockSelection.importFieldDictionary[classificationType.name] = index;
            $log.info("paddockSelection "+JSON.stringify(paddockSelection));
        }

        /**
         * remove classification for column with given index
         * @param paddockSelection
         * @param classificationType
         * @param index
         */
        importFieldSelector.declassifyColumn =  function(paddockSelection, classificationType, index) {
            delete paddockSelection.importFieldDictionary[classificationType.name];
        }


        importFieldSelector.types = _types;
        importFieldSelector.paddocks = _paddocks;

        return importFieldSelector;
    });
