$("#get").click(function(){
  $.get("user/" + $("#player_name").val())
    .done(function(data, status){
      console.log(status + " :: " + data)
    })
    .fail(function(res){
      console.log(res.status + " :: " + res.responseText)
    })
})

$("#post").click(function(){
  $.post("user/" + $("#player_name").val(), function(data, status){
    console.log(status + " :: " + data)
  })
})
