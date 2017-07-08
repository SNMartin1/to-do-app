console.log('js sourced');


$(document).ready(function() {
  console.log('jq sourced');
  // load existing tasks on page load
   getTasks();
   deleteTask();
  // add task button click
  $( '#addTaskBtn' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // using a test object
    var newTask = {};
    newTask.task = $('#taskInput').val();

    // function addTaskBtn(newTask){
      $.ajax({
        url: '/tasks',
        type: 'POST',
        data: newTask,
        success: function( data ){
          console.log( 'get to do tasks: ', data );
            getTasks();
        } // end success

      }); //end of ajax
getTasks();
deleteTask();
    // call saveKoala with the new obejct
    // saveKoala(newKoala);
  }); //end addButton on click
}); // end doc ready

function deleteTask() {
$('.delete').on('click', function(){
  console.log('delete clicked');
  var deleteTask = $(this).data('taskid');
  console.log('deleting', deleteTask);
    $.ajax({
      type: 'DELETE',
      url: '/tasks',
      data: {id: deleteTask},
      success: function(response){
        console.log(response);
        getTasks();
      }
    });

});
} //end of deleteTask function


function getTasks(){
  console.log( 'in getTasks' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: function( data ){
      console.log( 'got some tasks: ', data );
      // console.log(data.)
      // var data = {koalas: [Object, Object...]};
      console.log(data.tasks);
      appendToDom(data.tasks);
    } // end success
  }); //end ajax

  // display on DOM with buttons that allow edit of each
} // end getTasks


// tasks should be an array
function appendToDom(tasks) {
  // empty tasks that currently exist in the table before page loads
  $('#taskList').empty();
  for(var i = 0; i < tasks.length; i += 1) {
    var task = tasks[i];
    // For each task, append a new row to our table
    $tr = $('<tr></tr>');
    $tr.data('tasks', task);
    $tr.append('<td>' + task.task + '</td>');
    $tr.append('<td><button class="complete" data-listid="' + task.id + '">Complete</button></td>');
    $tr.append('<td><button class="delete" data-taskid="' + task.id + '">Delete</button></td>');
    $('#taskList').append($tr);
  }
  }
