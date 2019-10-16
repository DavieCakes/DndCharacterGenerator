import store from "../store/configureStore";
import { actionCreators } from "../store/CharacterGenerator";

const Generators = {
  generateDnDCharacter: () => {

    // generate ability array
    const abilityRolls = [];
    for (let i = 0; i < 6; i++) {
      let rolls = [];
      for (let j = 0; j < 4; j++) {
        rolls.push(Math.floor(Math.random() * 5) + 1);
      }
      rolls.sort();
      rolls.splice(0, 1);
      abilityRolls.push(rolls.reduce((e, sum) => e + sum, 0));
    }

    // Dispatch mutations to store
    Object.keys(store.getState().characterGenerator.abilities).forEach(
      e => {
        store.dispatch(actionCreators.updateAbility({name: e, baseValue: abilityRolls.pop(), bonuses: []}))
      }
    )

    // randomly select 5 skill proficiencies
    const skillProficiencies = new Array(18).fill(true, 0, 5).fill(false, 5, 18)

    // dispatch mutations to store
    Object.keys(store.getState().characterGenerator.skills).forEach(
        e => {
            store.dispatch(actionCreators.updateSkill({
                name: e,
                bonuses: [],
                isProficient: skillProficiencies.splice( Math.floor(Math.random() * (skillProficiencies.length-1)) ,1)[0]
            })
            )
        }
    )
    
  }
};

export default Generators;
