'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);

function ColorGeniusCtrl($scope){
  $scope.rouge = 255
  $scope.vert = 0
  $scope.bleu = 0
  $scope.hue = 0
  $scope.saturation = 100
  $scope.light = 50


  $scope.colorSelectorStyle = {'background-color':'rgb('+$scope.rouge+','+$scope.vert+','+$scope.bleu+')'} ;

  $scope.setColorStyle = function(){
  	$scope.colorSelectorStyle = {'background-color':'rgb('+$scope.rouge+','+$scope.vert+','+$scope.bleu+')'} ;	
  }

  $scope.findColorFor = function(name){
    var hsl = $scope.HSLcolors[name]
    console.log(hsl)
    return {'background-color':'hsl('+hsl[0]+', '+hsl[1]+'%, '+hsl[2]+'%)'}
  }

  $scope.setHSLConversion = function(){
    var hsl = RGBtoHSL($scope.rouge, $scope.vert, $scope.bleu)
    $scope.hue = hsl[0]
    $scope.saturation = hsl[1]
    $scope.light= hsl[2]
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

  function RGBtoHSL(r, g, b){
    var rp = r / 255
    var gp = g / 255
    var bp = b / 255
    var Cmax = Math.max(rp, gp, bp)
    var Cmin = Math.min(rp, gp, bp)
    var delta = Cmax - Cmin

    var h
    if (delta == 0) {
      h = 0
    } else if (Cmax == rp){
      h = 60 * ((gp - bp) / delta) % 6
    } else if (Cmax == gp) {
      h = 60 * ((bp - rp) / delta + 2)
    } else if (Cmax == bp) {
      h = 60 * ((rp - gp) / delta + 4)
    }
    var l = 0.5*(Cmax + Cmin)
    var s 
    if(Cmax == 0){
      s = 0
    } else {
      s = delta / (1 - Math.abs(2*l - 1))
    }
    return [h, s * 100, l * 100]
  }

  $scope.HSLcolors = {} 

  $scope.maximizeDistance = function(tree, minAngle, maxAngle){
    var nodes = tree.children
    var count = nodes.length
    if (count == 0) return
    var arcLength = Math.abs(maxAngle - minAngle)
    var intervalLength = arcLength / count 
    var i 
    for(i=0; i<count; i++){
      $scope.HSLcolors[nodes[i].name] = [toUniqueAngle(minAngle + i*intervalLength), $scope.saturation, $scope.light]
    }
    var j 
    for(j=0; j<count; j++){
      var currentHue = $scope.HSLcolors[nodes[j].name][0]
      var halfInterval = intervalLength / 2 
      var minAng = toUniqueAngle(currentHue - halfInterval)
      var maxAng = toUniqueAngle(currentHue + halfInterval)  
      $scope.maximizeDistance(nodes[j], minAng, maxAng)
    }
  }

  function toUniqueAngle(angle){
    return ((angle + 360) % 360)
  }

  $scope.processHierarchy = function(){
    $scope.HSLcolors = {}
    var base = $scope.hue
    $scope.maximizeDistance($scope.hierarchy, base, base + 360)
  }

  $scope.processHierarchy();


}