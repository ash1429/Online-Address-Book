var str = $('#parent').html();
$('#add_btn').on('click', () => {
  $('#parent').append(str);
});