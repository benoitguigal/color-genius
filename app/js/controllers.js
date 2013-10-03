'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);

  function ColorGeniusCtrl($scope){
  	$scope.rouge = 25
	$scope.bleu = 23
	$scope.vert = 0

	$scope.colorSelectorStyle = {'background-color':'rgb('+$scope.rouge+','+$scope.vert+','+$scope.bleu+')'} ;

	$scope.setColorStyle = function(){
		$scope.colorSelectorStyle = {'background-color':'rgb('+$scope.rouge+','+$scope.vert+','+$scope.bleu+')'} ;	
	}

	$scope.hierarchyJSON = JSON.stringify("{    \
    \"nodes\": [\
        {\
            \"name\": \"Europe\",\
            \"children\": [\
                {\
                    \"name\": \"France\",\
                    \"children\": []\
                },\
                {\
                    \"name\": \"Allemagne\",\
                    \"children\": []\
                }\
            ]\
        },\
        {},\
        {}\
    ]\
}", null, '\t')

	$scope.hierarchy = angular.fromJson($scope.hierarchyJSON)


  }