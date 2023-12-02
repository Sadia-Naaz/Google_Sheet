
//extracted the span element in where we are gonna display the id of selected/focused cell
let activeCellId = null;
const activeCellElement = document.getElementById("active-cell");
 
const form = document.getElementById("options");
const state ={};
form.addEventListener("change",changeFormData);

const deFaultOptionState = {
  fontFamily:"Roboto",
  isBold : false,
  isItalic : false,
  isUnderlined  : false,
  textalign : "left",
  textColor  : "#000000",
  bgColor : "#ffffff",
  fontSize:16,
  text :""

};



function focusCell(event){
  if (activeCellId === event.target.id) return;
  activeCellId = event.target.id;
  activeCellElement.innerText = activeCellId;
//reset the form according to the selection process of the cell
if(state[activeCellId]){
  resetForm(state[activeCellId]);
  console.log(state);
}
else{//if the cell is selected first time 
  resetForm(deFaultOptionState);
}
}

 
 function changeFormData(){

  const options ={
    fontFamily : form["fontFamily"].value,
    textColor : form["textColor"].value,
    textalign : form["textalign"].value,
    bgColor : form["bgColor"].value,
    isBold: form["isBold"].checked,
    isItalic : form["isItalic"].checked,
    isUnderlined :form["isUnderlined"].checked,
    fontSize:form["fontSize"].value,
    
};

applyStyles(options);


 }
 
function applyStyles(styles){

if(!activeCellId){
  form.reset();
   alert("please select a cell first!");
   return;
}
const activeCell = document.getElementById(activeCellId);
  activeCell.style.color = styles.textColor;
  activeCell.style.backgroundColor=styles.bgColor;
  activeCell.style.textAlign=styles.textalign;
  activeCell.style.fontWeight=styles.isBold?"600":"400";
  activeCell.style.fontFamily=styles.fontFamily;
  activeCell.style.textDecoration=styles.isUnderlined?"underline":"none";
  activeCell.style.fontStyle=styles.isItalic?"italic":"normal";
  activeCell.style.fontSize=styles.fontSize+"Px";

//storing the  selected styles in the state object 
  state [activeCellId] =  { ...styles, text: activeCell.innerText };;
};
function resetForm(styles){
 form.textColor.value = styles.textColor;
 form.bgColor.value=styles.bgColor;
 form.textalign.value=styles.textalign;
 form.isBold.checked=styles.isBold;
 form.fontFamily.value=styles.fontFamily;
 form.isUnderlined.checked=styles.isUnderlined;
 form.isItalic.checked=styles.isItalic;
 form.fontSize.value=styles.fontSize;
}

function onChangeCellText(event) {
  let changedText = event.target.innerText;
  if (state[activeCellId]) {
     
      state[activeCellId].text = changedText;
  }
  else {
      state[activeCellId] = { ...deFaultOptionState, text: changedText };
  }
}

function exportData() {
  
  const jsonData = JSON.stringify(state);
  const blob = new Blob([jsonData], { type: "text/plain" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "data.json";
  link.href = url;
  link.click();
}




