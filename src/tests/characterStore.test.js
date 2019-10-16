import App from "../App";
import store from "../store/configureStore";
import { actionCreators } from "../store/CharacterGenerator";

// utility functions for reading state or internal/utility computations
function getState() {
    return store.getState().characterGenerator;
}

function getRandomAbilityName() {
    const names = Object.keys(getState().abilities);
    const rand = Math.floor(Math.random() * names.length);
    return names[rand];
}

function getRandomSkillName() {
    const names = Object.keys(getState().skills);
    const rand = Math.floor(Math.random() * names.length);
    return names[rand];
}

function toModifier(value) {
    return Math.floor(value / 2) - 5;
}

// tests
describe("Updates to Abilities", () => {

    async function abilityTester(abilityName, attributeName, initialValue, mutatedValue) {
        await store.dispatch(actionCreators.updateAbility({ name: abilityName, [attributeName]: initialValue }))
        expect(getState().abilities[abilityName][attributeName]).toEqual(initialValue)

        await store.dispatch(actionCreators.updateAbility({ name: abilityName, [attributeName]: mutatedValue }))
        expect(getState().abilities[abilityName][attributeName]).toEqual(mutatedValue)
    }

    test("updates ability base value", () => abilityTester(getRandomAbilityName(), 'baseValue', 0, 20));
    test("updates ability bonuses", () => abilityTester(getRandomAbilityName(), 'bonuses', [1], [2, 3]))
});
