describe('bachelor-project', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.visit('/play');

    cy.get('#game-grid').should('not.exist');

    cy.get('#game-mode-select').click();

    cy.get('li[value="veryHard"]').click();

    // cy.window().its('performance').invoke('mark', 'generateMazeStart');

    cy.wait(2000)
      .window()
      .then((win) => {
        win.performance.mark('generateMazeStart');
      });

    cy.get('#play-button').click();

    cy.get('#game-grid')
      .should('be.visible')
      .then(() => {
        // cy.window().its('performance').invoke('measure', 'generateMazeStart');
        cy.window().then((win) => {
          const result = win.performance.measure(
            'generateMaze',
            'generateMazeStart'
          );
          console.log({ result });
          cy.log('generate maze time', `${result.duration}ms`);
        });
      });
  });
});
