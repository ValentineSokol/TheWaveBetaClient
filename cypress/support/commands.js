import 'cypress-file-upload';
import '@4tw/cypress-drag-drop';

const compareSnapshotCommand = require('cypress-image-diff-js/dist/command')
compareSnapshotCommand();

Cypress.Commands.add('getByTestId', (testId) => cy.get(`[data-testid="${testId}"]`))
Cypress.Commands.add('login', (
    username = 'Valentine',
    password = '123'
) => {
    cy.request('POST', '/auth/local', { username, password })
        .then((res) => {
            const cookies = res.headers['set-cookie']
            cookies.forEach(cookie => {
                const firstPart = cookie.split(';')[0]
                const separator = firstPart.indexOf('=')
                const name = firstPart.substring(0, separator)
                const value = firstPart.substring(separator + 1)
                console.debug('cookie', name, value)
                cy.setCookie(name, value);
            })
        })
    });