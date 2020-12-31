console.log(localStorage.jsonData)
var json = localStorage.jsonData
  $(function() {
    $("#json").JSONView(json);

    $("#json-collapsed").JSONView(json, { collapsed: true, nl2br: true, recursive_collapser: true });

    $('#collapse-btn').on('click', function() {
      $('#json').JSONView('collapse');
    });

    $('#expand-btn').on('click', function() {
      $('#json').JSONView('expand');
    });

    $('#toggle-btn').on('click', function() {
      $('#json').JSONView('toggle');
    });

    $('#toggle-level1-btn').on('click', function() {
      $('#json').JSONView('toggle', 1);
    });

    $('#toggle-level2-btn').on('click', function() {
      $('#json').JSONView('toggle', 2);
    });
  });