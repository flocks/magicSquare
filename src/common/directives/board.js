angular.module( 'magicsquare')

.directive( 'board', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/board.tpl.html',
    replace:true,
    link: function( scope, element, attrs ) {
      var lastSelected;
      scope.selected = [];
      scope.selectable = [];
      var nbRow = parseInt(attrs.cols,10);
      var total = nbRow * nbRow;

      var _checkIfLeft = function(i) {
        var numeroLine = parseInt(i/nbRow, 10);
        var positionCol = nbRow - (((numeroLine+1) * nbRow) - i);

        console.log(numeroLine, positionCol);

      
      };

      var _setSelectable = function(i) {
        // 2 case to the right :
        scope.selectable = [];

        if((i +2) < total) {
          scope.selectable[i+2] = true;
        }

        if ((i - 2) < total && (i-2) >= 0) {
          scope.selectable[i-2] = true;
        }

      };



      var _checkIfSelectable = function(i) {

      };

      var _getSelectable = function(i) {

      };
      var hasStart = false;
      var _init = function() {
        _.each(scope.rangeRow, function(i) {
          scope.selectable[i] = false;
          scope.selected[i] = false;
        });


      };

      scope.rangeRow = _.range(nbRow * nbRow);
      _init();

      scope.handleClick = function(i) {
        
        if (!hasStart || scope.selectable[i]) {
          if (!hasStart) {
            hasStart = true;
          }
          scope.selected[i] = true;
          _checkIfLeft(i);

          _setSelectable(i); 
        }

      };

    }
  };
})

;

