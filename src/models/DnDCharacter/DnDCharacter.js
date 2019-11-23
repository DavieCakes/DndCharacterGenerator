import getInitialState from "./InitialState"
import Skill from "./Skill"
import Save from "./Save"
import Ability from "./Ability"
import ProficiencyBonus from "./ProficiencyBonus"

export default function Character(oldState = getInitialState()) {
  // validate args

  // wrap incoming data
  const wrapper = {};

  // wrap abilities
  wrapper.abilities = {};
  Object.keys(oldState.abilities).forEach(e => {
    const oldAbility = oldState.abilities[e]
    wrapper.abilities[e] = Ability({
      name: e,
      baseValue: oldAbility.baseValue,
      bonuses: oldAbility.bonuses
    });
  });

  // wrap proficiency bonus
  wrapper.proficiencyBonus = ProficiencyBonus({value: oldState.proficiencyBonus});

  // wrap skills
  wrapper.skills = {};
  Object.keys(oldState.skills).forEach(e => {
    const oldSkill = oldState.skills[e];
    wrapper.skills[e] = Skill({
      name: e,
      bonuses: oldSkill.bonuses,
      isProficient: oldSkill.isProficient,

      // These depend on previously set wrapper attributes
      derivedProficiency: wrapper.proficiencyBonus,
      derivedAbility: wrapper.abilities[oldSkill.derivedAbility]
    });
  });

  // wrap saves
  wrapper.saves = {}
  // console.log(oldState.saves)
  Object.keys(oldState.saves).forEach( e => {
    const oldSave = oldState.saves[e]
    wrapper.saves[e] = Save({
      name: e,
      bonuses: oldSave.bonuses,
      isProficient: oldSave.isProficient,

      // these depend on previously set wrapper attributes
      derivedProficiency: wrapper.proficiencyBonus,
      derivedAbility: wrapper.abilities[e] // saves and abilities share the same name
    })
  })

  // serialization function
  wrapper.serialize =  function(){
    const returnData = {};
    returnData.proficiencyBonus = this.proficiencyBonus.FinalValue;
    returnData.abilities = {};
    Object.keys(this.abilities).forEach(abilityName => {
      returnData.abilities[abilityName] = this.abilities[
        abilityName
      ].serialize();
    });
    returnData.skills = {};
    Object.keys(this.skills).forEach(skillName => {
      returnData.skills[skillName] = this.skills[skillName].serialize();
    });
    returnData.saves = {}
    Object.keys(this.saves).forEach(saveName => {
      returnData.saves[saveName] = this.saves[saveName].serialize()
    })
    return returnData;
  }

  // return mutated data
  return wrapper
}



export {
  Skill as skill,
  Ability as ability,
  ProficiencyBonus as proficiency,
  Save as save
}
