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

      var _checkIfRight = function(i) {
        var numeroLine = parseInt(i/nbRow, 10);
        var positionCol = (nbRow - (((numeroLine+1) * nbRow) - i) )+ 1;
        //return (positionCol +2 < nbRow);
        if (positionCol + 2 < nbRow) {
          scope.selectable[i+2] = true;
        }
      
      };

      var _checkIfLeft = function(i) {
        var numeroLine = parseInt(i/nbRow, 10);
        var positionCol = (nbRow - (((numeroLine+1) * nbRow) - i) )+ 1;
        //return (positionCol - 2 > 1);

        if (positionCol - 2 > 1) {
          scope.selectable[i-2] = true;
        }
      };

      var _checkDiagoTopLeft = function(i,positionCol) {
        var offset = positionCol + nbRow + (nbRow - positionCol) + 2;

        var positionDiago1 = i - offset;

        if ( (positionCol -2) > 0 && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
        }
      };

      var _checkDiagoTopRight = function(i, positionCol) {
        var offset = positionCol + nbRow + ((nbRow-1) - positionCol - 1);
        var positionDiago1 = i - offset;

        if ((positionCol +2  <= nbRow) && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
        }
      };


      var _checkDiagoBottomLeft = function(i, positionCol) {
        var offset = positionCol + nbRow + ((nbRow-1) - positionCol - 1);
        var positionDiago1 = i + offset;

        if ((positionCol - 2  > 0) && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
        }
      };

      var _checkDiagoBottomRight = function(i,positionCol) {
        var offset = positionCol + nbRow + (nbRow - positionCol) + 2;

        var positionDiago1 = i + offset;

        if ((positionCol + 2  <= nbRow) && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
        }
      };


      var _setSelectable = function(i) {
        // 2 case to the right :
        scope.selectable = [];

        if((i +1 +2) < total) {
          scope.selectable[i+1+2] = true;
        }

        if (((i+1) - 2) < total && ((i+1)-2) >= 0) {
          scope.selectable[(i+1)-2] = true;
        }

      };

      var _hasCaseToTheLeftLine = function(i) {

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

          var numeroLine = parseInt(i/nbRow, 10);
          var positionCol = (nbRow - (((numeroLine+1) * nbRow) - i) ) +1 ;

          scope.selected[i] = true;
          _checkIfLeft(i);
          _checkIfRight(i);
          _checkDiagoTopLeft(i, positionCol);
          _checkDiagoTopRight(i,positionCol);
          _checkDiagoBottomLeft(i,positionCol);
          _checkDiagoBottomRight(i,positionCol);
        
        }

      };

    }
  };
})

;

