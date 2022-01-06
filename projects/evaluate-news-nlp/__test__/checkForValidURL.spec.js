// Import the js file to test
import { checkForValidURL } from "../src/client/js/checkForValidURL"
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the name checker functionality", () => {
    const url = "https://abcnews.go.com/International/unprecedented-mass-protests-grip-kazakhstan/story?id=82086477";
    test("Testing the checkForValidURL() function", async () => {
        const response = checkForValidURL(url);
        expect(checkForValidURL).toBeDefined();
        expect(response).toBe(true);
})
});