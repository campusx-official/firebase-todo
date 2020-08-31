$(document).ready(function(){

	var firebaseConfig = {
    apiKey: "AIzaSyCQJFCeWtzbhkRv0rzGdam0Ja_SfVgWBY0",
    authDomain: "todoist-537b2.firebaseapp.com",
    databaseURL: "https://todoist-537b2.firebaseio.com",
    projectId: "todoist-537b2",
    storageBucket: "todoist-537b2.appspot.com",
    messagingSenderId: "1583003983",
    appId: "1:1583003983:web:78999d543db4a2637b6d3a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let todo = firebase.database().ref('todo');

  todo.on('value',function(snapshot){

  	let data = snapshot.val()

  	$('#pending').html('');
  	$('#completed').html('');

  	for(let key in data){

  		if(data[key].status==="Pending"){
  			$('#pending').append(`
  			<div class="card">
				<div class="card-body">
					<h5>${data[key].task}</h5>
					<button data-id="${key}" class="btn btn-danger btn-sm delete">Delete</button>
					<button data-id="${key}" class="btn btn-success btn-sm complete">Completed</button>
				</div>
			</div>
  			`);
  		}else{
  			$('#completed').append(`
  				<div class="card">
					<div class="card-body">
						<h5>${data[key].task}</h5>
					</div>
				</div>
  				`);
  		};

  		
  	};
  })

  $('#add-task').click(function(){
  	
  	let task = $('#task-input').val();

  	let todoRef = todo.push({
  		task:task,
  		status:'Pending'
  	});

  	$('#task-input').val('');
  	alert("Task added");

  });

  //Event Delegation

  $('#pending').on('click','.delete',function(){
  		
  	let taskId = $(this).data("id");

  	// delete that particular task

  	firebase.database().ref('todo/' + taskId).remove();

  });

  $('#pending').on('click','.complete',function(){
  		
  	let taskId = $(this).data("id");

  	// delete that particular task

  	firebase.database().ref('todo/' + taskId).update({
  		status:'Completed'
  	});

  });

  




})