 function Submit(){
   let name = document.getElementById("name").value;
   let email = document.getElementById("email").value;
   let mess = document.getElementById("message").value;
   alert("You Entered:"+"\nName: "+name+"\nEmail: "+email+"\nMessage: "+mess);

 }




    function addTask() {
      const input = document.getElementById('taskInput');
      const text = input.value.trim();
      if (!text) { alert('Please enter a task!'); return; }
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${text}</span>
        <div>
          <button class='btn-done' onclick='toggleDone(this)'>Done</button>
          <button class='btn-del'  onclick='deleteTask(this)'>Delete</button>
        </div>`;
      document.getElementById('taskList').appendChild(li);
      input.value = '';
    }
    function toggleDone(btn) { btn.closest('li').classList.toggle('done'); }
    function deleteTask(btn) { btn.closest('li').remove(); }