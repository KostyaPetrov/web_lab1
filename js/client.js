const form=document.querySelector('#inputForms');
const validatedButton = document.querySelector('#submitButton');
// let xCoordinate=document.getElementsByClassName('.button');
var xValue;


let xCoordinate;
const yCoordinate=document.querySelector('#coordinateY');
const rCoordinate=document.querySelector('#radiusR');

let coordinate;



function checkTextData(data, min, max){
  coordinate=data.value;
  
  if(coordinate){
    coordinate=coordinate.replace(',','.');
    if(coordinate<min || coordinate>max || !isNumber(coordinate)){
      let error=generateTip('Invalid data','red');
      data.parentElement.insertBefore(error,data);
      return false;
    }else{
      let correct=generateTip('Correct data', 'green');
      data.parentElement.insertBefore(correct, data);
      return true;

    }
  }else{
    let error=generateTip('Field is blank', 'red');
    data=parentElement.insertBefore(error, data);
    return false;
  }


}

// function checkButton(data){

//   return xCoordinate=data[data.length];

// }

function checkAllData(){
  const param1=checkSelection(xCoordinate);
  const param2=checkTextData(yCoordinate, -5,3);
  const param3=checkTextData(rCoordinate, 2, 5);
  return param1 && param2 && param3;
}

function putFieldX(coordinate){
  let xFirstElement = form.querySelector('.button');
  let inform=coordinate.value;
  let fieldd=generateTip(inform,'green');
  xFirstElement.parentElement.insertBefore(fieldd,xFirstElement);
}

function setCoordinateX(param){
  
  removeValidation();
  xCoordinate=param;
  xValue=param.value;
  putFieldX(xCoordinate);
  
  let check=isNumber(xValue);
  console.log('isNumber:', check);
  // displayX();
  console.log('xCoordinate in setCoordinate ',param);
  console.log('xCoordinate.value in setCoordinate ' , param.value);
  // checkSelection(xCoordinate);
}

function clearCoordinateX(){
  xCoordinate=undefined;
}

// function displayX(){
//   form.querySelector('#xCoordinate').innerHTML=xCoordinate;

// }

function checkSelection(data) {
  if(data!=undefined || data!=''){

    return true
  }else{
    let xFirstElement = form.querySelector('.button');
    
  
    let error = generateTip('field is blank','red');
    xFirstElement.parentElement.insertBefore(error,xFirstElement);
    console.log('I am in checkerSelection')
    // data.parentElement.insertBefore(error, '.option_data');
    return false;
  }
}

function isNumber(data){
  let n = parseFloat(data.replace(',','.'));
  return !isNaN(n) && isFinite(n);

}

function generateTip(text, color) { 
  let tip = document.createElement('div');
  tip.className = 'tip';
  tip.style.color = color;
  tip.innerHTML = text;
  return tip;
}

function removeValidation() {
  var tips = form.querySelectorAll('.tip')      
  for (var i = 0; i < tips.length; i++) {
      tips[i].remove()
  }
}


$(document).ready(function(){
  $.ajax({
    url:'php/load.php',
    method:'POST',
    dataType:'html',
    success:function(data){
      console.log('JS start');
      console.log(data);

      $('#resultTable>tbody').html(data);
    },
    error:function(error){
      console.log(error)
    }
  })

  // $('.button').on('click', function(event){
  //   console.log('x:'.xCoordinate);
  //   console.log('x.value:'. xCoordinate.value); 
  //   xValue=xCoordinate.value;
  // })

  // $('.button').on('click', function(event){
  //   xValue = $(this).value;
  //   console.log(xValue);
  // })

  // $('#coordinateX').click(function(event){
  //   console.log('x:', xCoordinate.value); 
  // })

  $('#inputForms').on('submit', function(event){
    event.preventDefault();
    // console.log('coordinates: '.xCoordinates);
   
    // xCoordinate=xCoordinates[xCoordinates.length-1];
    console.log("Got data for check!" );
    console.log('y: ', yCoordinate.value);
    console.log('R: ', rCoordinate.value);
    
    removeValidation();
    putFieldX(xCoordinate);

    if(!checkAllData()){
      console.log('post canceled')
      return
    }
    console.log('X:', xCoordinate.value);
    console.log('window:',window);
    console.log("data sending...");
  
    console.log('x=' + xValue+'&'+$(this).serialize());

 

    $.ajax({
      url:'php/server.php',
      method:'POST',
      data:'x=' + xValue+'&'+$(this).serialize() + "&timezone=" + new Date().getTimezoneOffset(),
      dataType: "html",
      success: function(data){
        console.log('Post:',data);
        $(".validate_button").attr("disabled", false);	
        $("#resultTable>tbody").html(data);
      },
      error:function(error){
        console.log('Error in POST:',error);
        $(".validate_button").attr("disabled", false);	
      }

    })
  });

  $(".reset_button").on("click",function(){
    removeValidation();
    clearCoordinateX();
    

    $.ajax({
      url: 'php/clear.php',
      method: "POST",
      dataType: "html",
      success: function(data){
        console.log(data);
        $("#resultTable>tbody").html(data);
      },
      error: function(error){
        console.log(error);	
      },
    })

  })
})