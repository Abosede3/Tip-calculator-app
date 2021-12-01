// declaring variables
const bill = document.getElementById('bill-amount');
const tipsbtn = document.querySelectorAll('#tip-percentage');
const tipCustom = document.getElementById('custom-percentage');
const noOfPeople = document.getElementById('num-of-people');
const results = document.querySelectorAll('.value');
const total = document.getElementById('num-of-people');
const resetBtn = document.querySelector('.reset');
const errorMessage = document.getElementById('error');
const resetEmpty = document.getElementById('reset-active')



// Adding event listeners to my inputs
bill.addEventListener('input', setBillValue);
tipsbtn.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setCustomValue);
noOfPeople.addEventListener('input', setNoOfPeople);
resetBtn.addEventListener('click', resetForm, true);

// resetBtn.setAttribute("disabled",checkBtnState() )
// function checkBtnState (){if(bill.value==0){
// return true
// }else{
//     return false
// }
// }
// setting a set values for the inputs
let billValue = 0;
let tipValue = 0.15
let PeopleValue = 1;




// Validation function for int on the value passed by users

function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}
function validateInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

// Function for Bill
function setBillValue(){
    if(bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }
    if(!validateFloat(bill.value)){
        bill.value =  bill.value.susbtring(0, bill.value.length-1);
    }
    billValue = parseFloat(bill.value);
// if(bill.value){
//     resetBtn.setAttribute("disabled",false)
// }
    sumUp();
    resetActive();
    // console.log(billValue);
}





// Function for tips active button
function handleClick(event){
    tipsbtn.forEach(btn => {
        // Removing active on button
        btn.classList.remove('active');
        // Adding active on click
        if(event.target.innerHTML  === btn.innerHTML){
            btn.classList.add('active');
            tipValue = parseFloat(btn.innerHTML)/100
        }

});
    if(tipCustom !== ''){
        sumUp();
    }
    // tipCustom.value = '';
    // console.log(tipValue);

}
// function for custom
function setCustomValue(){
    if(!validateInt(tipCustom.value)){
        tipCustom.value =  tipCustom.value.susbtring(0, tipCustom.value.length-1);
    }
      tipValue = parseFloat(tipCustom.value/100);
       tipsbtn.forEach(btn => {
        // Removing active on button
        btn.classList.remove('active');
       });
       sumUp();
      
}
//  Set number of people function
function setNoOfPeople(){
    
    if(!validateFloat(noOfPeople.value)){
        noOfPeople.value =  noOfPeople.value.susbtring(0, noOfPeople.value.length-1);
    }
    PeopleValue = parseFloat(noOfPeople.value);

    if(PeopleValue < 1){
        errorMessage.style.display = 'flex';
        noOfPeople.style.border = '4px solid red'
    } else{
        errorMessage.style.display = 'none';
        noOfPeople.style.border = 'none'
    }

    sumUp();
    resetActive();
}

// calculate function
function sumUp(){
   if(PeopleValue >= 1){
       let totalAmount = billValue * tipValue / PeopleValue;
       let total = billValue * (tipValue + 1) / PeopleValue;
       results[0].innerHTML = '$' + totalAmount.toFixed(2);
       results[1].innerHTML = '$' + total.toFixed(2);

   }
}

function resetActive(){
    if((bill.value !== '0'|| !bill.value) && (!noOfPeople.value || noOfPeople !== 1)){
        resetBtn.style.cursor = 'pointer';
        resetBtn.classList.add('reset-active');
        resetBtn.addEventListener('click', resetForm, true);

   }
   else{

           resetBtn.style.cursor = "none";
           resetBtn.classList.remove('reset-active');
           resetBtn.removeEventListener('click', resetForm, true);
   }
  
}



function resetForm(){
    
        bill.value = "0";
        bill.style.color = 'hsl(183, 100%, 15%)';
        noOfPeople.value = "1";
        noOfPeople.style.color = 'hsl(183, 100%, 15%)';
        tipCustom.value = "";
        results[0].innerHTML = '$' + (0.0).toFixed(2);
        results[1].innerHTML = '$' + (0.0).toFixed(2);
        resetActive();
       

     
}
