'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);

function ColorGeniusCtrl($scope){
  $scope.rouge = 65
  $scope.vert = 183
  $scope.bleu = 197
  $scope.hue = 186
  $scope.saturation = 53
  $scope.light = 51


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
    "children": [
        {
            "name": "Europe",
            "children": [
                {
                    "name": "France",
                    "children": [
                        {
                            "name": "Ardeche",
                            "children": []
                        },
                        {
                            "name": "Basse Normandie",
                            "children": []
                        },
                        {
                            "name": "Yonne",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "Germany",
                    "children": []
                }
            ]
        },
        {
            "name": "Africa",
            "children": [
                {
                    "name": "South Africa",
                    "children": []
                },
                {
                    "name": "Namibia",
                    "children": []
                },
                {
                    "name": "Botswana",
                    "children": []
                },
                {
                    "name": "Morocco",
                    "children": []
                },
                {
                    "name": "Senegal",
                    "children": []
                },
                {
                    "name": "Somalia",
                    "children": []
                },
                {
                    "name": "Algeria",
                    "children": []
                },
                {
                    "name": "Mali",
                    "children": []
                },
                {
                    "name": "Benin",
                    "children": []
                }
            ]
        },
        {
            "name": "America",
            "children": [
                {
                    "name": "US",
                    "children": []
                },
                {
                    "name": "Perou",
                    "children": []
                },
                {
                    "name": "Argentina",
                    "children": []
                }
            ]
        },
        {
            "name": "Asia",
            "children": [
                {
                    "name": "Thailande",
                    "children": []
                },
                {
                    "name": "Pakistan",
                    "children": []
                },
                {
                    "name": "China",
                    "children": []
                }
            ]
        }
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

  $scope.maximizeDistance = function(tree, minAngle, maxAngle, currentLight, ligthIncrease){
    var nodes = tree.children
    var count = nodes.length
    if (count == 0) return
    var arcLength
    if(maxAngle >= minAngle){
      arcLength = maxAngle - minAngle
    } else {
      arcLength = 360 - (minAngle - maxAngle)
    }

    var is360Degree = (arcLength == 360)
    var intervalLength 
    if(is360Degree) { intervalLength = arcLength / count} else { intervalLength = arcLength / (count + 1)}
    var i 
    if(is360Degree){
      for(i=0; i<count; i++){ 
        $scope.HSLcolors[nodes[i].name] = [toUniqueAngle(minAngle + i*intervalLength), $scope.saturation, currentLight + ligthIncrease]
      }  
    } else {
      for(i=0; i<count; i++){
        $scope.HSLcolors[nodes[i].name] = [toUniqueAngle(minAngle + (i+1)*intervalLength), $scope.saturation, currentLight + ligthIncrease]
      }
    }
    var j 
    for(j=0; j<count; j++){
      var currentHue = $scope.HSLcolors[nodes[j].name][0]
      var halfInterval = intervalLength / 2
      var minAng = toUniqueAngle(currentHue - halfInterval)
      var maxAng = toUniqueAngle(currentHue + halfInterval) 
      $scope.maximizeDistance(nodes[j], minAng, maxAng, currentLight + ligthIncrease, ligthIncrease)
    }
  }

  function toUniqueAngle(angle){
    return ((angle + 360) % 360)
  }

  $scope.processHierarchy = function(){
    $scope.HSLcolors = {}
    var base = $scope.hue
    var depth = treeDepth($scope.hierarchy)
    var ligthIncrease = (100 - $scope.light)/(depth + 2)
    $scope.maximizeDistance($scope.hierarchy, base, base + 360, $scope.light, ligthIncrease)
  }

  function treeDepth(hierarchy){
    var nodes = hierarchy.children
    if(nodes.length == 0) return 0 
    var nodesCount = nodes.length
    var depths = []
    var i
    for (i=0; i<nodesCount; i++){
      depths[i] = treeDepth(nodes[i])
    }  
    return (1 + depths.sort().reverse()[0])
  }

  $scope.processHierarchy();


}