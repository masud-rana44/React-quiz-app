function getRandomQuestions(arr, sampleSize) {
  if (sampleSize >= arr.length) {
    return arr.slice();
  }

  const shuffledArr = arr.slice();
  let currentIndex = arr.length;
  let tempValue, randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = shuffledArr[currentIndex];
    shuffledArr[currentIndex] = shuffledArr[randomIndex];
    shuffledArr[randomIndex] = tempValue;
  }

  return shuffledArr.slice(0, sampleSize);
}

export { getRandomQuestions };
