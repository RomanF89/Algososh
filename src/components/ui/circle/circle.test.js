import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe( 'Компонент Circle рендерится без ошибок' ,() => {
    it('Отрисовка без Буквы',() => {
        const circle = 
        renderer.create(<Circle/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Отрисовка с буквами',() => {
        const circle = 
        renderer.create(<Circle letter='Hello'/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Отрисовка с head',() => {
        const circle = 
        renderer.create(<Circle head={'head'}/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Отрисовка с react-элементом в head',() => {
        const circle = 
        renderer.create(<Circle head={<Circle/>}/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Отрисовка с tail',() => {
        const circle = 
        renderer.create(<Circle tail={'tail'}/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Отрисовка с react-элементом в tail',() => {
        const circle = 
        renderer.create(<Circle tail={<Circle/>}/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Отрисовка с index',() => {
        const circle = 
        renderer.create(<Circle index={1}/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Отрисовка с пропом isSmall === true',() => {
        const circle = 
        renderer.create(<Circle isSmall={true}/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Отрисовка в состоянии Default',() => {
        const circle = 
        renderer.create(<Circle state={ElementStates.Default}/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Отрисовка в состоянии Changed',() => {
        const circle = 
        renderer.create(<Circle state={ElementStates.Changing}/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Отрисовка в состоянии Modifed',() => {
        const circle = 
        renderer.create(<Circle state={ElementStates.Modified}/>)
        .toJSON();
        expect(circle).toMatchSnapshot();
    })
})