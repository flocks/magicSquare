angular.module( 'magicsquare')

.directive( 'board', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/board.tpl.html',
    replace:true,
    link: function( scope, element, attrs ) {
      var lastSelected;
      var selected = [];
      var nbRow = parseInt(attrs.cols,10);

      var _checkIfLeft = function(i) {
        var numeroLine = parseInt(i/nbRow, 10);
        var positionCol = nbRow - (((numeroLine+1) * nbRow) - i);

        console.log(numeroLine, positionCol);

      
      };



      var _checkIfSelectable = function(i) {

      };

      var _getSelectable = function(i) {

      };

      scope.rangeRow = _.range(nbRow * nbRow);

      scope.handleClick = function(i) {
        
        selected.push(i);
        var e = $(element).find('.case'+i);
        e.toggleClass('selected');

        _checkIfLeft(i);
      };

    }
  };
})

;

