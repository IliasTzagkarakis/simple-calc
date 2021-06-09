let result = 0;
let temp = '0';
let op;
const screen = document.querySelector('.result');

let numbers = ['item-zero','item-one','item-two','item-three','item-four','item-five'
                ,'item-six','item-seven','item-eight','item-nine'
                ,'item-delete','item-back','item-divide','item-plus','item-minus','item-mult','item-val'];

numbers.forEach(num=>document.querySelector(`.${num}`).addEventListener('click', function(e){
    buttonClick(e.target.innerText);
}));

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){
    if(temp==='0'){
        temp = value;
    }else{
        temp += value;
    }
}

function handleSymbol(value){
   switch(value){
        case 'C':
           temp='0';
           op= null;
           result = 0;
           break;
        case '=':
           if (op===null){
               return;
           }
           flushOperation(parseInt(temp));
           op=null;
           temp = "" + result;
           result = 0;
           break;
        case 'b':
            if(temp.length === 1){
                temp = '0';
            } else {
                temp = temp.substring(0, temp.length - 1);
            }
        default:
            handleMath(value);
            break;
   }
   rerender();
}


function handleMath(value){
    const intTemp = parseInt(temp);
    if(result===0){
        result = intTemp;
    } else {
        flushOperation(intTemp);
    }

    op = value;
    temp = '0';
}

function flushOperation (intTemp){
    if (op === '+'){
        result += intTemp;
    } else if (op === '-'){
        result -= intTemp;
    } else if (op === '/'){
        result /= intTemp;
    } else {
        result *= intTemp;
    }
}

function rerender(){
    screen.innerHTML = temp;
}

