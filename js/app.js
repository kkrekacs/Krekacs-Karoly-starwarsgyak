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

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
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
}
getData('/json/spaceships.json', successAjax);
