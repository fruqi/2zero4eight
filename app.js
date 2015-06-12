
// setting up utility function for setting ang getting data-value attribute

jQuery.fn.extend({
  getDataValue: function() {
    return parseInt(this.attr("data-value"));
  },
  setDataValue: function(value) {
    return this.attr("data-value", value);
  }
});

$(window).on("resize", function() {
  var width = $("[data-col]").width();
  $("[data-col]").height(width);
});


$(function() {

  // init window resize to match column height & width value
  $(window).resize();

  // init score

  function getRandCel(num) {
    setTimeout(function() {
      var emptyCells = $("[data-value=0]"),
          emptyCellsCount = emptyCells.size();

      // console.log("emptyCells : ", emptyCellsCount);

      if (num == undefined) { num = 1; } // set default value if num is undefined

      // if (emptyCellsCount > 0) {
        for(var i = 0; i < num; i++) {

          var randIndex = _.random(0, emptyCellsCount - 1),
              selectedCell = emptyCells.eq(randIndex);

          selectedCell.setDataValue(2);
          selectedCell.text(2);

          emptyCells = $("[data-value=0]");
          emptyCellsCount = emptyCells.size();

          if (emptyCellsCount == 0) {
            console.log("check available move");
            
            if (!checkAvailableMove()) {
              alert("Game Over");
            }
          }

        }
    }, 500);
  }

  function checkAvailableMove() {
    if (checkVerticalMove() || checkHorizontalMove()) { return true; }
    return false
  }

  function checkHorizontalMove() {

    console.log("checkHorizontalMove");

    var foundMove = false;

    for(var x = 1; x <= 4; x++) {
      var $row = $("[data-row=" + x + "]");

      for(var y = 1; y <= 4; y++) {

        if(y != 4) {
          var currentCol = $row.find("[data-col=" + y + "]"),
              nextCol = $row.find("[data-col=" + (y+1)+ "]");

          if (currentCol.getDataValue() == nextCol.getDataValue()) {
            foundMove = true;
          }
        }

      }
    }

    return foundMove;
  }

  function checkVerticalMove() {

    console.log("checkVerticalMove");

    var foundMove = false;

    for(var x = 1; x <= 4; x++) {
      var $col = $("[data-col=" + x + "]");

      for(var y = 0; y <= 3; y++) {
        
        if (y != 3) {
          var currentCol = $col.eq(y),
              nextCol = $col.eq(y+1);

          if (currentCol.getDataValue() == nextCol.getDataValue()) {
            foundMove = true;
          }
        }

      }
    }

    return foundMove;
  }


  function initGrid() {
    getRandCel(2);
  }

  function updateBoxScore(value) {
    var boxScore = $("[data-score]"),
        score = parseInt(boxScore.text());

    boxScore.text(score + value);

    return;
  }

  function checkDirection(direction) {
    switch (direction) {
      case 37: // Left 
        
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
                  next.text("");

                  newRandVal = true;
                } else if ((currentValue == nextValue) && (currentValue > 0)) {
                  var addResult = currentValue + nextValue;

                  current.setDataValue(addResult);
                  current.text(addResult);

                  next.setDataValue(0);
                  next.text("");

                  updateBoxScore(addResult);

                  newRandVal = true;
                }

              } // end for loop 'j' 

            } // end for loop 'i'

        } // end for loop 'k'

        if (newRandVal) { getRandCel() }

        break;
      case 39: // Right

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
                  next.text("");

                  newRandVal = true;
                } else if ((currentValue == nextValue) && (currentValue > 0)) {
                  var addResult = currentValue + nextValue;

                  current.setDataValue(addResult);
                  current.text(addResult);

                  next.setDataValue(0);
                  next.text("");

                  updateBoxScore(addResult);

                  newRandVal = true;
                }

              } // end for loop 'j' 

            } // end for loop 'i'

        } // end for loop 'k'

        if (newRandVal) { getRandCel() }

        break;
      case 38: // Up

        var newRandVal = false;

        for(var i = 1; i <= 4; i++) {

          var columns = $("[data-col=" + i + "]");

          for(var j = 0; j < 4; j++) {

            var current = columns.eq(j);

            for(var k = j + 1; k <= 4; k++) {

              var next = columns.eq(k),
                  nextValue = next.getDataValue(),
                  currentValue = current.getDataValue();

              if ((currentValue != 0) && (currentValue < nextValue)) {
                break;
              } else if ((currentValue == 0) && (nextValue > 0)) {

                current.setDataValue(nextValue);
                current.text(nextValue);

                next.setDataValue(0);
                next.text("");

                newRandVal = true;
              } else if ((currentValue == nextValue) && (currentValue > 0)) {
                var addResult = currentValue + nextValue;

                current.setDataValue(addResult);
                current.text(addResult);

                next.setDataValue(0);
                next.text("");

                updateBoxScore(addResult);

                newRandVal = true;
              }

            } // end for loop 'k' 

          } // end for loop 'j'

        } // end for loop 'i'

        if (newRandVal) { getRandCel() }

        break;
      case 40: // Down

        var newRandVal = false;

        for(var i = 1; i <= 4; i++) {

          var columns = $("[data-col=" + i + "]");

          console.log(columns);

          for(var j = 3; j >= 0; j--) {

            var current = columns.eq(j);

            for(var k = j - 1; k >= 0; k--) {

              var next = columns.eq(k),
                  nextValue = next.getDataValue(),
                  currentValue = current.getDataValue();

              if ((currentValue != 0) && (currentValue < nextValue)) {
                break;
              } else if ((currentValue == 0) && (nextValue > 0)) {

                current.setDataValue(nextValue);
                current.text(nextValue);

                next.setDataValue(0);
                next.text("");

                newRandVal = true;
              } else if ((currentValue == nextValue) && (currentValue > 0)) {
                var addResult = currentValue + nextValue;

                current.setDataValue(addResult);
                current.text(addResult);

                next.setDataValue(0);
                next.text("");

                updateBoxScore(addResult);

                newRandVal = true;
              }

            } // end for loop 'k' 

          } // end for loop 'j'

        } // end for loop 'i'

        if (newRandVal) { getRandCel() }
        
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