(function($){
  var data = loadData(),
      eatTimer = $('#eat-timer'),
      diperTimer = $('#diper-timer'),
      medicineTimer = $('#medicine-timer'),
      eaten = $('#eaten'),
      dipered = $('#dipered'),
      medicine = $('#medicine');

  jQuery.timeago.settings.allowFuture = true;
  jQuery.timeago.settings.refreshMillis = 1000;

  function init() {
    eatTimer.timeago('update', formatTimer(data.eat));
    diperTimer.timeago('update', formatTimer(data.diper));
    medicineTimer.timeago('update', formatTimer(data.medicine));
    setHandler();
  }
  function setNewTimer() {
    eatTimer.timeago('update',formatTimer(data.eat));
    diperTimer.timeago('update', formatTimer(data.diper));
    medicineTimer.timeago('update', formatTimer(data.medicine));
  }
  function formatTimer(time) {
    return new Date(parseInt(time)*1000).toISOString();
  }

  function setHandler() {
    dipered.click(function() {
      updateTimer('diper');
    });
    eaten.click(function() {
      updateTimer('eat');
    });
    medicine.click(function() {
      updateTimer('medicine');
    });
  }

  function updateTimer(v) {
    data[v] = Math.ceil(Date.now()/1000);
    setNewTimer();
    saveNewData(v);
  }

  function loadData() {
    $.ajax({
      url: "ssscript/db.php",
      context: document.body,
      data: {
        action: 'getall'
      }
    }).done(function(response) {
      data = JSON.parse(response);
      init();
    });
  }

  function saveNewData(v) {
    $.ajax({
      url: "ssscript/db.php?action="+v,
      context: document.body,
      method: 'POST',
      data: data,
    }).done(function(response) {
      //data = JSON.parse(response);
    });
  }

}(jQuery));