//keeping track of state for css transform and textShadow properties

let itemAngles = [];
let itemStretches = [];
let itemDropShadows = "none";

//generating 30x30 character grid; default character is "I"

window.onload = function generateCharacters(){
  for (let i=0; i<900; i++){
    itemAngles.push(0);
    itemStretches.push(20);
    const para = document.createElement("div");
    para.className = "grid-item";
    para.setAttribute("id", "cell"+i);

    const node = document.createTextNode(character.value);
    para.appendChild(node);

    const container = document.getElementById("gridContainer");
    container.appendChild(para);
    }
}

const gridItems = document.getElementsByClassName("grid-item");

//SLIDERS

//thickness (weight) slider

const sliderThickness = document.getElementById("thickness");
const outputThickness = document.getElementById("thicknessValue");
outputThickness.innerHTML = sliderThickness.value;

sliderThickness.oninput = function() {
  outputThickness.innerHTML = this.value;

  for (const item of gridItems){
    item.style.fontWeight = this.value;
  }
}

//font size slider

const sliderFontSize = document.getElementById("fontSize");
const outputFontSize = document.getElementById("fontSizeValue");
outputFontSize.innerHTML = sliderFontSize.value;

sliderFontSize.oninput = function () {
  outputFontSize.innerHTML = this.value;
  for (const item of gridItems){
    item.style.fontSize = this.value +"pt";
  }
}

//jitter slider

const sliderJitter = document.getElementById("jitter");
const outputJitter = document.getElementById("jitterValue");
outputJitter.innerHTML = sliderJitter.value;

sliderJitter.oninput = function() {
  outputJitter.innerHTML = this.value;
  for (const item of gridItems){

    const randomMultiplier = function() {
      let plusOrMinus = Math.random() > 0.5 ? 1 : -1;
      return 0.5 * Math.random() * plusOrMinus;
    }

    item.style.margin = "0 0" + this.value*randomMultiplier() + "px " + this.value*randomMultiplier() + "px";
  }
}

//drop shadow slider

const sliderDropShadow = document.getElementById("dropShadow");
const outputDropShadow = document.getElementById("dropShadowValue");
outputDropShadow.innerHTML = sliderDropShadow.value;

sliderDropShadow.oninput = function () {
  outputDropShadow.innerHTML = this.value;
  if (this.value <=0){
    for (const item of gridItems){
      itemDropShadows = "none";
      item.style.textShadow = itemDropShadows;
    }
  }
  else {
    itemDropShadows = this.value + "px " + this.value + "px " + "0 ";
    for (const item of gridItems){
      item.style.textShadow = itemDropShadows + picker2.color.rgbaString;
    }
  }
}

//spacing slider (note: this adjusts the grid container rather than the grid elements)

const sliderSpacing = document.getElementById("spacing");
const outputSpacing = document.getElementById("spacingValue");
outputSpacing.innerHTML = sliderSpacing.value;

sliderSpacing.oninput = function () {
  outputSpacing.innerHTML = this.value;
  gridContainer.style.gridTemplate = "repeat(30, " +  this.value + "px) / repeat(30, " + this.value + "px)";
}

//angle slider (adjusts angles of individual characters)

const sliderAngle = document.getElementById("angle");
const outputAngle = document.getElementById("angleValue");
outputAngle.innerHTML = sliderAngle.value;

sliderAngle.oninput = function () {
  outputAngle.innerHTML = this.value;
  for (let i=0; i<gridItems.length; i++){
    newAngle =  itemAngles[i]+this.value % 360;
    gridItems[i].style.transform = "rotate(" + newAngle + "deg) scaleY(" + itemStretches[i]/20 + ")";
   itemAngles[i] = newAngle;
  }
}

//stretch slider

const sliderStretch = document.getElementById("stretch");
const outputStretch = document.getElementById("stretchValue");
outputStretch.innerHTML = sliderStretch.value;

sliderStretch.oninput = function () {
  outputStretch.innerHTML = this.value;
  for (let i=0; i<gridItems.length; i++){
    gridItems[i].style.transform = "rotate(" + itemAngles[i] + "deg) scaleY(" + this.value/20 + ")";
    itemStretches[i] = this.value;
  }
}

//rotation slider (adjusts angle of overall layout)

const sliderRotation = document.getElementById("rotation");
const outputRotation = document.getElementById("rotationValue");
outputRotation.innerHTML = sliderRotation.value;

sliderRotation.oninput = function () {
  outputRotation.innerHTML = this.value;
  gridContainer.style.transform = "rotate(" + this.value + "deg)";
}

//BUTTONS

//randomise button (randomly adjusts the angle of each character)

const randomiseButton = document.getElementById("randomiseButton");

randomiseButton.onclick = function () {
  itemAngles = [];
  for (let i=0; i<gridItems.length; i++){
    let randomAngle = Math.random()*360;
    gridItems[i].style.transform = "rotate(" + randomAngle + "deg) scaleY(" + itemStretches[i]/20 + ")";
    itemAngles[i] = randomAngle;
  }
}

//right angles button (randomly adjusts each character to 0 or 90 degrees)

const rightAnglesButton = document.getElementById("rightAnglesButton");

rightAnglesButton.onclick = function () {
  for (let i=0; i<gridItems.length; i++){
    let randomAngle = Math.round(Math.random()*4)*90;
    gridItems[i].style.transform = "rotate(" + randomAngle + "deg) scaleY(" + itemStretches[i]/20 + ")";
    itemAngles[i] = randomAngle;
  }
}

//alternate button (adjusts character angles so they alternate between 90 and 270 degrees)

const alternateButton = document.getElementById("alternateButton");

alternateButton.onclick = function () {
  for (let i=0; i<gridItems.length; i++){
    if (i % 2 !==0){
      gridItems[i].style.transform = "rotate(90deg) scaleY(" + itemStretches[i]/20 + ")";
      itemAngles[i] = 90;
    }
    else {
      gridItems[i].style.transform = "rotate(270deg) scaleY(" + itemStretches[i]/20 + ")";
      itemAngles[i] = 270;
    }
  }
}

//regularise button (adjusts all character angles to 0 degrees)

const regulariseButton = document.getElementById("regulariseButton");

regulariseButton.onclick = function () {
  for (let i=0; i<gridItems.length; i++){
    gridItems[i].style.transform = "rotate(0deg) scaleY(" + itemStretches[i]/20 + ")";
    itemAngles[i] = 0;
  }
}

//CHARACTER INPUT

//input form which allows alternate characters to be inserted into the pattern

const characterInput = document.getElementById("character");

characterInput.oninput = function () {
  for (let i=0; i<gridItems.length; i++){
    gridItems[i].innerHTML = characterInput.value;
  }
}

//BLEND MODE SELECTOR

const blendOptions = document.getElementById("blendOptions");

blendOptions.oninput = function () {
  for (const item of gridItems){
    item.style.mixBlendMode = blendOptions.value;
  }
}

const parent0 = document.getElementById('parent0');
const background = document.getElementById('wrapper');

const picker0 = new Picker({
  parent: parent0,
  color: "#2197ac",
  popup: "top",
  alpha: false,
  onChange: function (color) {
    background.style.backgroundColor = color.rgbaString;
    parent0.style.backgroundColor = color.rgbaString;
    }
  });

const parent1 = document.getElementById("parent1");
const picker1 = new Picker({
  parent: parent1,
  color: "#f45555ff",
  popup: "top",
  onChange: function (color) {
    background.style.color = color.rgbaString;
    parent1.style.backgroundColor = color.rgbaString;
    }
  });

  const parent2 = document.getElementById("parent2");
  const picker2 = new Picker({
    parent: parent2,
    color: "#356969ff",
    popup: "top",
    onChange: function (color) {
      for (const item of gridItems){
          item.style.textShadow = itemDropShadows + color.rgbaString;
      }

      parent2.style.backgroundColor = color.rgbaString;
      }
    });

console.log(picker1.color)
