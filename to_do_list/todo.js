//select all the neccessary element
var maintodocontainer = document.querySelector('#todos')
var input = document.querySelector('.todo-input');
var addbtn = document.getElementById('todo-add')
var delbtn = document.getElementById('todo-del');

addbtn.addEventListener('click',function(e){
    if(input.value ===''){
        alert('Please add Some Item')
    }else{
    //create all the element
    // creating todo ul
    var ultag = document.createElement('ul');
    ultag.classList.add('todo-list-container')
    
    //creating div
    var todolist = document.createElement('div')
    todolist.classList.add('todo-list')
    
    //li tag
    var litag = document.createElement('li')
    litag.classList.add('todo-item');
    litag.innerHTML = input.value
    // console.log(litag)

    //button div
    var buttondiv = document.createElement('div');
    buttondiv.classList.add('button');
    //create complete btn
    //var completebtn = document.createElement('button');
    //completebtn.classList.add('completed');
    //completebtn.innerHTML = 'done';

    //create edit button
    var editbtn = document.createElement('button');
    editbtn.classList.add('editbutn');
    editbtn.innerHTML = 'Edit';
    editbtn.onclick = function(){
        editworking(litag);
    }
    // delete button
    var delbtn = document.createElement('button');
    delbtn.classList.add('trash');
    delbtn.innerHTML = 'del';

    //appending elements
    ultag.appendChild(todolist);
    todolist.appendChild(litag);
    todolist.appendChild(buttondiv);
    //buttondiv.appendChild(completebtn)
    buttondiv.appendChild(editbtn)
    buttondiv.appendChild(delbtn)

    //console.log(ultag)

    //append all tag in main tag
    maintodocontainer.appendChild(ultag)
    //console.log(maintodocontainer)
    
    // delete element
    todolist.addEventListener('click',function(e){
        var items= e.target    // e.target is basically is return a event when we click on event it will give tag
        if(items.classList[0]==='trash'){
            var todo = items.parentElement;
            var todo2 = todo.parentElement;
            var todo3 = todo2.parentElement;
            todo3.remove();
            
        }
        
    })
    
    
    input.value = '' 
}  
})

function editworking(e){
  var editValue = prompt('edit the selected item',e.firstChild.nodeValue)
  //e.firstChild.nodeValue  // e = litag, firstChild = text, secodChild = editbutton, thirdChild = delete button
  e.firstChild.nodeValue = editValue
}

function deleteAllElements(){
    var getuldiv = document.querySelectorAll('.todo-list-container');
    for(let i in getuldiv){
        getuldiv[i].remove();
    }
}

delbtn.addEventListener('click',function(e){
  deleteAllElements();
})