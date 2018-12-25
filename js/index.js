$(document).ready(function() {
  var entry = '';
  var acc = '';
  var displayed = '';
  
  $('#display').html("0");
  
  $('button').click(function() {
    
    entry = $(this).attr("value");
    
    // digit combining
    while ((Number(entry) || entry === '0' || entry === '.' || entry === "ce" || entry === "on/c") && displayed.length < 9) {
      if (entry === "on/c") {
        displayed = "";
        acc = "";
      } else if (entry === "ce") {
        displayed = "";
      } else if (entry === "." && displayed === "") {
         displayed = "0.";      
      } else if (displayed === "0" && entry !== "."){
        displayed = entry;
      } else {
        displayed += entry;
      }
      
      if (entry === "on/c" || entry === "ce") {
        $('#display').html("0");
      } else {
        $('#display').html(displayed);
      }
      entry = '';
    }
    
    // math operations
    // try to use regex /^[+-/*=]?/
    // need to fix bug with 2 consequent operator entries
    if (entry === "/" || entry === "*" || entry === "+" || entry === "-" || entry === "=" ) {
      
      if (acc.slice(-1) === "=") { // remove extra equality sign
        acc = acc.slice(0, -1);
      }
      
      switch(entry) {
          case '=':
              acc += displayed;
              
              displayed = +eval(acc).toFixed(3); //round answer to 3 decimal places
              if (displayed.toString().length > 8) { //answer length check
                displayed = 'DgtLimit';
              }
              $('#display').html(displayed);
              acc = "";
          default:
              if (displayed !== 'DgtLimit') {
                acc += displayed + entry;
              }
              displayed = "";
      }
      console.log(acc);
    } 
  });
});