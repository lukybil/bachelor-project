describe('bachelor-project', () => {
  beforeEach(() => cy.visit('/'));

  // it('should load maze generation wasm module', () => {
  //   for (let i = 0; i < 10; i++) {
  //     cy.wait(4000);
  //     cy.reload();
  //   }
  // });

  it('should convert json to csv', () => {
    cy.visit('/leader-boards');
    for (let i = 0; i < 10; i++) {
      cy.wait(1000);
      cy.get('#convert-button').click();
      cy.get('#loaded-indicator', { timeout: 20_000 }).should('be.visible');
      cy.reload();
    }
  });

  // it('should generate maze', () => {
  //   cy.visit('/play');

  //   for (let i = 0; i < 10; i++) {
  //     cy.get('#game-grid').should('not.exist');

  //     cy.get('#game-mode-select').click();

  //     cy.get('li[value="veryHard"]').click();

  //     // cy.window().its('performance').invoke('mark', 'generateMazeStart');

  //     // eslint-disable-next-line cypress/no-unnecessary-waiting
  //     cy.wait(2000)
  //       .window()
  //       .then((win) => {
  //         win.performance.mark('generateMazeStart');
  //       });

  //     cy.get('#play-button').click();

  //     cy.get('#game-grid', { timeout: 10000 })
  //       .should('be.visible')
  //       .then(() => {
  //         // cy.window().its('performance').invoke('measure', 'generateMazeStart');
  //         cy.window().then((win) => {
  //           const result = win.performance.measure('generateMaze', 'generateMazeStart');
  //           console.log({ result });
  //           cy.log('generate maze time', `${result.duration}ms`);
  //         });
  //       });

  //     for (let j = 0; j < 10; j++) {
  //       cy.get('#cancel-button').click();

  //       cy.get('#play-button').click();

  //       cy.get('#game-grid').should('be.visible');
  //     }

  //     cy.reload();
  //   }
  // });

  // it('should resize image', () => {
  //   for (let i = 0; i < 10; i++) {
  //     cy.get('#user-profile').click();

  //     cy.get('#profile-details-image').click();

  //     for (let i = 0; i < 11; i++) {
  //       cy.get<HTMLInputElement>('#profile-image-input').selectFile('C:/Users/lukyb/OneDrive/Obrázky/mountain.jpg', {
  //         force: true,
  //       });

  //       cy.wait(200);

  //       cy.get('#crop-button').click();

  //       cy.get('#close-dialog-button').click();

  //       cy.get('#profile-details-image').click();
  //     }

  //     cy.reload();
  //   }
  // });
});
