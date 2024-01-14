const reverseArrChanged = ['4','3','2','1'];
const reverseArrOnChange = ['4', '2', '3', '1'];

describe('Компонент строка', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion');
    });
    it('Если в инпуте пусто, то кнопка добавления недоступна', function() {
      cy.get('input').should('be.empty');
      cy.get('button').should('be.disabled');
    });
    it('Корректный разворот строки и анимация', function() {
        cy.clock();
        cy.get('input').type('1234');
        cy.get('button').contains('Развернуть').click();
        //Проверка корректной отрисовки css
        cy.tick(500);
        cy.get('li').contains('1').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('li').contains('4').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.tick(500);
        cy.get('li').contains('1').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.get('li').contains('4').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.tick(500);
        cy.get('li').contains('1').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        cy.get('li').contains('4').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        cy.tick(500);
        //Проверка корректного разворота строки во время отрисовки
        cy.get('li').each((circle, index, list) => {
            cy.get(circle).should('contain', reverseArrOnChange[index]);
        })
        cy.get('li').contains('2').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.get('li').contains('3').should('have.css', 'border', '4px solid rgb(210, 82, 225)');  
        cy.tick(500);
        cy.get('li').contains('2').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        cy.get('li').contains('3').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        //Проверка корректного разворота строки
        cy.get('li').each((circle, index, list) => {
            cy.get(circle).should('contain', reverseArrChanged[index]);
        })
      });
  }); 