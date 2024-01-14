const circleDefaultArray = ['0', '34', '8', '1'];

describe('Тестирование Списка', function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000/list");
    });
    it('Если в инпуте пусто, то кнопка добавления недоступна', function () {
        cy.get('input').should('be.empty');
        cy.get('button').eq('1').should('be.disabled');
        cy.get('button').eq('2').should('be.disabled');
        cy.get('button').eq('5').should('be.disabled');
        cy.get('button').eq('6').should('be.disabled');
    })
    it('Отрисовка дефолтного списка', function () {
        cy.get('li').each((circle, index, list) => {
        cy.get(circle).should('contain', circleDefaultArray[index]);
        })
    })
    it('Добавление элемента в head', function () {
        cy.get('[class*=circle_circle]').eq(0).as('circleHead');
        cy.clock();
        cy.get('input').eq(0).type('test');
        cy.get('button').contains('Добавить в head').click();
        cy.tick(2000);
        cy.get('@circleHead').contains('test');
        cy.get('@circleHead').prev().should('have.text', 'head');
    })
    it('Удаление элемента из head', function () {
        cy.get('[class*=circle_circle]').eq(0).as('circleHead');
        cy.clock();
        cy.get('button').contains('Удалить из head').click();
        cy.tick(2000);
        cy.get('@circleHead').contains('34');
        cy.get('@circleHead').prev().should('have.text', 'head');
    })
    it('Добавление элемента в tail', function () {
        cy.clock();
        cy.get('input').eq(0).type('test');
        cy.get('button').contains('Добавить в tail').click();
        cy.tick(2000);
        cy.get('[class*=circle_circle]').each((circle, index, list) => {
            const length = list.length
            cy.wrap(list[length - 1]).contains('test');
            cy.wrap(list[length - 1]).next().next().should('have.text', 'tail');
        })
    })
    it('Удаление элемента из tail', function () {
        cy.clock();
        cy.get('button').contains('Удалить из tail').click();
        cy.tick(2000);
        cy.get('[class*=circle_circle]').each((circle, index, list) => {
            const length = list.length
            cy.wrap(list[length - 1]).contains('8');
            cy.wrap(list[length - 1]).next().next().should('have.text', 'tail');
        })
    })
    it('Добавление элемента по индексу', function () {
        cy.clock();
        cy.get('input').eq(0).type('test');
        cy.get('input').eq(1).type('2');
        cy.get('button').contains('Добавить по индексу').click();
        cy.tick(4000);
        cy.get('[class*=circle_circle]').eq(2).contains('test');
    })
    it('Удаление элемента по индексу', function () {
        cy.clock();
        cy.get('input').eq(1).type('2');
        cy.get('button').contains('Удалить по индексу').click();
        cy.tick(4000);
        cy.get('[class*=circle_circle]').eq(2).contains('1');
    })

})