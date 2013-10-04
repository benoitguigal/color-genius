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

$scope.hierarchyJSON = angular.toJson($scope.hierarchy, true)

$scope.parseJSON = function(){
  $scope.hierarchy = angular.fromJson($scope.hierarchyJSON)
}

$scope.selectorXY = [0.6697038724373576,0.3302961275626423]

$scope.setSelectorXY = function(){
  $scope.selectorXY = $scope.RGBtoXY($scope.rouge, $scope.vert , $scope.bleu)
}

$scope.RGBtoHSV = function(r, g, b){
  var rp = r / 255
  var gp = g / 255
  var bp = b / 255
  var Cmax = Math.max(rp, gp, bp)
  var Cmin = Math.min(rp, gp, bp)
  var delta = Cmax - Cmin
  var h
  if (Cmax == rp){
    h = 60 * ((gp - bp) / delta) % 6
  } else if (Cmax == gp) {
    h = 60 * ((bp - rp) / delta + 2)
  } else {
    h = 60 * ((rp - gp) / delta + 4)
  }
  var s 
  if(delta == 0){
    s = 0
  } else {
    delta = delta / Cmax
  }
  var v = Cmax
  return [h, s, v]
}

var HSVcolors = {}

$scope.maximizeDistance = function(tree, minAngle, maxAngle){
  var nodes = tree.children
  var count = nodes.count
  if (count == 0) return
  var arcLength = (maxAngle - minAngle)
  var intervalLength = arcLength / count 
  for(i=0; i<count; i++){
    HSVcolors[children[i].name] = (minAngle + i*intervalLength) 
  }
  for(i=0; i<count; i++){
    var minIndice 
    if(i = 0) count -1 else (i-1)

    $scope.maximizeDistance(children[i], ,)
  }
}

$scope.processHierarchy = function(hierarchy){
  HSVcolors = {}

}

$scope.recur = function()



}