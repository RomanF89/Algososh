export const addTestValueButtonClick = () => {
    cy.get('input').type('test');
    cy.get('button').contains('Добавить').click();
}