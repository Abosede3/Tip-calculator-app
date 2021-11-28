// declaring variables
const bill = document.getElementById('bill-amount');
const tipsbtn = document.querySelectorAll('#tip-percentage');
const tipCustom = document.getElementById('custom-percentage');
const noOfPeople = document.getElementById('num-of-people');
const results = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.reset');




// Adding event listeners to my inputs
bill.addEventListener('input', setBillValue);
tipsbtn.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setCustomValue);
noOfPeople.addEventListener('input', setNoOfPeople);
resetBtn.addEventListener('click', reset);



// setting a value for inputs
let billValue = 0.0;
let tipValue = 0.15
let PeopleValue = 1;




// Functions

function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}
function validateInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue(){
    if(bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }
    if(!validateFloat(bill.value)){
        bill.value =  bill.value.susbtring(0, bill.value.length-1);
    }
    billValue = parseFloat(bill.value);

    sumUp();
    // console.log(billValue);
}



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

function setNoOfPeople(){
    
    if(!validateFloat(noOfPeople.value)){
        noOfPeople.value =  noOfPeople.value.susbtring(0, noOfPeople.value.length-1);
    }
    PeopleValue = parseFloat(noOfPeople.value);

    if(PeopleValue === 0){
        alert('cant be a zero ')
    } 
    sumUp();
}

function sumUp(){
   if(PeopleValue >= 1){
       let totalAmount = billValue * tipValue / PeopleValue;
       let total = billValue* (tipValue + 1)/ PeopleValue;
       results[0].innerHTML = '$' + totalAmount.toFixed(2);
       results[1].innerHTML = '$' + total.toFixed(2);

   }
}

function reset(){
    
        billValue = 0.0;
        
        setBillValue();
        tipsbtn[2].click();

        PeopleValue = '1';
        setNoOfPeople();
}
