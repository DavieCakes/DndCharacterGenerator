import CharacterWrapper from '../models/CharacterWrapper'
const initialState = {
    characters: [],
    abilities: {
      strength: { bonuses: [], baseValue: 10, finalValue: 10, modifier: 0 },
      dexterity: { bonuses: [], finalValue: 10, modifier: 0, baseValue: 10 },
      intelligence: { bonuses: [], finalValue: 10, modifier: 0, baseValue: 10 },
      constitution: { bonuses: [], finalValue: 10, modifier: 0, baseValue: 10 },
      charisma: { bonuses: [], finalValue: 10, modifier: 0, baseValue: 10 },
      wisdom: { bonuses: [], finalValue: 10, modifier: 0, baseValue: 10 }
    },
    skills: {
      athletics: { ability: "strength", isProficient: false, modifier: 0 },
      acrobatics: { ability: "dexterity", isProficient: false, modifier: 0 },
      sleight_of_hand: {
        ability: "dexterity",
        isProficient: false,
        modifier: 0
      },
      stealth: { ability: "dexterity", isProficient: false, modifier: 0 },
      arcana: { ability: "intelligence", isProficient: false, modifier: 0 },
      history: { ability: "intelligence", isProficient: false, modifier: 0 },
      investigation: {
        ability: "intelligence",
        isProficient: false,
        modifier: 0
      },
      nature: { ability: "intelligence", isProficient: false, modifier: 0 },
      religion: { ability: "intelligence", isProficient: false, modifier: 0 },
      animal_handling: { ability: "wisdom", isProficient: false, modifier: 0 },
      insight: { ability: "wisdom", isProficient: false, modifier: 0 },
      medicine: { ability: "wisdom", isProficient: false, modifier: 0 },
      perception: { ability: "wisdom", isProficient: false, modifier: 0 },
      survival: { ability: "wisdom", isProficient: false, modifier: 0 },
      deception: { ability: "charisma", isProficient: false, modifier: 0 },
      intimidation: { ability: "charisma", isProficient: false, modifier: 0 },
      performance: { ability: "charisma", isProficient: false, modifier: 0 },
      persuasion: { ability: "charisma", isProficient: false, modifier: 0 }
    },
    saves: {
      strength: {
        bonuses: [],
        baseValue: 10,
        finalValue: 10,
        isProficient: false,
        modifier: 0
      },
      dexterity: {
        bonuses: [],
        finalValue: 10,
        modifier: 0,
        isProficient: false,
        baseValue: 10
      },
      intelligence: {
        bonuses: [],
        finalValue: 10,
        modifier: 0,
        isProficient: false,
        baseValue: 10
      },
      constitution: {
        bonuses: [],
        finalValue: 10,
        modifier: 0,
        isProficient: false,
        baseValue: 10
      },
      charisma: {
        bonuses: [],
        finalValue: 10,
        modifier: 0,
        isProficient: false,
        baseValue: 10
      },
      wisdom: {
        bonuses: [],
        finalValue: 10,
        modifier: 0,
        isProficient: false,
        baseValue: 10
      }
    },
    proficiencyBonus: 3,
    proficiencySelections: 0
  };
describe('interactions', () => {
    /**
     * args = {abilityName: '', baseValue}
     * dispatch({ type: 'updateCharacter', id: args.id, newState: CharacterWrapper(oldState, {args} )})
     */
    const character = CharacterWrapper(initialState)
    test('test', () => {
        console.log(character.abilities.strength)
    })
})