import {reverseArr} from './utils';

describe('Тестирование Алгоритма разворота строки', () => {
    it('C четным числом символов' ,()=> {
        const testArray = ['1','2','3','4'];
        expect(reverseArr(testArray)).toEqual(['4','3','2','1']);
    })
    it('C нечетным числом символов' ,()=> {
        const testArray = ['1','2','3','4','5'];
        expect(reverseArr(testArray)).toEqual(['5','4','3','2','1']);
    })
    it('C одним символом' ,()=> {
        const testArray = ['1'];
        expect(reverseArr(testArray)).toEqual(['1']);
    })
    it('C пустой строкой' ,()=> {
        const testArray = [''];
        expect(reverseArr(testArray)).toEqual(['']);
    })
})