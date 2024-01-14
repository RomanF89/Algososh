describe('Корректный переход по страницам', function() {
    beforeEach(() => {
        cy.visit('');
    });
    it('Должна открыться страница Строка', function() {
        cy.get('a[href*="recursion"]').click();
        cy.contains('Строка')
    });
    it('Должна открыться страница Фибоначчи', function() {
        cy.get('a[href*="fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи')
    });
    it('Должна открыться страница Сортировки', function() {
        cy.get('a[href*="sorting"]').click();
        cy.contains('Сортировка массива')
    });
    it('Должна открыться страница Стек', function() {
        cy.get('a[href*="stack"]').click();
        cy.contains('Стек')
    });
    it('Должна открыться страница Очередь', function() {
        cy.get('a[href*="queue"]').click();
        cy.contains('Очередь')
    });
    it('Должна открыться страница Связный список', function() {
        cy.get('a[href*="list"]').click();
        cy.contains('Связный список')
    });
  }); 