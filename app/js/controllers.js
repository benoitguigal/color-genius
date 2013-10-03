'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);

  function ColorGeniusCtrl($scope){
  	$scope.rouge = 255
	$scope.bleu = 0
	$scope.vert = 0

	$scope.colorSelectorStyle = {'background-color':'rgb('+$scope.rouge+','+$scope.vert+','+$scope.bleu+')'} ;

	$scope.setColorStyle = function(){
		$scope.colorSelectorStyle = {'background-color':'rgb('+$scope.rouge+','+$scope.vert+','+$scope.bleu+')'} ;	
	}

	$scope.hierarchyJSON = "{    \
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
}"

	$scope.hierarchy = angular.fromJson($scope.hierarchyJSON)


  }