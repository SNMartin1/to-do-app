var express = require('express');
var router = express.Router();
var pg = require('pg');


var config = {
  database: 'todolist', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time?
  idleTimeoutMillis: 30000 // 30 second time out
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'SELECT * FROM "tasks";';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.send({tasks: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of GET
//
router.post('/', function(req, res) {
  var newTask = req.body;
  console.log(newTask);
  // PASTED PG CODE
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'INSERT INTO "tasks" (task, complete)' +
                      ' VALUES ($1, $2);';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [newTask.task, newTask.complete], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
});

router.delete('/:id', function(req, res){
  var id = req.params.id; // task with updated content
  console.log('Delete route called with id of ', id);

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'DELETE From "tasks" WHERE  id = $1;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
});

//PUT is similar to POST when using PG
router.put('/', function(req, res){
  var task = req.body; // task with updated content
  //console.log('Put route called with id of ', id);

  // YOUR CODE HERE
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'UPDATE "tasks" SET "complete"=$1 WHERE id= $2;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [task.complete, task.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
});

module.exports = router;
