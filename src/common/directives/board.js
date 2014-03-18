angular.module( 'magicsquare')

.directive( 'board', function(ngDialog, $rootScope) {
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
          return 1;
        }

        return 0;
      
      };

      var _checkIfLeft = function(i) {
        var numeroLine = parseInt(i/nbRow, 10);
        var positionCol = (nbRow - (((numeroLine+1) * nbRow) - i) )+ 1;
        //return (positionCol - 2 > 1);

        if (!scope.selected[i-3] && positionCol - 2 > 1) {
          scope.selectable[i-3] = true;
          return 1;
        }

        return 0;
      };

      var _checkUp = function(i, positionCol) {
        var offset = (2 * nbRow + positionCol) + (nbRow - positionCol);
        var position = i - offset;
        if (!scope.selected[position] && position >= 0) {
          scope.selectable[position] = true;
          return 1;
        }

        return 0;
      };

      var _checkDown = function(i, positionCol) {
        var offset = (2 * nbRow + positionCol) + (nbRow - positionCol);
        var position = i + offset;
        if (!scope.selected[position] && position < total) {
          scope.selectable[position] = true;
          return 1;
        }

        return 0;
      };

      var _checkDiagoTopLeft = function(i,positionCol) {
        var offset = positionCol + nbRow + (nbRow - positionCol) + 2;

        var positionDiago1 = i - offset;

        if (!scope.selected[positionDiago1] &&  (positionCol -2) > 0 && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
          return 1;
        }

        return 0;
      };

      var _checkDiagoTopRight = function(i, positionCol) {
        var offset = positionCol + nbRow + ((nbRow-1) - positionCol - 1);
        var positionDiago1 = i - offset;

        if (!scope.selected[positionDiago1] && (positionCol +2  <= nbRow) && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
          return 1;
        }

        return 0;
      };


      var _checkDiagoBottomLeft = function(i, positionCol) {
        var offset = positionCol + nbRow + ((nbRow-1) - positionCol - 1);
        var positionDiago1 = i + offset;

        if (!scope.selected[positionDiago1] && (positionCol - 2  > 0) && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
          return 1;
        }

        return 0;
      };

      var _checkDiagoBottomRight = function(i,positionCol) {
        var offset = positionCol + nbRow + (nbRow - positionCol) + 2;

        var positionDiago1 = i + offset;

        if (!scope.selected[positionDiago1] && (positionCol + 2  <= nbRow) && angular.isDefined(scope.selectable[positionDiago1])) {
          scope.selectable[positionDiago1] =  true;
          return 1;
        }

        return 0;
      };

      var hasStart = false;
      var _init = function() {
        _.each(scope.rangeRow, function(i) {
          scope.selectable[i] = false;
          scope.selected[i] = false;
          hasStart = false;
        });


      };

      scope.rangeRow = _.range(nbRow * nbRow);
      _init();

      $rootScope.$on('ngDialog.closed', function(e, dialog) {
        _init();
      });


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
          var count = 0;
          count = _checkIfLeft(i) + _checkUp(i, positionCol) + _checkDown(i, positionCol) + _checkIfRight(i) + _checkDiagoTopLeft(i, positionCol) + _checkDiagoTopRight(i,positionCol) +  _checkDiagoBottomLeft(i,positionCol) + _checkDiagoBottomRight(i,positionCol);

          if(count === 0) {
            ngDialog.open({
              template: "<div id='popup'><p>Game Over ! </p><input type='button' ng-click='closeThisDialog()' value='Retry ?'></div>",
              plain: true,
              className: 'ngdialog-theme-plain'
            });

          }
          else {
            

          }
        
        }

      };

    }
  };
})

;

