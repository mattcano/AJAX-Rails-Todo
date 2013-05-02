$(document).ready(function(){

  function checkComplete(){
    var checkbox = $(this);
    var todo = checkbox.parent();
    if (checkbox.is(":checked")){
      todo.addClass(".complete-todos");
      todo.appendTo($(".complete-todos"));
    } else {

    }

  };

  $('input:checkbox').on('click', checkComplete);
  $('button.delete-btn').on('click', deleteParent);

  $("#new_todo").on("submit", function(event){
    event.preventDefault();
    var form = $(this);
    var input = $("#todo_name")
    var name = input.val();
    var completed = false;
    var item = {name: name, completed: completed}
    $.ajax({
      url: form.attr('action'),
      method: form.attr('method'),
      data: { "todo": item},
      dataType: "json",
      success: function(todo){
        var list = $(".inc-todos");
        var deleteButton = $("<a href='/todos/" + todo.id +"' data-confirm='Are you sure? data-method='delete' rel='nofollow'>Destroy</a>");
        var checkBox = $("<span><input type='checkbox'></span>");
        var entry = $("<li>" + checkBox + todo.name + "</li>");
        //checkBox.insertBefore(entry);
        entry.append(deleteButton);
        entry.appendTo(list);
        input.val("");
        input.focus();
        checkBox.on('click', checkComplete);
      },
      error: function(){
        alert("Could not load because cannot access server.");
      }
    });

  });

});