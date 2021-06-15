// hjelpevariable for både view og controller
var contentDiv = document.getElementById('content');
// model
let numbers = [7, 3, 1, 5, 8];
let chosenBar; // Variabel for hvilken stolpe som er valgt
let inputValue = 0; // Variabel for hva som er skrevet i input-feltet
var selectedPillar; //variable for valgt stolpe (som skal ha border etc)
var status = "disabled";

const pillar = { min : 1, max : 10, };
const viewDim = { width : 80, height : 80 };
// view

showView();



function calcColor(min, max, val) {
    var minHue = 240, maxHue = 0;
    var curPercent = (val - min) / (max - min);
    var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
    return colString;
}

// controller (ingenting her ennå)

function choosePillar(id) 
{   
    if (selectedPillar == id) selectedPillar = null;
    else selectedPillar = id;

    checkIfChosen();    

    showView();
}

function currentPillar()
{
    return selectedPillar == null ? "Ingen" : selectedPillar;
}

function checkIfChosen()
{
     selectedPillar == null ? status = "disabled" : status = "enabled";
}

function removePillar()
{
    if (inputValue == null || selectedPillar == null) return;

    numbers.splice(selectedPillar-1, 1);

    showView();
}

function addPillar()
{
    if (inputValue == null) return;

    if (inRange(inputValue, pillar.min, pillar.max))
        numbers.push(inputValue);
    else
        throwValueError();

    showView();
}

function changeValue()
{
    if (inRange(inputValue, pillar.min, pillar.max))
        numbers[selectedPillar-1] = inputValue;
    else
        throwValueError();

    showView();
}

function throwValueError()
{
    alert("Value is out of range. Only values in range " + pillar.min + " to " + pillar.max + " allowed");
}

function inRange(val, min, max)
{
    return ((val-min)*(val-max) <= 0);
}

/*-------------------------*
 *          VIEW           *
 *-------------------------*/

function showView() {       

    let svgInnerHtml = '';
    for (let i = 0; i < numbers.length; i++) {
        svgInnerHtml += createBar(numbers[i], i + 1);
    }
    contentDiv.innerHTML = `
        <svg id="chart" width="500" viewBox="0 0 ${viewDim.width} ${viewDim.height}">
            ${svgInnerHtml}
        </svg><br/>
        Valgt stolpe: <i>${currentPillar()}</i> 
        <br />
        Verdi:
        <input type="number" min="1" max="10" value="${inputValue}" oninput="inputValue = this.value" />
        <button onclick="addPillar()">Legg til stolpe</button>
        <button ${status} onclick="changeValue()">Endre valgt stolpe</button><br />
        <button ${status} onclick="removePillar()">Fjerne valgt stolpe</button>
        `;
}
 
function createBar(number, barNo) {

    let borderWidth;
    barNo == selectedPillar ? borderWidth = "1px" : swidth = "0px";

    const spacing = 2;
    const width = Math.max(1 ,(viewDim.width - spacing * numbers.length-1) / numbers.length-1);

    let height = number * (viewDim.height / pillar.max);

    let x = (barNo - 1) * (width + spacing);
    let y = viewDim.height - height;    
    
    let color = calcColor(1, 10, barNo);
    return `<rect id=${barNo} onclick="choosePillar(this.id)" width="${width}" height="${height}"
                        x="${x}" y="${y}" fill="${color}" stroke="black" stroke-width=${borderWidth}></rect>`;
}


