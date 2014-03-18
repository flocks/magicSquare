angular.module('templates-app', ['popup/popup.tpl.html']);

angular.module("popup/popup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("popup/popup.tpl.html",
    "<h1>Template heading</h1>\n" +
    "<p>Content goes here</p>");
}]);
