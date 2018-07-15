// ide deklaráljátok a függvényeket.
function getNumberPropertyValue(parameterItem, parameterProperty) {
  if (typeof parameterItem[parameterProperty] === 'string') {
    return parseInt(parameterItem[parameterProperty], 10);
  }
  return 0;
}

function getShipsOrderedByNumberProperty(parameterArray, parameterProperty) {
  var tempArray = parameterArray.slice();
  var endIndex = tempArray.length - 1;
  var newEndIndex;
  while (endIndex > 1) {
    newEndIndex = 0;
    for (var i = 0; i < endIndex; i++) {
      if (getNumberPropertyValue(tempArray[i], parameterProperty) >
      getNumberPropertyValue(tempArray[i + 1], parameterProperty)) {
        [tempArray[i], tempArray[i + 1]] = [tempArray[i + 1], tempArray[i]];
        newEndIndex = i;
      }
    }
    endIndex = newEndIndex;
  }

  return tempArray;
}

function doRemoveObjectsWithNullConsumables(parameterArray) {
  var tempArray = parameterArray.slice();
  var propertyKeys = Object.keys(tempArray[0]);
  var propertyIndex = propertyKeys.indexOf('consumables');
  for (var i = 0; i < tempArray.length; i++) {
    if (typeof tempArray[i][propertyKeys[propertyIndex]] === 'object') {
      tempArray.splice(i, 1);
      i--;
    }
  }

  return tempArray;
}

function setNullPropertiesToUnknown(parameterArray) {
  var tempArray = parameterArray.slice();
  var propertyKeys = Object.keys(tempArray[0]);
  for (var i = 0; i < tempArray.length; i++) {
    for (var j = 0; j < propertyKeys.length; j++) {
      if (tempArray[i][propertyKeys[j]] === null) {
        tempArray[i][propertyKeys[j]] = 'unknown';
      }
    }
  }

  return tempArray;
}

function getSingleShipToDiv(parameterObject, objectIndex) {
  var newShipDiv = document.createElement('div');
  newShipDiv.className = `ship spaceship${objectIndex}`;
  var newShipPropertiesDiv = document.createElement('div');
  newShipPropertiesDiv.className = 'properties';
  var newShipPropertyValuesDiv = document.createElement('div');
  newShipPropertyValuesDiv.className = 'values';
  var newShipImageDiv = document.createElement('div');
  newShipImageDiv.className = 'image';
  var objectKeys = Object.keys(parameterObject);
  for (var i = 0; i < objectKeys.length - 1; i++) {
    newShipPropertiesDiv.innerHTML += `${objectKeys[i]}:<br>`;
    newShipPropertyValuesDiv.innerHTML += `${parameterObject[objectKeys[i]]}<br>`;
  }
  newShipImageDiv.innerHTML +=
  `<img src='/img/${parameterObject[objectKeys[objectKeys.length - 1]]}' onerror="this.src='/img/obiwan.jpg'">`;
  newShipDiv.appendChild(newShipPropertiesDiv);
  newShipDiv.appendChild(newShipPropertyValuesDiv);
  newShipDiv.appendChild(newShipImageDiv);
  newShipDiv.addEventListener('click', getSingleShip);

  return newShipDiv;
}

function setMainShipList(parameterArray) {
  var mainShipList = document.querySelector('.spaceship-list');
  for (var i = 0; i < parameterArray.length; i++) {
    mainShipList.appendChild(getSingleShipToDiv(parameterArray[i], i));
  }
}

function getSingleShip(event) {
  var pathArray = event.path.slice();
  var output1 = document.querySelector('.searchbar');
  var output2 = document.querySelector('.statistics');
  if (pathArray[0].parentNode.className !== 'image') {
    document.querySelector('.one-spaceship').innerHTML = pathArray[0].parentNode.innerHTML;
    document.querySelector('.one-spaceship').appendChild(output2);
    document.querySelector('.one-spaceship').appendChild(output1);
  } else {
    document.querySelector('.one-spaceship').innerHTML = pathArray[0].parentNode.parentNode.innerHTML;
    document.querySelector('.one-spaceship').appendChild(output2);
    document.querySelector('.one-spaceship').appendChild(output1);
  }
}


function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function getSingleCrewShipsTotalNumber(parameterArray) {
  var totalNumber = 0;
  for (var i = 0; i < parameterArray.length; i++) {
    if (parseInt(parameterArray[i].crew, 10) === 1) {
      totalNumber++;
    }
  }

  return totalNumber;
}

function getShipWithBiggestCargo(parameterArray) {
  var biggestCargo = parseInt(parameterArray[0].cargo_capacity, 10);
  var shipName = parameterArray[0].model;
  for (var i = 1; i < parameterArray.length; i++) {
    if (parseInt(parameterArray[i].cargo_capacity, 10) > biggestCargo) {
      biggestCargo = parseInt(parameterArray[i].cargo_capacity, 10);
      shipName = parameterArray[i].model;
    }
  }

  return shipName;
}

function getTotalPassengerCount(parameterArray) {
  var totalPassengers = 0;
  for (var i = 0; i < parameterArray.length; i++) {
    if (parseInt(parameterArray[i].passengers, 10) > -1 ) {
      totalPassengers += parseInt(parameterArray[i].passengers, 10);
    }
  }

  return totalPassengers;
}

function getLongestShip(parameterArray) {
  var longestShip = parameterArray[0].lengthiness;
  var shipImage = parameterArray[0].image;
  for (var i = 1; i < parameterArray.length; i++) {
    if (parameterArray[i].lengthiness > longestShip) {
      longestShip = parameterArray[i].lengthiness;
      shipImage = parameterArray[i].image;
    }
  }

  return shipImage;
}

function getStatistics(parameterArray) {
  var statisticsDiv = document.createElement('div');
  statisticsDiv.className = 'statistics';
  var output = document.querySelector('.searchbar');
  statisticsDiv.innerHTML +=
  `<p>Egy fős legénységgel rendelkező hajók darabszáma:<br>${getSingleCrewShipsTotalNumber(parameterArray)}<br></p>`;
  statisticsDiv.innerHTML +=
  `<p>A legnagyobb cargo_capacity-vel rendelkező hajó neve:<br>${getShipWithBiggestCargo(parameterArray)}<br></p>`;
  statisticsDiv.innerHTML +=
  `<p>Az összes hajó utasainak összesített száma:<br>${getTotalPassengerCount(parameterArray)}<br></p>`;
  statisticsDiv.innerHTML +=
  `<p>A leghosszabb hajó képének a neve:<br>${getLongestShip(parameterArray)}<br></p>`;
  document.querySelector('.one-spaceship').innerHTML = '';
  document.querySelector('.one-spaceship').appendChild(statisticsDiv);
  document.querySelector('.one-spaceship').appendChild(output);
}

function getSearchData(searchingForName) {
  var divsToSearchIn = document.querySelector('.spaceship-list').children;
  var index = 0;
  var found = false;
  var output = 'A keresett hajó nem található';
  while (!found && index < divsToSearchIn.length) {
    if (divsToSearchIn[index].innerText.toLowerCase().indexOf(searchingForName.toLowerCase()) > -1) {
      found = true;
      output = divsToSearchIn[index].innerHTML;
    }
    index++;
  }

  return output;
}

function getShipbyName() {
  var searchingForName = document.querySelector('#search-text').value;
  document.querySelector('#search-text').value = '';
  var output1 = document.querySelector('.searchbar');
  var output2 = document.querySelector('.statistics');
  document.querySelector('.one-spaceship').innerHTML = getSearchData(searchingForName);
  document.querySelector('.one-spaceship').appendChild(output2);
  document.querySelector('.one-spaceship').appendChild(output1);
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  setMainShipList(
    setNullPropertiesToUnknown(
      doRemoveObjectsWithNullConsumables(
        getShipsOrderedByNumberProperty(userDatas, 'cost_in_credits')
      )
    )
  );

  getStatistics(
    setNullPropertiesToUnknown(
      doRemoveObjectsWithNullConsumables(
        getShipsOrderedByNumberProperty(userDatas, 'cost_in_credits')
      )
    )
  );

  document.querySelector('#search-button').addEventListener('click', getShipbyName);
}

getData('/json/spaceships.json', successAjax);
