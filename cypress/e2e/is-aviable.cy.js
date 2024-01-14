describe('Приложение работает', function() {
    it('Приложение работает по адресу localhost:3000', function() {
      cy.visit('http://localhost:3000');
    });
  }); 