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


$scope.hierarchy = {
  "name": "World",
  "children" : [
    {"name": "Europe",
    "children" : [
      {"name": "France",
      "children": [
        {"name": "Ardeche",
        "children": []}]},
      {"name": "Germany",
      "children": []}
    ]},
    {"name": "Africa",
    "children":[
      {"name": "South Africa",
        "children": []},
      {"name": "Namibia",
        "children": []},
      {"name": "Botswana",
        "children": []}
    ]}
  ]
}

$scope.findX = function(base, nodesCount, min, max){
  var intervalLength = (max - min) / nodesCount
  var nodes = []
  var j
  for(j = 0; j<intervalLength; j++){
    nodes[j] = (base + j*intervalLength)
  }
  return nodes
}

$scope.colors = {}

$scope.processHierarchy = function(hierarchy){
  $scope.colors = {}
  var base = $scope.RGBtoXY($scope.rouge, $scope.vert, $scope.bleu)
  $scope.recur(hierarchy.children, base[0], 0, 1)
} 

$scope.recur = function(children, base, min, max){
    if(children == []) {return} 
    else {
      var nodesCount = children.length
      var intervalLength = (max - min) / nodesCount
      var nodes = $scope.findX(base, nodesCount, min, max)
      var i
      for(i=0; i<nodesCount; i++){
        var base = ((nodes[i]*10) % 10) / 10
        $scope.colors[children[i]] = base
      }
      for(i=0; i<nodesCount; i++){
        var min = ((nodes[i] - intervalLength / 2) + intervalLength) 
        var max = nodes[i] + intervalLength / 2
        console.log(children[i])
        console.log(min)
        console.log(max)
        $scope.recur(children[i].children, nodes[i], min, max) 
      }
    }
  }



$scope.hierarchyJSON = angular.toJson($scope.hierarchy, true)

$scope.parseJSON = function(){
  $scope.hierarchy = angular.fromJson($scope.hierarchyJSON)
}

$scope.selectorXY = [0.6697038724373576,0.3302961275626423]

$scope.setSelectorXY = function(){
  $scope.selectorXY = $scope.RGBtoXY($scope.rouge, $scope.vert , $scope.bleu)
}


$scope.RGBtoXYZ = function(r, g, b){
  var x = 0.588*r + 0.179*g + 0.183*b ;
  var y = 0.29*r + 0.606*g + 0.105*b ;
  var z = 0*r + 0.068*g + 1.021*b ;
  return [x, y, z] ;
} 

$scope.XYZtoXY = function(X, Y, Z){
  var x = X / (X + Y + Z)
  var y = Y / (X + Y + Z)
  return [x, y]
}

$scope.RGBtoXY = function(r, g, b){
  var XYZ = $scope.RGBtoXYZ(r, g, b)
  return $scope.XYZtoXY(XYZ[0], XYZ[1], XYZ[2])
}



}