function formatYears(value){return `${value.toFixed(1)} ${value===1?"year":"years"}`}
function roundHalf(value){return Math.ceil(value*2)/2}

const paybackCost=document.getElementById("paybackCost");
const paybackSavings=document.getElementById("paybackSavings");
const paybackExport=document.getElementById("paybackExport");
const paybackBtn=document.getElementById("paybackBtn");
const paybackResult=document.getElementById("paybackResult");

function calculatePayback(){
  const cost=Number(paybackCost.value);
  const savings=Number(paybackSavings.value);
  const exportIncome=Number(paybackExport.value);
  const annualBenefit=savings+exportIncome;
  if(!Number.isFinite(cost)||cost<=0){paybackResult.textContent="Enter a valid system cost";return}
  if(!Number.isFinite(annualBenefit)||annualBenefit<=0){paybackResult.textContent="Enter annual savings";return}
  paybackResult.textContent=formatYears(cost/annualBenefit);
}
paybackBtn.addEventListener("click",calculatePayback);

const annualUse=document.getElementById("annualUse");
const panelWattage=document.getElementById("panelWattage");
const solarYield=document.getElementById("solarYield");
const panelBtn=document.getElementById("panelBtn");
const panelResult=document.getElementById("panelResult");
const panelSize=document.getElementById("panelSize");

function calculatePanels(){
  const yearlyUse=Number(annualUse.value);
  const panelWatts=Number(panelWattage.value);
  const yieldPerKwp=Number(solarYield.value);
  if(!Number.isFinite(yearlyUse)||yearlyUse<=0||!Number.isFinite(panelWatts)||panelWatts<=0||!Number.isFinite(yieldPerKwp)||yieldPerKwp<=0){
    panelResult.textContent="Check your values";panelSize.textContent="";return
  }
  const productionPerPanel=(panelWatts/1000)*yieldPerKwp;
  const panelsNeeded=Math.ceil(yearlyUse/productionPerPanel);
  const sizeKwp=(panelsNeeded*panelWatts/1000).toFixed(2);
  panelResult.textContent=`${panelsNeeded} ${panelsNeeded===1?"panel":"panels"}`;
  panelSize.textContent=`Approx. ${sizeKwp} kWp`;
}
panelBtn.addEventListener("click",calculatePanels);

const dailyUse=document.getElementById("dailyUse");
const nightShare=document.getElementById("nightShare");
const usableCapacity=document.getElementById("usableCapacity");
const batteryBtn=document.getElementById("batteryBtn");
const batteryResult=document.getElementById("batteryResult");
const batteryRange=document.getElementById("batteryRange");

function calculateBattery(){
  const daily=Number(dailyUse.value);
  const eveningShare=Number(nightShare.value);
  const usable=Number(usableCapacity.value);
  if(!Number.isFinite(daily)||daily<=0||!Number.isFinite(eveningShare)||eveningShare<=0||!Number.isFinite(usable)||usable<=0){
    batteryResult.textContent="Check your values";batteryRange.textContent="";return
  }
  const eveningDemand=daily*eveningShare;
  const requiredBattery=eveningDemand/usable;
  const recommended=roundHalf(requiredBattery);
  const lower=roundHalf(recommended*.8);
  const upper=roundHalf(recommended*1.2);
  batteryResult.textContent=`${recommended.toFixed(1)} kWh`;
  batteryRange.textContent=`Suggested range: ${lower.toFixed(1)}–${upper.toFixed(1)} kWh`;
}
batteryBtn.addEventListener("click",calculateBattery);

calculatePayback();
calculatePanels();
calculateBattery();
