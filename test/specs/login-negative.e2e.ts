import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';
import AlertPage from '../pageobjects/alert.page';

describe('Login - negative scenarios', () => {
    it('should reject an email with an invalid format', async () => {
        // Arrange
        await LoginPage.openLoginForm();

        // Act
        await LoginPage.login('not-an-email', 'SuperSecretPassword!');

        // Assert
        await expect(LoginPage.emailError).toBeDisplayed();
        await expect(AlertPage.messageAlert).not.toBeDisplayed();
    });

    it('should reject a password shorter than 8 characters', async () => {
        // Arrange
        await LoginPage.openLoginForm();

        // Act
        await LoginPage.login('tomsmith@mail.com', 'short');

        // Assert
        await expect(LoginPage.passwordError).toBeDisplayed();
        await expect(AlertPage.messageAlert).not.toBeDisplayed();
    });

    it('should reject an empty form', async () => {
        // Arrange
        await LoginPage.openLoginForm();

        // Act
        await LoginPage.submitEmptyForm();

        // Assert
        await expect(LoginPage.emailError).toBeDisplayed();
        await expect(LoginPage.passwordError).toBeDisplayed();
    });

    it('should accept a password of exactly 8 characters', async () => {
        // Arrange
        await LoginPage.openLoginForm();

        // Act
        await LoginPage.login('tomsmith@mail.com', '12345678');

        // Assert
        await expect(AlertPage.messageAlert).toHaveText(
            expect.stringContaining('You are logged in!'),
            { message: 'An 8-character password should be accepted' }
        );
    });
});