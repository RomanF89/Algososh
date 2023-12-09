export const reverseArr = (arr: string[][]) => {
    let arr1 = [...arr];
    for (let i = 0; i < Math.floor((arr1.length + 1) / 2); i++) {
      let temp = arr1[i]
      arr1[i] = arr1[arr1.length - (i + 1)]
      arr1[arr1.length - (i + 1)] = temp;
    }
    return arr1;
  }