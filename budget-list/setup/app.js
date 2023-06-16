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

// functions
function addItems(event) {
   event.preventDefault();
   const value = budgetText.value;

   const id = new Date().getTime().toString();

   if (value && !editFlag){
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
      console.log(element)
      listContainer.classList.add("show-container");
      //  dis play alert
      displayAlert(`list successfully updated`, `success`);

      // set back to default
      setBackToDefault();
      // add to local storage
      addToLocalStorage();
   }
   else if (value && editFlag){
      editElement.innerHTML = value;
      console.log(editElement)
      //  display alert
      displayAlert(`item successfully changed`, `success`);
      // edit local storage
      editLocalStorage(editId, value)
      // set back to default
      setBackToDefault();
   }
   else {
      displayAlert(`please input text`, `danger`);
   };

};
// functions
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
// add to local storage  
function addToLocalStorage(Id, value){

};
// delete btn
function deleteItem(event){
   // select delete item
   const item = event.currentTarget.parentElement.parentElement;
   // delete selected item
   budgetList.removeChild(item);
   if(budgetList.children.length === 0){
      listContainer.classList.remove(`show-container`);
   };
   displayAlert(`Item deleted`, `danger`);
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
};
// local storage
function editLocalStorage(id,value){

}