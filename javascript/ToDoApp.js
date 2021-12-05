let input = document.getElementById("inp"),
    plus = document.querySelector(".plus"),
    maindiv = document.querySelector(".task_content"),
    tasks = document.querySelector(".task_content"),
    array_of_tasks = Array.from(tasks.children),
    notasks = document.querySelector(".notasks"),
    anydeletebutton = document.querySelector(".delete");
//localStorage.clear();
    let arraytasks =[] ; 

if(localStorage.getItem('tasks')){
    arraytasks = JSON.parse(localStorage.getItem('tasks')) ; 
}
Get_Data_From_Localstorage();
    plus.onclick=function () {
        if(input.value !==""){
            addtask(input.value) ; 
        }
      }


function addtask (texttask) {
    const tasks = {
        id : Date.now() , 
        title: texttask         
    }
    arraytasks.push(tasks) ;
    Add_Tasks_TO_Body_element(arraytasks) ;
    Add_Data_To_Localstorage(arraytasks) ;   
    console.log(arraytasks) ; 

}
function Add_Tasks_TO_Body_element(arraytasks){
 maindiv.innerHTML ="" ;
 arraytasks.forEach((item) => {
  /* ********************************************/

  new_div = document.createElement("div"),
  new_span = document.createElement("span"),
  content_of_span = document.createTextNode(item.title.toLocaleUpperCase()),
  id_of_element = new_div.id = item.id;
  deletebutton = document.createElement("button"),
  completebutton = document.createElement("button"),
  content_del = document.createTextNode("Delete"),
  content_com = document.createTextNode("Complete");
 deletebutton.appendChild(content_del);
 completebutton.appendChild(content_com);
 deletebutton.className = "btn btn-danger delete";
 completebutton.className = "btn btn-primary";
 // create span
 if (item.title.length > 0 && item.title.length < 30) {
  new_span.appendChild(content_of_span);
  new_div.appendChild(new_span);
  new_div.appendChild(deletebutton);
  new_div.appendChild(completebutton);
  new_div.className = "task shadow p-3 mb-5 bg-body rounded";
  // push new div
  array_of_tasks.push(new_div);
  maindiv.appendChild(new_div);
  input.value = "";
  deletebutton.onclick = delete_element; completebutton.onclick = completed;
  no_tasks();
 }
/************************************************ */
 });
   
}
function delete_element() {
    this.parentElement.children[1].style.display = "none";
    this.parentElement.children[2].style.display = "none";
    this.parentElement.children[0].innerHTML = "Deleted...!";
    this.parentElement.children[0].style.cssText ="color:white ; margin:0 0 0 45%" ; 
    let main_div = this.parentElement;
    main_div.className = "task  new_div_deleted";
    setTimeout(() => {
        this.parentElement.remove();
        console.log("completed");
        no_tasks();
    }, 2000);
    delete_item_from_localstorage(this.parentElement.id) ; 
}
// ------------------- completed element ---------------------------------
function completed() {
    this.parentElement.children[1].style.display = "none";
    this.parentElement.children[2].style.display = "none";
    this.parentElement.children[0].innerHTML = "Completed...!";
    this.parentElement.children[0].style.color = "white";
    this.parentElement.children[0].style.margin = "0 0 0 45%";
    let main_div = this.parentElement;
    //main_div.classList.add('new_div') ;
    main_div.className = "task new_div";

    setTimeout(() => {
        this.parentElement.remove();console.log("completed");no_tasks();
    }, 2000);
delete_item_from_localstorage(this.parentElement.id) ; 
}

function Add_Data_To_Localstorage(arraytasks) {
    localStorage.setItem('tasks', JSON.stringify(arraytasks)) ; 
  }
  function Get_Data_From_Localstorage() {
      let data =JSON.parse(localStorage.getItem('tasks') ) ; 
      if(data)
          Add_Tasks_TO_Body_element(data) ; 
    }
function delete_item_from_localstorage(id_to_delete){
arraytasks = arraytasks.filter((task)=> task.id != id_to_delete) ; 
Add_Data_To_Localstorage(arraytasks);
}
function no_tasks() {
    if (arraytasks.length > 0) notasks.style.display = "none";
    else notasks.style.display = "block";
}