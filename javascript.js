//Basics section
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Makes the box to hold the buttons
function makeBox() {
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;

    let minimum = Math.min(width,height) * 0.7;
    let margin = Math.min(width,height) * 0.15;

    let box = document.createElement("div");
    let style = "width: " + minimum + "px;" + "height: " + minimum + "px; background-color: #555588; margin: " + margin + "px;";
    box.style = style;
    box.id = "box";
    
    document.getElementById("middle").appendChild(box);

}

//Function to resize the box
function onResize() {
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;

    let minimum = Math.min(width,height) * 0.7;
    let margin = Math.min(width,height) * 0.15;

    let box = document.getElementById("box");
    let style = "width: " + minimum + "px;" + "height: " + minimum + "px; background-color: #555588; margin: " + margin + "px;";
    box.style = style;
}

//Generates 1 button with the id of numButton
function generateButton(numButton) {
    let width = document.getElementById("box").offsetWidth;
    let side = (width/stage)*0.90;
    let margin = side*0.05;

    let btn = document.createElement("div");
    btn.id = numButton;
    btn.className = "buttons";
    btn.setAttribute("onclick", "onClickBtn(this)");

    //let style = "width: " + side + "px;" + "height: " + side + "px; background-color: #9999FF; float: left; margin: " + margin + "px; text-align: center; font-size: 3em;";
    //btn.style = style;
    colorBtn(btn, "#9999FF", "buttons")
    document.getElementById("box").appendChild(btn);
}

//Generates the buttons to fill the matrix
function generateButtons() {
    let numButtons = stage*stage;
    for(let i = 1; i <= numButtons; i++)
    {
        generateButton(i);
    }
}

//Functions for handling interaction with game
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Onclick function when clicking button
function onClickBtn(btn)
{
    if(btn.className == "buttons")
    {
        colorBtn(btn, "#99FF88", "clicked")
        let num = parseInt(btn.id);
        usrBtnOrder.push(num);
        console.log(usrBtnOrder);
        //Handle if it is above stage number

        let amountSelected = usrBtnOrder.length-1;
        if(amountSelected > -1)
        {
            if(usrBtnOrder[amountSelected] == btnOrder[amountSelected])
            {
                scor++
                document.getElementById("score").value = scor;
                var correctAudio = new Audio('correct.mp3');
                correctAudio.play();
            }
            else
            {
                let btn = document.getElementById(btnOrder[amountSelected]);
                colorBtn(btn, "#FF0000", "buttons");
                var wrongAudio = new Audio('wrong.wav');
                wrongAudio.play();
                scor--;
                document.getElementById("score").value = scor;
                if(scor <= 0)
                {
                    lockGame();
                }
            }
        }

        if(usrBtnOrder.length == stage)
        {
            let correct = true;
            for(let i = 0; i < stage && correct == true; i++)
            {
                if(usrBtnOrder[i] != btnOrder[i])
                {
                    correct = false;
                }
            }
            if(correct)
            {
                document.getElementById("box").innerHTML = "";
                //scor++;
                if(stage < 7)
                {
                    stage++;
                }
                
                //document.getElementById("score").value = scor;
                generateButtons();
                roundStart();
            }
            else
            {
                document.getElementById("box").innerHTML = "";
            
                if(stage > 2)
                {
                    stage--;
                    
                }
                document.getElementById("score").value = scor;
                generateButtons();
                roundStart();
                
                
            }
            
        }
    }
}

function lockGame()
{
    let numBtns = stage*stage;
    for(let i = 1; i <= numBtns; i++)
    {
        let btn = document.getElementById(i);
        btn.className = "locked";
    }
}

function colorBtn(btn, color, className)
{
    let width = document.getElementById("box").offsetWidth;
    let side = (width/stage)*0.90;
    let margin = side*0.05
    btn.className = className;
    btn.style = "width: " + side + "px;" + "height: " + side + "px; background-color: " + color + "; float: left; margin: " + margin + "px;";
    
}

function resetBtns()
{
    let numButtons = stage*stage;
    let width = document.getElementById("box").offsetWidth;
    let side = (width/stage)*0.90;
    let margin = side*0.05

    for(let i = 1; i <= numButtons; i++)
    {
        let btn = document.getElementById(i);
        colorBtn(btn, "#9999FF", "buttons");
    }
    
}

function buttonSelectMaker()
{
    let numButtons = stage*stage;
    let baseArray = [];
    //Loads numbers into array
    for(let i = 1; i <= numButtons; i++)
    {
        baseArray.push(i);
    }
    console.log(baseArray);

    //Picks stage number amount of numbers
    for(let i = 0; i < stage; i++)
    {
        let numPick = Math.floor(Math.random()*baseArray.length);
        console.log("Picked number" + numPick);
        console.log("pushing" + baseArray[numPick]);
        btnOrder.push(baseArray[numPick]);
        baseArray.splice(numPick,1);
    }
    console.log("number for choosing " + btnOrder);
    //console.log(baseArray);
}

function putNumOnBtn(btn, order)
{
    btn.innerHTML = order;
}

//Puts the order number on the button
function putNumOnBtns()
{
    for(let i = 0; i < btnOrder.length; i++)
    {
        let btn = document.getElementById(btnOrder[i]);
        colorBtn(btn, "#FF99FF", "buttons");
        putNumOnBtn(btn, (i+1));
    }
}

//Removes order number from the button
function removeNumOnBtns()
{
    for(let i = 0; i < btnOrder.length; i++)
    {
        let btn = document.getElementById(btnOrder[i]);
        colorBtn(btn, "#9999FF", "buttons");
        btn.innerHTML = "";
    }
}

function roundStart()
{
    btnOrder = [];
    usrBtnOrder = [];
    buttonSelectMaker();
    putNumOnBtns();
    
    let fix =  90-deg;

    for(let i = 1; i <= stage*stage; i++)
    {
        let btn = document.getElementById(i);
        btn.style.webkitTransform = 'rotate('+fix+'deg)'; 
        btn.style.mozTransform    = 'rotate('+fix+'deg)'; 
        btn.style.msTransform     = 'rotate('+fix+'deg)'; 
        btn.style.oTransform      = 'rotate('+fix+'deg)'; 
        btn.style.transform       = 'rotate('+fix+'deg)'; 
    }
    //delay
    setTimeout(removeNumOnBtns,2000);
    setTimeout(rotateDiv,2000);
}

function reset()
{
    resetBtns();
}

function start()
{
    stage = 2;

    document.getElementById("middle").innerHTML = "";

    makeBox();
    generateButtons();

    roundStart();
}

function rotateDiv()
{
    let div = document.getElementById("middle");

    div.style.webkitTransform = 'rotate('+deg+'deg)'; 
    div.style.mozTransform    = 'rotate('+deg+'deg)'; 
    div.style.msTransform     = 'rotate('+deg+'deg)'; 
    div.style.oTransform      = 'rotate('+deg+'deg)'; 
    div.style.transform       = 'rotate('+deg+'deg)'; 

    
    //for(let i = 1; i <= stage*stage; i++)
    //{
    //    let btn = document.getElementById(i);
    //    btn.style.webkitTransform = 'rotate('+deg+'deg)'; 
    //    btn.style.mozTransform    = 'rotate('+deg+'deg)'; 
    //    btn.style.msTransform     = 'rotate('+deg+'deg)'; 
    //    btn.style.oTransform      = 'rotate('+deg+'deg)'; 
    //    btn.style.transform       = 'rotate('+deg+'deg)'; 
    //}

    deg += 90;
}

let btnOrder = [];
let usrBtnOrder = [];
let stage = 2;
let scor = 0;

let deg = 90;

start();

//makeBox();
//generateButtons();
//buttonSelectMaker();

//putNumOnBtns();






