export default function Character(oldState = getInitialState()) {
  // validate args

  // wrap incoming data
  const wrapper = {};

  // wrap abilities
  wrapper.abilities = {};
  Object.keys(oldState.abilities).forEach(e => {
    const oldAbility = oldState.abilities[e]
    wrapper.abilities[e] = ability({
      name: e,
      baseValue: oldAbility.baseValue,
      bonuses: oldAbility.bonuses
    });
  });

  // wrap proficiency bonus
  wrapper.proficiencyBonus = proficiency({value: oldState.proficiencyBonus});

  // wrap skills
  wrapper.skills = {};
  Object.keys(oldState.skills).forEach(e => {
    const oldSkill = oldState.skills[e];
    wrapper.skills[e] = skill({
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
    wrapper.saves[e] = save({
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

const ability = ({name = '', baseValue = 10, bonuses = []} = {}) => {
  if ( typeof name !== 'string' ){
  }
  return {
    get BaseValue() {
      return baseValue;
    },
    set BaseValue(value) {
      baseValue = value;
    },
    get FinalValue() {
      return this.BaseValue + this.Bonuses.reduce((sum, e) => sum + e, 0);
    },
    get Modifier() {
      return Math.floor(this.FinalValue / 2) - 5;
    },
    get Bonuses() {
        return bonuses
    },
    set Bonuses(value)
    {
      if(!Array.isArray(value)) {
        console.log("new bonuses value is not an array")
      }
      bonuses = value
    },
    get Name() {
      return name
    },
    serialize() {
      return {
        baseValue: this.BaseValue,
        bonuses: this.Bonuses,
        finalValue: this.FinalValue,
        modifier: this.Modifier
      }
    }
  }
}

function proficiency({value = 0} = {}) {
  return {
    get FinalValue() {
      return value;
    },
    set FinalValue(_value) {
      if (! typeof _value === "number") {
        console.log("prof bonus value NAN")
        return
      }
      if (_value < 0) {
        console.log('prof bonus value is negative')
        return
      }
      value = _value;
    }
  };
}

const skill = ({
  name = '',
  bonuses = [],
  isProficient = false,
  derivedAbility = ability(),
  derivedProficiency = proficiency()
} = {}) => {
  return {
    set Bonuses(value) {
      bonuses = value;
    },
    get Bonuses() {
      return bonuses;
    },
    set IsProficient(value) {
      isProficient = value;
    },
    get IsProficient() {
      return isProficient;
    },

    // immutable
    get Name() {
      return name;
    },

    // derived data
    get FinalValue() {
      const profBonus = (this.IsProficient)? derivedProficiency.FinalValue : 0
      return derivedAbility.FinalValue +
        this.Bonuses.reduce((sum, e) => e + sum, 0) + profBonus
    },
    get Modifer() {
      return Math.floor(this.FinalValue / 2) - 5;
    },
    serialize() {
      return {
        bonuses: this.Bonuses,
        isProficient: this.IsProficient,
        finalValue: this.FinalValue,
        modifier: this.Modifer,
        name: this.Name,
        derivedAbility: derivedAbility.Name
      };
    }
  };
}

const save = ({
  name = '',
  bonuses = [],
  isProficient = false,
  derivedAbility = ability(),
  derivedProficiency = proficiency()
} = {}) => {
  return {
    set Bonuses(value) {
      bonuses = value;
    },
    get Bonuses() {
      return bonuses;
    },
    set IsProficient(value) {
      isProficient = value;
    },
    get IsProficient() {
      return isProficient;
    },

    // immutable
    get Name() {
      return name;
    },

    // derived data
    get FinalValue() {
      const profBonus = (this.IsProficient)? derivedProficiency.FinalValue : 0
      return derivedAbility.FinalValue +
        this.Bonuses.reduce((sum, e) => e + sum, 0) + profBonus
    },
    get Modifer() {
      return Math.floor(this.FinalValue / 2) - 5;
    },
    serialize() {
      return {
        bonuses: this.Bonuses,
        isProficient: this.IsProficient,
        finalValue: this.FinalValue,
        modifier: this.Modifer,
        name: this.Name,
        derivedAbility: derivedAbility.Name
      };
    }
  };
}

export {
  skill,
  ability,
  proficiency,
  save
}

function getInitialState() {
  const initialState = {
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

  return initialState;
}
