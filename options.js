/* global $, jQuery, localStorage */

$(function(){
  $('#select-regex').change(function(){
    localStorage.setItem('select-regex', $(this).val());
  });

  $('#rss-url').change(function(){
    localStorage.setItem('rss-url', $(this).val());
  });
});
