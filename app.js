$(function() {

  // setting up utility function for setting ang getting data-value attribute
  jQuery.fn.extend({
    getDataValue: function() {
      return parseInt(this.attr("data-value"));
    },
    setDataValue: function(value) {
      return this.attr("data-value", value);
    }
  });

  var rowCount = $(".row").length;

  function getRandCel(num) {

    var emptyCells = $("[data-value=0]"),
        emptyCellsCount = emptyCells.length;

    console.log(emptyCells, " : ", emptyCellsCount);

    if (num == undefined) { num = 1; } // set default value if num is undefined

    for(var i = 0; i < num; i++) {

      var randIndex = _.random(0, emptyCellsCount - 1),
          selectedCell = emptyCells.eq(randIndex);

      selectedCell.setDataValue(2);
      selectedCell.text(2);
    }
  }

  function initGrid() {
    getRandCel(2);
  }

  function checkDirection(direction) {
    switch (direction) {
      case 37:
        // Left 

        var newRandVal = false;

        for(var k = 1; k <= 4; k++) {

          var currentRow = $("[data-row=" + k + "]");

          for(var i = 1; i <= 4; i++) {
            var current = currentRow.find("[data-col=" + i + "]");

            for(var j = i + 1; j <= 4; j++) {
              var next = currentRow.find("[data-col=" + j + "]"),
                  nextValue = next.getDataValue(),
                  currentValue = current.getDataValue();


              if ((currentValue != 0) && (currentValue < nextValue)) {
                break;
              } else if ((currentValue == 0) && (nextValue > 0)) {

                current.setDataValue(nextValue);
                current.text(nextValue);

                next.setDataValue(0);
                next.text(0);

                newRandVal = true;
              } else if ((currentValue == nextValue) && (currentValue > 0)) {
                var addResult = currentValue + nextValue;

                current.setDataValue(addResult);
                current.text(addResult);

                next.setDataValue(0);
                next.text(0);

                newRandVal = true;
              }

            } // end for loop 'j' 

          } // end for loop 'i'

        } // end for loop 'k'

        if (newRandVal) { getRandCel() }

        break;
      case 39:
        // Right

        var newRandVal = false;
        
        for(var k = 1; k <= 4; k++) {

          var currentRow = $("[data-row=" + k + "]");

          for(var i = 4; i >= 1; i--) {
            var current = currentRow.find("[data-col=" + i + "]");

            for(var j = i - 1; j >= 1; j--) {
              var next = currentRow.find("[data-col=" + j + "]"),
                  nextValue = next.getDataValue(),
                  currentValue = current.getDataValue();

              if ((currentValue != 0) && (currentValue < nextValue)) {
                break;
              } else if ((currentValue == 0) && (nextValue > 0)) {

                current.setDataValue(nextValue);
                current.text(nextValue);

                next.setDataValue(0);
                next.text(0);

                newRandVal = true;
              } else if ((currentValue == nextValue) && (currentValue > 0)) {
                var addResult = currentValue + nextValue;

                current.setDataValue(addResult);
                current.text(addResult);

                next.setDataValue(0);
                next.text(0);

                newRandVal = true;
              }

            } // end for loop 'j' 

          } // end for loop 'i'

        } // end for loop 'k'

        if (newRandVal) { getRandCel() }

        break;
      case 38:
        // Up
        break;
      case 40:
        // Down
        break;
      default:
        break;
    }
  }

  $('html').on('keyup', function(e) {
    checkDirection(e.which);
  });

  initGrid();
});