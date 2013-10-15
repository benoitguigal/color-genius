'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

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
                            "children": [
                              {"name": "Caen", "children": [
                                {"name": "Calvaire St Pierre", "children": []},
                                {"name": "Le Vogueux", "children": []},
                                {"name": "La gare", "children": []},
                                {"name": "Le vieux Caen", "children": []},
                                {"name": "Le port", "children": []},
                                {"name": "Chez Victorien", "children": []}
                              ]},
                              {"name": "Cherbourg", "children": []},
                              {"name": "Alencon", "children": []},
                              {"name": "Flers", "children": []},
                              {"name": "Argentan", "children": []},
                              {"name": "Deauville", "children": []}
                            ]
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
                    "children": [
                        {"name": "Ohio", "children": []},
                        {"name": "Colorado", "children": []},
                        {"name": "Dakota du Nord", "children": []},
                        {"name": "Texas", "children": []},
                        {"name": "Wyoming", "children": []},
                        {"name": "California", "children": []}
                    ]
                },
                {
                    "name": "Perou",
                    "children": [
                        {"name": "Machupichu", "children": []},
                        {"name": "Aguas Callentes", "children": []},
                        {"name": "Lima", "children": []},
                        {"name": "Titikaka", "children": []},
                        {"name": "Las Andes", "children": []},
                        {"name": "San Juan", "children": []}
                    ]
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

  $scope.HSLcolors = {} 

  $scope.processHierarchy = function(){
    processHierarchy($scope.hierarchy, $scope.rouge, $scope.vert, $scope.bleu)
    console.log(colors)
    $scope.HSLcolors = colors
  }

  $scope.processHierarchy(); 



/* Model functions */

// HashMap of name -> HSLcolor 
  var colors = {}

// convert RGB to HSL. Saturation and Light are expressed in percent  
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
    var l = 0.5 * (Cmax + Cmin)
    var s 
    if (Cmax == 0){
      s = 0
    } else {
      s = delta / (1 - Math.abs(2*l - 1))
    }
    return [h, s * 100, l * 100]
  }

// Given a hierarchy tree, the function is called recursively to maximize distance between colors at each level
  function maximizeDistance(tree, minHue, maxHue, saturation, light, lightIncrease){
    var nodes = tree.children
    var count = nodes.length
    if (count == 0) return  // we need an exit condition because it is recursive
    var arcLength
    if(maxHue >= minHue){
      arcLength = maxHue - minHue
    } else {
      arcLength = 360 - (minHue - maxHue)  // angles need to be defined from 0° to 360° 
    }
    var is360Degree = (arcLength == 360)
    var intervalLength 
    // if first level maximize without border, else take into account the borders
    if(is360Degree) { intervalLength = arcLength / count} else { intervalLength = arcLength / (count + 1)}
    var i 
    for(i=0; i<count; i++){ 
      if(is360Degree){
        colors[nodes[i].name] = [toUniqueAngle(minHue + i*intervalLength), saturation, light + lightIncrease] 
      } else {
        colors[nodes[i].name] = [toUniqueAngle(minHue + (i+1)*intervalLength), saturation, light + lightIncrease] 
      } 
    } 
    var j 
    for(j=0; j<count; j++){
      var currentHue = colors[nodes[j].name][0]
      var halfInterval = intervalLength / 2
      var minHueNew = toUniqueAngle(currentHue - 89)   // tocard
      var maxHueNew = toUniqueAngle(currentHue + 89)   // tocard 
      maximizeDistance(nodes[j], minHueNew, maxHueNew, saturation, light + lightIncrease, lightIncrease)
    }
  }

// keep all angles into the [0°, 360°] interval
  function toUniqueAngle(angle){
    return ((angle + 360) % 360)
  }

// processHierarchy and update colors 
  function processHierarchy(tree, r, g, b){
    colors = {}  // re-initialize colors
    var hsl = RGBtoHSL(r, g, b)
    var hue = hsl[0]
    var saturation = hsl[1]
    var light = hsl[2]
    console.log(hue)
    console.log(saturation)
    console.log(light)
    var depth = treeDepth(tree)
    /// calculate how to increase light at each level based on the number of tree depth
    var lightIncrease = (100 - light)/(depth + 2)  
    maximizeDistance(tree, hue, hue + 360, saturation, light, lightIncrease)
  }

// calculate the depth of a tree
  function treeDepth(tree){
    var nodes = tree.children
    if(nodes.length == 0) return 0 
    var nodesCount = nodes.length
    var depths = []
    var i
    for (i=0; i<nodesCount; i++){
      depths[i] = treeDepth(nodes[i])
    }  
    return (1 + depths.sort().reverse()[0])
  }

}