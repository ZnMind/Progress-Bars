import React from 'react';
import './App.css';

const App = () => {
  const colors = ["red", "green", "blue", "cyan", "magenta", "yellow", "black"]
  var unlocked = 2;
  var gameData = { devMode: false }

  class Color {
    constructor(
      name, 
      amount, 
      upgrade, 
      cost, 
      progress, 
      unlock
      ) {
      this.name = name;
      this.amount = amount;
      this.upgrade = upgrade;
      this.cost = cost;
      this.progress = progress;
      this.unlock = unlock;
    }

    get getAmount() {
      return this.calcAmount();
    }

    get getUpgrade() {
      return this.calcUpgrade();
    }

    get getCost() {
      return this.calcCost();
    }

    get getProgress() {
      return this.calcProgress();
    }

    calcAmount() {
      this.amount += Math.floor(this.progress / 100);
      return this.amount;
    }

    calcUpgrade() {
      this.upgrade += 1;
      return this.upgrade;
    }

    calcCost() {
      this.cost += (this.unlock / 2);
      return this.cost;
    }

    calcProgress() {
      this.progress += this.upgrade;
      return this.progress;
    }
  }

  var red = new Color("red", 0, 1, 5, 0, 10);
  var green = !gameData.devMode ? new Color("green", 0, 10, 5, 0, 10) : new Color("green", 0, 50, 5, 0, 10);
  var blue = !gameData.devMode ? new Color("blue", 0, 10, 5, 0, 10) : new Color("blue", 0, 50, 5, 0, 10);
  var cyan = !gameData.devMode ? new Color("cyan", 0, 10, 5, 0, 20) : new Color("cyan", 0, 50, 5, 0, 10);
  var magenta = !gameData.devMode ? new Color("magenta", 0, 10, 5, 0, 30) : new Color("magenta", 0, 50, 5, 0, 10);
  var yellow = !gameData.devMode ? new Color("yellow", 0, 10, 5, 0, 40) : new Color("yellow", 0, 50, 5, 0, 10);
  var black = !gameData.devMode ? new Color("black", 0, 10, 5, 0, 50) : new Color("black", 0, 50, 5, 0, 10);

  //Handles DOM manipulation for every color
  function intervalUp(name) {
    var color = eval(name);
    color.progress = color.getProgress;
    var currency = document.getElementById(`${color.name}Currency`);
    var bar = document.getElementById(`${color.name}Bar`);
    if (color.progress >= 100) {
      color.amount = color.getAmount;
      currency.innerText = color.amount;
      color.progress = color.progress % 100;
      bar.style.width = 100 + '%';
      setTimeout(reset, 20)
      if (unlocked - 1 > colors.indexOf(name)) {
        var nextColor = eval(colors[colors.indexOf(name) + 1])
        intervalUp(nextColor.name)
      }
    } else {
      bar.style.width = color.progress + '%';
    }

    function reset() {
      bar.style.width = color.progress + '%';
    }
  }

  //Handles upgrades for every object
  function upgrade(event) {
    var color = event.target.id.split('B')[0];
    var currency = document.getElementById(`${color}Currency`);
    var cost = document.getElementById(`p${color}`)
    var obj = eval(color);

    if (obj.amount >= obj.cost) {
      obj.amount -= obj.cost;
      obj.upgrade = obj.getUpgrade;
      obj.cost = obj.getCost;

      currency.innerText = `${obj.amount}`
      cost.innerText = `Cost: ${obj.cost}`
    }
    console.log(obj.upgrade)
  }

  //Unlocks next bar in array if conditions are met
  function unlockBar() {
    if (unlocked < colors.length) {
      if (eval(colors[unlocked - 1]).amount >= eval(colors[unlocked]).unlock) {
        eval(colors[unlocked - 1]).amount -= eval(colors[unlocked]).unlock;
        document.getElementById(`${eval(colors[unlocked - 1]).name}Currency`).innerText = eval(colors[unlocked - 1]).amount;
        document.getElementById(colors[unlocked]).className = "Bar";
        document.getElementById(`p${colors[unlocked]}`).style.visibility = "visible";
        document.getElementById(`${colors[unlocked]}Btn`).style.visibility = "visible";
        document.getElementById("unlockTxt").innerText = `Cost: ${eval(colors[unlocked + 1]).unlock} ${colors[unlocked]}`;
        unlocked += 1;
      }
    }
    if (unlocked === colors.length) {
      document.getElementById("unlockBtn").style.visibility = "hidden"
    }
  }

  //WIP still flashing too fast
  function redInterval() {
    document.getElementById("startBtn").style.visibility = "hidden";
    document.getElementById("unlockBtn").style.visibility = "visible";
    document.getElementById("unlockTxt").style.visibility = "visible";
    var currency = document.getElementById("redCurrency");
    var bar = document.getElementById("redBar");
    var width = 0;
    setInterval(frame, 20);

    function frame() {
      width += red.upgrade;
      if (width >= 100) {
        bar.style.width = 100 + '%';
        red.amount += 1;
        currency.innerText = red.amount;
        setTimeout(resetBar, 10);
        intervalUp("green")
      } else {
        bar.style.width = width + '%';
      }

      function resetBar() {
        width = width -= 100;
        bar.style.width = width + '%';
      }
    }
  }

  return (
    <>
      <div className='App'>
        <div className='Title'>Progress Bars</div>
        <div className='Container'>

          <div className='Currency'>
            <div className='Amount'>Red: <p className='par' id='redCurrency'>{red.amount}</p></div>
            <div className='Amount'>Green: <p className='par' id='greenCurrency'>{green.amount}</p></div>
            <div className='Amount'>Blue: <p className='par' id='blueCurrency'>{blue.amount}</p></div>
            <div className='Amount'>Cyan: <p className='par' id='cyanCurrency'>{cyan.amount}</p></div>
            <div className='Amount'>Magenta: <p className='par' id='magentaCurrency'>{magenta.amount}</p></div>
            <div className='Amount'>Yellow: <p className='par' id='yellowCurrency'>{yellow.amount}</p></div>
            <div className='Amount'>K: <p className='par' id='blackCurrency'>{black.amount}</p></div>
          </div>

          <div className='Bar-container'>
            <div className='Bar'>
              <div id='redBar'></div>
            </div>
            <div className='Bar'>
              <div id='greenBar'></div>
            </div>
            <div id='blue'>
              <div id='blueBar'></div>
            </div>
            <div id='cyan'>
              <div id='cyanBar'></div>
            </div>
            <div id='magenta'>
              <div id='magentaBar'></div>
            </div>
            <div id='yellow'>
              <div id='yellowBar'></div>
            </div>
            <div id='black'>
              <div id='blackBar'></div>
            </div>
            <div>
              <div className='Unlock'>
                <button className='btn' id="unlockBtn" onClick={unlockBar}>Unlock Bar</button>
                <div className='Unlock par' id="unlockTxt">Cost: {eval(colors[unlocked]).unlock} {colors[unlocked - 1]}</div>
              </div>
            </div>
            <div className='Column'>
              <button className='btn' id="startBtn" onClick={redInterval}>Start</button>
            </div>
          </div>

          <div className='Currency'>
            <div className='Column'>
              <button className='btn' id='redBtn' onClick={upgrade}>Upgrade</button>
              <p id="pred">Cost: {red.cost}</p>
            </div>
            <div className='Column'>
              <button className='btn' id='greenBtn' onClick={upgrade}>Upgrade</button>
              <p id="pgreen">Cost: {red.cost}</p>
            </div>
            <div className='Column'>
              <button className='btn' id='blueBtn' onClick={upgrade}>Upgrade</button>
              <p id="pblue">Cost: {red.cost}</p>
            </div>
            <div className='Column'>
              <button className='btn' id='cyanBtn' onClick={upgrade}>Upgrade</button>
              <p id="pcyan">Cost: {red.cost}</p>
            </div>
            <div className='Column'>
              <button className='btn' id='magentaBtn' onClick={upgrade}>Upgrade</button>
              <p id="pmagenta">Cost: {red.cost}</p>
            </div>
            <div className='Column'>
              <button className='btn' id='yellowBtn' onClick={upgrade}>Upgrade</button>
              <p id="pyellow">Cost: {red.cost}</p>
            </div>
            <div className='Column'>
              <button className='btn' id='blackBtn' onClick={upgrade}>Upgrade</button>
              <p id="pblack">Cost: {red.cost}</p>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default App;