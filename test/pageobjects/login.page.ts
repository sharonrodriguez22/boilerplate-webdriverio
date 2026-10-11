import allureReporter from '@wdio/allure-reporter';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {
    /**
     * define selectors using getter methods
     */
    public get loginBtn () {
        return $('~Login');
    }

    public get inputUsername () {
        return $('~input-email');
    }

    public get inputPassword () {
        return $('~input-password');
    }

    public get btnSubmit () {
        return $('~button-LOGIN');
    }

    public get emailError () {
        return $('//android.widget.TextView[@text="Please enter a valid email address"]');
    }

    public get passwordError () {
        return $('//android.widget.TextView[@text="Please enter at least 8 characters"]');
    }

    /**
     * Opens the login form from the app's bottom navigation.
     */
    public async openLoginForm () {
        await allureReporter.step('Open the login form', async () => {
            await this.loginBtn.click();
        });
    }

    /**
     * Submits the form without filling any field.
    */
    public async submitEmptyForm () {
        await allureReporter.step('Submit the form with no credentials', async () => {
            await this.btnSubmit.click();
        });
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await allureReporter.step(`Submit credentials for "${username}"`, async () => {
            await this.inputUsername.setValue(username);
            await this.inputPassword.setValue(password);
            await this.btnSubmit.click();
        });
    }
}

export default new LoginPage();