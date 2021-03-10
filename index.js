window.setInterval(NextImg, 5000);

function NextImg() {
  const img = document.getElementById("img");
  const style = window.getComputedStyle(img, false);
  const backgroundImg = style.backgroundImage;
  const imgNumber = getImageNumber(backgroundImg);
  const nextImg = imgNumber + 1;

  if (nextImg < 5) {
    img.style.backgroundImage = `url(img/${nextImg}.jpg)`;
  }
  else {
    img.style.backgroundImage = `url(img/0.jpg)`
  }
  changeControlPosition(nextImg);
}

function getImageNumber(url) {
  const imgPosition = url.search('[0-9].jpg') || url.search('[0-9].png');
  const imgNumberString = url.charAt(imgPosition);
  const imgNumber = parseInt(imgNumberString, 10);
  return imgNumber;
}

function changeControlPosition(position) {
  const controlPositions = document.getElementById('control-positions');
  const controlChildrenList = controlPositions.querySelectorAll("*");

  const currentControlPosition = controlChildrenList[position] || controlChildrenList[0];
  currentControlPosition.classList.add('current');

  if (position >= 5) {
    const previousControlPosition = controlChildrenList[4];
    previousControlPosition.classList.remove('current');
  } else {
    const previousControlPosition = controlChildrenList[position - 1];
    previousControlPosition.classList.remove('current');
  }

}