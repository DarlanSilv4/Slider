var timer = window.setInterval(nextImg, 5000);

const nextButton = document.getElementById('next');
nextButton.addEventListener('click', () => {
  nextImg();
  restartTime();
});

const backButton = document.getElementById('back');
backButton.addEventListener('click', () => {
  previousImg();
  restartTime();
});

const controlPositions = document.getElementById('control-positions');
controlPositions.addEventListener('click', (event) => {
  if (event.target.id != 'control-positions') {
    const controlItems = Array.from(controlPositions.querySelectorAll('*'));
    controlPosition(controlItems, event);
    restartTime();
  }
});

function nextImg() {
  const img = getImage();
  const nextImg = img.id + 1;

  if (nextImg < 5) {
    img.element.style.backgroundImage = `url(img/${nextImg}.jpg)`;
  }
  else {
    img.element.style.backgroundImage = `url(img/0.jpg)`
  }

  changeControlPosition(nextImg, nextImg - 1);
}

function previousImg() {
  const img = getImage();
  const previousImg = img.id - 1;

  if (previousImg >= 0) {
    img.element.style.backgroundImage = `url(img/${previousImg}.jpg)`;
  }
  else {
    img.element.style.backgroundImage = `url(img/4.jpg)`
  }

  changeControlPosition(previousImg, previousImg + 1);
}

function controlPosition(array, event) {
  array.forEach(element => {
    element.classList.remove('current')
  });

  const itemTarget = event.target.id;
  const itemFound = array.find(item => item.id == itemTarget);
  itemFound.classList.add('current');

  const nextImg = array.indexOf(itemFound);

  const img = getImage();
  img.element.style.backgroundImage = `url(img/${nextImg}.jpg)`;
}

function getImage() {
  const imgElement = document.getElementById("img");
  const style = window.getComputedStyle(img, false);
  const backgroundImg = style.backgroundImage;
  const imgIndex = getImageIndex(backgroundImg);

  return image = {
    element: imgElement,
    id: imgIndex
  }
}

function getImageIndex(url) {
  const imgPosition = url.search('[0-9].jpg') || url.search('[0-9].png');
  const imgNumberString = url.charAt(imgPosition);
  const imgIndex = parseInt(imgNumberString, 10);
  return imgIndex;
}

function changeControlPosition(currentPosition, previousPosition) {
  const controlPositionsElement = document.getElementById('control-positions');
  const controlChildrenList = controlPositionsElement.querySelectorAll("*");

  const lastPosition = 4;
  const firstPosition = 0;

  const controlPositions = {
    current: controlChildrenList[lastPosition],
    previous: controlChildrenList[firstPosition]
  };

  if (currentPosition >= firstPosition) {
    controlPositions.current = controlChildrenList[currentPosition] || controlChildrenList[firstPosition];
    controlPositions.previous = controlChildrenList[previousPosition]
  }

  controlPositions.current.classList.add('current');
  controlPositions.previous.classList.remove('current');
}

function restartTime() {
  clearInterval(timer);
  timer = window.setInterval(nextImg, 5000);
}