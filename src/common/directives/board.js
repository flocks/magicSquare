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
        if (!scope.selected[i+3] && positionCol + 2 < nbRow) {
          scope.selectable[i+3] = true;
        }
      
      };

      var _checkIfLeft = function(i) {
        var numeroLine = parseInt(i/nbRow, 10);
        var positionCol = (nbRow - (((numeroLine+1) * nbRow) - i) )+ 1;
        //return (positionCol - 2 > 1);

        if (!scope.selected[i-3] && positionCol - 2 > 1) {
          scope.selectable[i-3] = true;
        }
      };

      var _checkUp = function(i, positionCol) {
        var offset = (2 * nbRow + positionCol) + (nbRow - positionCol);
        var position = i - offset;
        if (!scope.selected[position]) {
          scope.selectable[position] = true;
        }
      };

      var _checkDown = function(i, positionCol) {
        var offset = (2 * nbRow + positionCol) + (nbRow - positionCol);
        var position = i + offset;
        if (!scope.selected[position]) {
          scope.selectable[position] = true;
        }
      };

      var _checkDiagoTopLeft = function(i,positionCol) {
        var offset = positionCol + nbRow + (nbRow - positionCol) + 2;

        var positionDiago1 = i - offset;

        if (!scope.selected[positionDiago1] &&  (positionCol -2) > 0 && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
        }
      };

      var _checkDiagoTopRight = function(i, positionCol) {
        var offset = positionCol + nbRow + ((nbRow-1) - positionCol - 1);
        var positionDiago1 = i - offset;

        if (!scope.selected[positionDiago1] && (positionCol +2  <= nbRow) && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
        }
      };


      var _checkDiagoBottomLeft = function(i, positionCol) {
        var offset = positionCol + nbRow + ((nbRow-1) - positionCol - 1);
        var positionDiago1 = i + offset;

        if (!scope.selected[positionDiago1] && (positionCol - 2  > 0) && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
        }
      };

      var _checkDiagoBottomRight = function(i,positionCol) {
        var offset = positionCol + nbRow + (nbRow - positionCol) + 2;

        var positionDiago1 = i + offset;

        if (!scope.selected[positionDiago1] && (positionCol + 2  <= nbRow) && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
        }
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
          var k = 0;
          for(k; k < scope.selectable.length; k++) {
            scope.selectable[k] = false;
          }

          var numeroLine = parseInt(i/nbRow, 10);
          var positionCol = (nbRow - (((numeroLine+1) * nbRow) - i) ) +1 ;

          scope.selected[i] = true;
          scope.selectable[i] = false;
          _checkIfLeft(i);
          _checkUp(i, positionCol);
          _checkDown(i, positionCol);
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

