import { selectionSort, bubbleSort } from './utils';

describe('Тестирование алгоритмов сортировки выбором и пузырьком' ,() => {
    it('Пустой массив',() => {
        const testArray = [];
        expect(selectionSort(testArray).selectionArray).toEqual([[]]);
        expect(selectionSort(testArray).reverseSelectionArrays).toEqual([[]]);
        expect(bubbleSort(testArray).bubbleArray).toEqual([]);
        expect(bubbleSort(testArray).reverseBubbleArray).toEqual([]);
    })
    it('Массив из одного элемента',() => {
        const testArray = [1];
        expect(selectionSort(testArray).selectionArray).toEqual([[1]]);
        expect(selectionSort(testArray).reverseSelectionArrays).toEqual([[1]]);
        expect(bubbleSort(testArray).bubbleArray).toEqual([[1]]);
        expect(bubbleSort(testArray).reverseBubbleArray).toEqual([[1]]);
    })
    it('Массив из нескольких элементов',() => {
        const testArray = [1,4,2,3];

        const selectionArray = selectionSort(testArray).selectionArray;
        const selectionArrayReverse = selectionSort(testArray).reverseSelectionArrays;
        const selectionArrayResultIndex = selectionArray.length - 1;

        const bubbleArray = bubbleSort(testArray).bubbleArray;
        const bubbleArrayReverse = bubbleSort(testArray).reverseBubbleArray;
        const bubbleArrayResultIndex = bubbleArray.length - 1;

        expect(selectionArray[selectionArrayResultIndex]).toEqual([1,2,3,4]);
        expect(selectionArrayReverse[selectionArrayResultIndex]).toEqual([4,3,2,1]);
        expect(bubbleArray[bubbleArrayResultIndex]).toEqual([1,2,3,4]);
        expect(bubbleArrayReverse[bubbleArrayResultIndex]).toEqual([4,3,2,1]);
    })
})