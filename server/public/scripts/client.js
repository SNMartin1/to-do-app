console.log('js sourced');


$(document).ready(function() {
  console.log('jq sourced');
  // load existing tasks on page load
   getTasks();
   //deleteTask();

  // add task button click
  $( '#addTaskBtn' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    var newTask = {};
    newTask.task = $('#taskInput').val();
    newTask.complete = false;
      $('#taskInput').val(" ");
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
  }); //end addButton on click

  $('.taskTable').on('click', '.delete', function() {
      var taskId = $(this).data('taskid');
      console.log($(this));
      console.log(taskId);
      deleteTask(taskId);
    });

   $('.taskTable').on('click', '.complete', function() {
      var completeTask = $(this).data('listid');
      console.log($(this));
      console.log($(this).parent());
      $(this).parent().parent().addClass("strike");
      console.log('complete button id:', completeTask);

      function updateTask(taskToUpdate) {
      $.ajax({
        type: 'PUT',
        url: '/tasks',
        data: {complete: true, id: completeTask},
        success: function(response) {
          console.log(response);
          //getTasks();
        }
      }); //end of ajax
      }
      updateTask();
    });
}); // end doc ready


function deleteTask(taskId) {
  $.ajax({
    type: 'DELETE',
    url: '/tasks/' + taskId,
    success: function(response){
            console.log(response);
            getTasks();
          } //end success function
  });
}


function getTasks(){
  console.log( 'in getTasks' );
  // ajax call to server to get task
  $.ajax({
    type: 'GET',
    url: '/tasks',
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

function updateTask(taskToUpdate) {
$.ajax({
  type: 'PUT',
  url: '/tasks',
  data: taskToUpdate,
  success: function(response) {
    console.log(response);
    getTasks();
  }
}); //end of ajax
}

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
