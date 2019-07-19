$(document).ready(function () {
  $(document).on('click', '.plant-seed, .level-1, .level-2, .level-3, .harvest', ( function (e){
    var $image = $(e.target).siblings('.plant-phase');
    var $plot = $(e.target).parent();
    var $actionButton = $(e.target);
    var points = parseInt($('.game-points').text());

    $image.remove()

    function growPlant(phase, level) {
      var levelNumber = parseInt(level.replace('level-','')) + 1
      var newLevel = `level-${levelNumber}`
      $plot.append(`<img src='https://plantopolis.s3-us-west-1.amazonaws.com/${phase}.png' class='${phase} plant-phase' />`)
      $actionButton.removeClass(`${level}`)
      $actionButton.addClass(`${newLevel}`)
    }

    function changePhase(phase) {
      $plot.append(`<img src='https://plantopolis.s3-us-west-1.amazonaws.com/${phase}.png' class='${phase} plant-phase' />`)
    }

    function addAction(classes, text) {
      $plot.append(`<button type='button' class='${classes}'>${text}</button>`)
    }

    if ($actionButton.hasClass('plant-seed')) {
      $actionButton.hide()
      changePhase("sprout")
      addAction("btn-primary water-plant level-1", "Water plant!")
    } else if ($actionButton.hasClass('level-1')) {
      growPlant("bud", "level-1")
    } else if ($actionButton.hasClass('level-2')) {
      growPlant("blooming", "level-2")
    } else if ($actionButton.hasClass('level-3')) {
      $actionButton.hide()
      changePhase("bloomed")
      addAction("btn-warning harvest", "Harvest Plant!")
    } else {
      $actionButton.hide()
      addAction("btn-success plant-seed", "Plant a seed!")
      $('.game-points').text(points + 1)
    }
  }))
});
