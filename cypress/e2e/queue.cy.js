import { circleClass } from "./constants";
import { addTestValueButtonClick } from "./utils";

describe('Тестирование Очереди', function () {
    beforeEach(() => {
        cy.visit("queue");
    });
    it('Если в инпуте пусто, то кнопка добавления недоступна', function () {
        cy.get('input').should('be.empty');
        cy.get('button').eq('1').should('be.disabled')
    })
    it('Правильность добавления, удаления и отрисовки элемента', function () {
        cy.clock();
        //Добавление элемента
        addTestValueButtonClick();
        cy.get(circleClass).eq(0).as('circle');
        //Правильность отрисовки
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.tick(500);
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('@circle').should('have.text', 'test');
        //Корректная отрисовка head и tail
        cy.get('@circle').prev().should('have.text', 'head');
        cy.get('@circle').nextAll().contains('tail');
        //Удаление элемента
        cy.get('button').contains('Удалить').click();
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.tick(500);
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('@circle').should('not.have.text', 'test');
    })
    it('Очистка очереди', function() {
        cy.clock();
        addTestValueButtonClick();
        cy.tick(500);
        addTestValueButtonClick();
        cy.tick(500);
        addTestValueButtonClick();
        cy.tick(500);
        cy.get('button').contains('Очистить').click();
        cy.get(circleClass).should('not.have.text', 'test');
        cy.get(circleClass).prev().should('not.have.text', 'head');
        cy.get(circleClass).nextAll().should('not.have.text', 'tail');
    })
})