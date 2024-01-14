import { addTestValueButtonClick } from "./utils";


describe('Тестирование Стэка', function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000/stack");
      });
    it('Если в инпуте пусто, то кнопка добавления недоступна', function () {
        cy.get('input').should('be.empty');
        cy.get('button').eq('1').should('be.disabled')
    })
    it('Правильность добавления и отрисовки элемента', function () {
        cy.clock();
        addTestValueButtonClick();
        cy.get('[class*=circle_circle]').as('circle');
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.tick(500);
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    })
    it('Правильность удаления элемента', function () {
        cy.clock();
        addTestValueButtonClick();
        cy.tick(500);
        cy.get('button').contains('Удалить').click();
        cy.get('[class*=circle_circle]').as('circle');
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.tick(500);
        cy.get('@circle').should('not.exist');
    })
    it('Поведение кнопки очистить', function () {
        cy.clock();
        addTestValueButtonClick();
        cy.tick(500);
        addTestValueButtonClick();
        cy.tick(500);
        addTestValueButtonClick();
        cy.tick(500);
        cy.get('[class*=circle_circle]').as('circle');
        cy.get('button').contains('Очистить').click();
        cy.get('@circle').should('not.exist');
    })
})