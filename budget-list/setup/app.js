// select items
const showAlert = document.querySelector(`.alert`);
const budgetText = document.querySelector(`#budget`);
const budgetForm = document.querySelector(`.budgetList-form`);
const btnSubmit = document.querySelector(`.submit`);
const listContainer = document.querySelector(`.budgetList-container`);
const budgetList = document.querySelector(`.budgetlist`);
const deleteAll = document.querySelector(`.clear-btn`);

let editElement;
let editFlag = false;
let editId = ``;

budgetForm.addEventListener(`submit`, addItems);
deleteAll.addEventListener(`click`, clearAll)
window.addEventListener(`DOMContentLoaded`, setupList)

// functions
function addItems(event) {
   event.preventDefault();
   const value = budgetText.value;

   const id = new Date().getTime().toString();

   if (value && !editFlag){
      createList(id, value)
      listContainer.classList.add("show-container");
      //  display alert
      displayAlert(`list successfully updated`, `success`);  
      // add to local storage
      addToLocalStorage(id, value);
      // set back to default
      setBackToDefault();
   }
   else if (value && editFlag){
      editElement.innerHTML = value;
      //  display alert
      displayAlert(`item successfully changed`, `success`);
      // edit local storage
      editLocalStorage(editId, value)
      // set back to default
      setBackToDefault();
      editLocalStorage(id,value)
   }
   else {
      displayAlert(`please input text`, `danger`);
   };

};
/**** setup functions ****/

// display alert 
function displayAlert(text, action){
   showAlert.textContent = `${text}`;
   showAlert.classList.add(`alert-${action}`);
   setTimeout(function clearAlert() {
      showAlert.textContent = ``;
   showAlert.classList.remove(`alert-${action}`);
   }, 1000)
};
// // set back to default 
function setBackToDefault(){
   budgetText.value = ``;
   editFlag = false;
   editId = ``;
   btnSubmit.textContent = `Add`;
}
// delete btn
function deleteItem(event){
   // select delete item
   const item = event.currentTarget.parentElement.parentElement;
   const id = item.dataset.id;
   // delete selected item
   budgetList.removeChild(item);
   if(budgetList.children.length === 0){
      listContainer.classList.remove(`show-container`);
   };
   // display alert
   displayAlert(`Item deleted`, `danger`);
   // remove from local storage
   removeFromLocalStorage(id);
};
// edit btn
function editItem(event){
   const item = event.currentTarget.parentElement.parentElement;
   // select edit item
   editElement = event.currentTarget.parentElement.previousElementSibling;
   budgetText.value = editElement.innerHTML;
   editFlag = true; 
   editId = item.dataset.id;
   btnSubmit.textContent = `Edit`; 
};
// clear all 
function clearAll(){
   const items = document.querySelectorAll(`.budget-item`);
   if(items.length > 0){
      items.forEach(function (item) {
         budgetList.removeChild(item);
      });
   };
   displayAlert(`you cleared all items from your list`, `danger`)
   listContainer.classList.remove(`show-container`);
   setBackToDefault();
   localStorage.removeItem(`list`);
};

/**** local store ****/

// add to local storage  
function addToLocalStorage(id,value) {
   const budget = {id:id,value:value};
   // iterate to see if we have any items in our localStorage
   let items = localStorage.getItem(`list`)?JSON.parse(localStorage.getItem(`list`)):[]; 
   items.push(budget)
   localStorage.setItem(`list`, JSON.stringify(items));
};
// remove From Local Storage
function removeFromLocalStorage(id){
   let items = localStorage.getItem(`list`)?JSON.parse(localStorage.getItem(`list`)):[];

    items = items.filter(function (item) {
      if (item.id !== id){
         return item;
      }
    })
    localStorage.setItem(`list`, JSON.stringify(items));
};

function editLocalStorage(id,value){
   let items = localStorage.getItem(`list`)?JSON.parse(localStorage.getItem(`list`)):[];
   items = items.map(function (item){
      if(item.id === id){
         item.value = value;
      }
      return item
   })
   localStorage.setItem(`list`, JSON.stringify(items));
}

/**** setup list ****/

function setupList(){
   let items = localStorage.getItem(`list`)?JSON.parse(localStorage.getItem(`list`)):[];

if (items.length > 0){
   items = items.forEach(function(item){
      createList (item.id, item.value)
   });
   listContainer.classList.add("show-container");
}

};
// create list
function createList (id, value){
   const element = document.createElement(`article`);
   element.classList.add(`budget-item`);
   const artt = document.createAttribute(`data-id`);
   artt.value = id;
   element.setAttributeNode(artt);
   element.innerHTML = `<p class="item">${value}</p>
   <div class="btn-container">
      <button type="botton" class="edit-btn"><i class="fas fa-edit" style="color: green;"></i></button> 
      <button type="botton" class="delete-btn"><i class="fas fa-trash" style="color: red;"></i></button> 
   </div>`;
   // select delete/edit btn
   const deleteBtn = element.querySelector(`.delete-btn`);
   const editBtn = element.querySelector(`.edit-btn`);
   // addEventListener to delete/edit btn
   deleteBtn.addEventListener(`click`, deleteItem);
   editBtn.addEventListener(`click`, editItem);
   // update list
   budgetList.appendChild(element);
}