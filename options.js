/* global $, jQuery, localStorage */

function rssUrl(spaceId, projectId){
  if (spaceId != "" && projectId != "") {
    return "https://" + spaceId + ".backlog.jp/rss/" + projectId;
  } else {
    return null;
  };
}

$(function(){


  $('#select-regex').change(function(){
    localStorage.setItem('select-regex', $(this).val());
  }).val(localStorage.getItem('select-regex'));

  $('#space-id, #project-id').change(function(){
    var spaceId, projectId, rss;
    spaceId = $('#space-id').val();
    projectId = $('#project-id').val();

    rss = rssUrl(spaceId, projectId);
    if(rss != null){
      $("#auth-link").html('<a href="' + rss + '">こちらのURLにアクセスして認証してください。</a>');
    }

    localStorage.setItem('rss-url', rss);
    localStorage.setItem('space-id', spaceId);
    localStorage.setItem('project-id', projectId);
  });

  $('#space-id').val(localStorage.getItem('space-id'));
  $('#project-id').val(localStorage.getItem('project-id'));
});
