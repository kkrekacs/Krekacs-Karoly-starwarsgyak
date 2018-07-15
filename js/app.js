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
  newShipDiv.className = `ship spacehip${objectIndex}`;
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

  return newShipDiv;
}

function setMainShipList(parameterArray) {
  var mainShipList = document.querySelector('.spaceship-list');
  for (var i = 0; i < parameterArray.length; i++) {
    mainShipList.appendChild(getSingleShipToDiv(parameterArray[i], i));
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
}
getData('/json/spaceships.json', successAjax);
