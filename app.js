
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

  // init new game button

  $("button").on("click", function() {
    location.reload();
  });

  // init best score

  var bestScore = localStorage.getItem("bestScore");

  if (bestScore) {
    $("[data-best-score]").text(bestScore);
  }

  // init generate random cell

  function getRandCel(num) {

    setTimeout(function() {
      var emptyCells = $("[data-value=0]"),
          emptyCellsCount = emptyCells.size();

      if (num == undefined) { num = 1; } // set default value if num is undefined

        for(var y = 0; y < num; y++) {

          var randIndex = _.random(0, emptyCellsCount - 1),
              selectedCell = emptyCells.eq(randIndex),
              randVal = _.sample([2,4]);

          selectedCell.setDataValue(randVal);
          selectedCell.text(randVal);

          emptyCells = $("[data-value=0]");
          emptyCellsCount = emptyCells.size();

          if (emptyCellsCount == 0) {
            
            if (!checkAvailableMove()) {
              var score = parseInt($("[data-score]").text());

              if ( score > parseInt(localStorage.getItem("bestScore")) ) {
                localStorage.setItem("bestScore", score);  
                $("[data-best-score]").text(score);
              }

              alert("Game Over");
            }

          }

        } // end of for loop
    }, 500);

  }

  function checkAvailableMove() {
    if (checkVerticalMove() || checkHorizontalMove()) { return true; }
    return false
  }

  function checkHorizontalMove() {

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

  function checkResult(result) {
    if (result == 2048) {
      window.open("https://youtu.be/3GwjfUFyY6M?t=18s");
    }
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

  function moveLeft() {
    var newRandVal = false;

    for(var x = 1; x <= 4; x++) {

      var currentRow = $("[data-row=" + x + "]");

        for(var y = 1; y <= 4; y++) {
          var current = currentRow.find("[data-col=" + y + "]");

          for(var z = y + 1; z <= 4; z++) {
            var next = currentRow.find("[data-col=" + z + "]"),
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
              checkResult(addResult);

              newRandVal = true;
            }

          } // end for loop 'z' 

        } // end for loop 'y'

    } // end for loop 'x'

    if (newRandVal) { getRandCel(); }

    return;
  }

  function moveRight() {
    var newRandVal = false;
    
    for(var x = 1; x <= 4; x++) {

      var currentRow = $("[data-row=" + x + "]");

        for(var y = 4; y >= 1; y--) {
          var current = currentRow.find("[data-col=" + y + "]");

          for(var z = y - 1; z >= 1; z--) {
            var next = currentRow.find("[data-col=" + z + "]"),
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
              checkResult(addResult);

              newRandVal = true;
            }

          } // end for loop 'z' 

        } // end for loop 'y'

    } // end for loop 'x'

    if (newRandVal) { getRandCel(); }

    return;
  }

  function moveUp() {
    var newRandVal = false;

    for(var y = 1; y <= 4; y++) {

      var columns = $("[data-col=" + y + "]");

      for(var z = 0; z < 4; z++) {

        var current = columns.eq(z);

        for(var x = z + 1; x <= 4; x++) {

          var next = columns.eq(x),
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
            checkResult(addResult);

            newRandVal = true;
          }

        } // end for loop 'x' 

      } // end for loop 'z'

    } // end for loop 'y'

    if (newRandVal) { getRandCel(); }

    return;
  }

  function moveDown() {
    var newRandVal = false;

    for(var y = 1; y <= 4; y++) {

      var columns = $("[data-col=" + y + "]");

      for(var z = 3; z >= 0; z--) {

        var current = columns.eq(z);

        for(var x = z - 1; x >= 0; x--) {

          var next = columns.eq(x),
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
            checkResult(addResult);

            newRandVal = true;
          }

        } // end for loop 'x' 

      } // end for loop 'z'

    } // end for loop 'y'

    if (newRandVal) { getRandCel(); }

    return;
  }

  function checkDirection(direction) {
    switch (direction) {
      case 37: // Left 
        
        moveLeft();
        break;
      case 39: // Right

        moveRight();
        break;
      case 38: // Up

        moveUp();
        break;
      case 40: // Down

        moveDown();
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