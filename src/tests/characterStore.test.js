import store from "../store/configureStore";
import { actionCreators } from "../store/CharacterStore";

// utility functions for reading state or internal/utility computations
function getState() {
    return store.getState().characterGenerator.characterData;
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

// tests
describe("Updates to Abilities", () => {
    function abilityTester(abilityName, attributeName, initialValue, mutatedValue) {
        store.dispatch(actionCreators.updateAbility({ name: abilityName, [attributeName]: initialValue }))
        expect(getState().abilities[abilityName][attributeName]).toEqual(initialValue)
        store.dispatch(actionCreators.updateAbility({ name: abilityName, [attributeName]: mutatedValue }))
        expect(getState().abilities[abilityName][attributeName]).toEqual(mutatedValue)
    }
    test("updates ability base value", () => abilityTester(getRandomAbilityName(), 'baseValue', 0, 20));
    test("updates ability bonuses", () => abilityTester(getRandomAbilityName(), 'bonuses', [1], [2, 3]))
});

describe("Updates to Proficiency Bonus", () => {
    function proficiencyBonusTester(initialValue, mutatedValue) {
        store.dispatch(actionCreators.updateProficiencyBonus({ proficiencyBonus: initialValue }))
        expect(getState().proficiencyBonus).toEqual(initialValue)
        store.dispatch(actionCreators.updateProficiencyBonus({ proficiencyBonus: mutatedValue }))
        expect(getState().proficiencyBonus).toEqual(mutatedValue)
    }
    test("updates proficiency bonus value", () => proficiencyBonusTester(0, 5))
})

describe("Updates to Skills", () => {
    function skillTester(skillName, attributeName, initialValue, mutatedValue) {
        store.dispatch(actionCreators.updateSkill({ name: skillName, [attributeName]: initialValue }))
        expect(getState().skills[skillName][attributeName]).toEqual(initialValue)
        store.dispatch(actionCreators.updateSkill({ name: skillName, [attributeName]: mutatedValue }))
        expect(getState().skills[skillName][attributeName]).toEqual(mutatedValue)
    }
    test("updates skill is proficient", () => skillTester(getRandomSkillName(), 'isProficient', false, true))
    test("updates skill bonuses", () => skillTester(getRandomSkillName(), 'bonuses', [1], [2, 3]))
})

describe("Updates to Saves", () => {
    function skillTester(saveName, attributeName, initialValue, mutatedValue) {
        store.dispatch(actionCreators.updateSave({ name: saveName, [attributeName]: initialValue }))
        expect(getState().saves[saveName][attributeName]).toEqual(initialValue)
        store.dispatch(actionCreators.updateSave({ name: saveName, [attributeName]: mutatedValue }))
        expect(getState().saves[saveName][attributeName]).toEqual(mutatedValue)
    }
    test("updates save is proficient", () => skillTester(getRandomAbilityName(), 'isProficient', false, true))
    test("updates save bonuses", () => skillTester(getRandomAbilityName(), 'bonuses', [1], [2, 3]))
})
