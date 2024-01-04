export const selectionSort = (array: number[]) => {
  const arrays = [];
  const reverseArrays = [];
  let newArr = [...array];

  arrays.push([...newArr]);
  reverseArrays.push([...newArr])
  for (let i = 0; i < newArr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < newArr.length; j++) {
      if (newArr[j] < newArr[min]) {
        min = j;
      }
    }
    let dummy = newArr[i];
    newArr[i] = newArr[min];
    newArr[min] = dummy;
    arrays.push([...newArr]);
    reverseArrays.push([...newArr].reverse());
  }
  return {
    selectionArray: arrays,
    reverseSelectionArrays: reverseArrays
  }
}

export const bubbleSort = (arr: number[]) => {
  const arrays = [];
  const reverseArray = [];
  let newArr = [...arr];
  for (let j = newArr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (newArr[i] > newArr[i + 1]) {
        let temp = newArr[i];
        newArr[i] = newArr[i + 1];
        newArr[i + 1] = temp;
        arrays.push([...newArr]);
        reverseArray.push([...newArr].reverse());
      }
    }
  }
  return {
    bubbleArray: arrays,
    reverseBubbleArray: reverseArray
  }

}