const fibonacciArray = ['0', '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987', '1597', '2584', '4181']


describe('Тестирование последовательности Фибоначчи', function () {
    beforeEach(() => {
        cy.visit('fibonacci');
      });
    it('Если в инпуте пусто, то кнопка добавления недоступна.', function () {
        cy.get('input').should('be.empty');
        cy.get('button').should('be.disabled');
    })
    it('Числа генерируются корректно.', function () {
        cy.get('input').type('19');
        cy.get('button').contains('Рассчитать').click();
        cy.wait(1000*19);
        cy.get('li').each((circle, index, list) => {
            cy.get(circle).should('contain', fibonacciArray[index]);
        })
    })
})