
class PopitState{
      constructor(rows, columns){
        this.rows=rows;
        this.colums=columns;
        this.popits=[];
        for(let i=0;i<this.rows+1;i++){
            this.popits[i]=[];
            for(let j=0;j<this.colums+1;j++){
                this.popits[i][j]=false;
            }
        }
    }
    setPopitsOut(){
        for(let i=0;i<this.rows+1;i++){
            for(let j=0;j<this.colums+1;j++){
                this.popits[i][j]=true;
            }
        }
    }
    setPopitsIn(){
        for(let i=0;i<this.rows+1;i++){
            for(let j=0;j<this.colums+1;j++){
                this.popits[i][j]=false;
            }
        }
    }
    toggleButton(i,j){
        this.popits[i-1][j-1] = !this.popits[i-1][j-1]
    }
    static createDefaultState() {
        return new PopitState(4, 6)
    }
}

popitState = PopitState.createDefaultState()



function updateButtons(){
    
        for(let i=0;i<popitState.rows;i++){
            for(let j=0;j<popitState.colums;j++){
            let currentButton=document.getElementById(makeButtonId(i+1,j+1));
            if (popitState.popits[i][j]){
                currentButton.classList="";
                currentButton.classList.add('inside');
            }
            else{
                currentButton.classList="";
                currentButton.classList.add('outside');
            }
        }
        }
}
function makeButtonId(row, col){
    return `row-${row-1}-col-${col-1}`
}
function fillRow(rowNumber,newCol){
    let colors=["perple-in","blue","green","yellow","orange","red"]
    for (let i = 1; i <= popitState.rows; i++){
        let newCircle=document.createElement("img");
        newCircle.src=`images/${colors[rowNumber - 1]}.svg`;
        newCircle.className="outside";
        newCircle.setAttribute('id',makeButtonId(i,rowNumber));
        newCircle.addEventListener('click', function () {
            popitState.toggleButton(i,rowNumber);
            updateButtons();
            })
        newCol.appendChild(newCircle);
    }
}

function createPopit()
{
    for (let i = 1; i <= popitState.colums; i++){
        let newCol=document.createElement("div");
                newCol.className=`row-${i}`;
        
        let colElem=document.querySelector(".rows");
        colElem.appendChild(newCol); 
        fillRow(i,newCol);
    } 
}

let buttonToPushIn=document.getElementById("all-in-b")
buttonToPushIn.addEventListener('click', function () {
    popitState.setPopitsOut();
    updateButtons();
})
let buttonToPushOut=document.getElementById("all-out-b")
buttonToPushOut.addEventListener('click', function () {
   popitState.setPopitsIn();
   updateButtons();
})

document.addEventListener("DOMContentLoaded", function(event) { 
    createPopit();
});

