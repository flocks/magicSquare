angular.module('templates-common', ['directives/board.tpl.html']);

angular.module("directives/board.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/board.tpl.html",
    "<div id=\"board\">\n" +
    "	<div ng-repeat=\"i in rangeRow\" class=\"case case{{$index}}\" ng-class=\"{choice : selectable[$index], selected: selected[$index]}\" ng-click=\"handleClick($index)\"></div>\n" +
    "</div>");
}]);
