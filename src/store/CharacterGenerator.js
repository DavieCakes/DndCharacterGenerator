import CharacterWrapper from '../models/CharacterWrapper.js'

// declare const action types
const updateAbilityScoreBonusType = "uASB";
const updateAbilityScoreBaseValueType = "uASBV";
const updateIsProficientIn = "uIPI";
const computeAbilities = "cA";

// declare initial state
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
    sleight_of_hand: { ability: "dexterity", isProficient: false, modifier: 0 },
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
    strength: { bonuses: [], baseValue: 10, finalValue: 10, isProficient: false, modifier: 0 },
    dexterity: { bonuses: [], finalValue: 10, modifier: 0, isProficient: false, baseValue: 10 },
    intelligence: { bonuses: [], finalValue: 10, modifier: 0, isProficient: false, baseValue: 10 },
    constitution: { bonuses: [], finalValue: 10, modifier: 0, isProficient: false, baseValue: 10 },
    charisma: { bonuses: [], finalValue: 10, modifier: 0, isProficient: false, baseValue: 10 },
    wisdom: { bonuses: [], finalValue: 10, modifier: 0, isProficient: false, baseValue: 10 }
  },
  proficiencyBonus: 3,
  proficiencySelections: 0
};

// declare action creators
export const actionCreators = {
  updateAbility: ({ name, baseValue, bonuses }) => async (
    dispatch,
    getState
  ) => {
    const _baseValue = (baseValue !== undefined)? baseValue : getState().characterGenerator.abilities[name].baseValue
    const _bonuses = (bonuses !== undefined) ? bonuses : getState().characterGenerator.abilities[name].bonuses
    // dispatch({ type: 'updateAbility', name, baseValue, bonuses })
    dispatch({ type: "abilityBaseValue", name, baseValue: _baseValue });
    dispatch({ type: "abilityBonuses", name, bonuses: _bonuses });
    dispatch({ type: "abilityCalcFinalValue", name });
    dispatch({ type: "abilityCalcMod", name });

    // dispatch to recalculate derived data
    // skills
    Object.keys(getState().characterGenerator.skills)
      .filter(e => getState().characterGenerator.skills[e].ability === name)
      .forEach(element => {
        dispatch({ type: "skillCalcMod", name: element });
      });

    // saves
    Object.keys(getState().characterGenerator.saves)
      .filter(element => element === name)
      .forEach(element => {
        dispatch({ type: "saveCalcMod", name: element });
      });
      // REPLACE

      // const prevCharacterData = getState().characterGenerator.characters[args.id]
      // const newCharacterData = CharacterWrapper.updateAbility(prevCharacterData, args.data)
      // dispatch({type: 'updateCharacter', id: args.id, data: newCharacterData})
  },
  updateSkill: ({ name, bonuses, isProficient }) => (dispatch, getState) => {
    const _bonuses = bonuses || getState().characterGenerator.skills[name].bonuses
    const _isProficient = (isProficient !== undefined) ? isProficient : getState().characterGenerator.skills[name].isProficient

    dispatch({ type: "skillBonuses", name, bonuses: _bonuses });
    dispatch({ type: "skillIsProficient", name, isProficient: _isProficient });
    dispatch({ type: "skillCalcMod", name });
  },
  updateSave: ({ name, bonuses, isProficient }) => (dispatch, getState) => {
    const _bonuses = bonuses || getState().characterGenerator.saves[name].bonuses
    const _isProficient = (isProficient !== undefined) ? isProficient : getState().characterGenerator.saves[name].isProficient
    console.log('updating save')
    dispatch({ type: "saveBonuses", name, bonuses: _bonuses })
    dispatch({ type: "saveIsProficient", name, isProficient: _isProficient })
    dispatch({ type: "saveCalcFinalValue", name })
    dispatch({ type: "saveCalcMod", name })
  }
};

// declare/export reducer for this sub-store
export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case "abilityBaseValue": {
      return {
        ...state,
        abilities: {
          ...state.abilities,
          [action.name]: {
            ...state.abilities[action.name],
            baseValue: action.baseValue
          }
        }
      };
    }
    case "abilityBonuses": {
      return {
        ...state,
        abilities: {
          ...state.abilities,
          [action.name]: {
            ...state.abilities[action.name],
            bonuses: [...action.bonuses]
          }
        }
      };
    }
    case "abilityCalcFinalValue": {
      const finalValue =
        state.abilities[action.name].baseValue +
        state.abilities[action.name].bonuses.reduce((sum, e) => sum + e, 0);

      return {
        ...state,
        abilities: {
          ...state.abilities,
          [action.name]: {
            ...state.abilities[action.name],
            finalValue: finalValue
          }
        }
      };
    }
    case "abilityCalcMod": {
      const modifier =
        Math.floor(state.abilities[action.name].finalValue / 2) - 5;
      return {
        ...state,
        abilities: {
          ...state.abilities,
          [action.name]: {
            ...state.abilities[action.name],
            modifier: modifier
          }
        }
      };
    }
    case "skillBonuses": {
      return {
        ...state,
        skills: {
          ...state.skills,
          [action.name]: {
            ...state.skills[action.name],
            bonuses: [...action.bonuses]
          }
        }
      };
    }
    case "skillIsProficient": {
      const newState = { ...state };
      if (action.isProficient != state.skills[action.name].isProficient) {
        newState.proficiencySelections += (action.isProficient) ? 1 : -1
      }
      newState.skills[action.name].isProficient = action.isProficient;
      console.log(newState.proficiencySelections)
      return newState;
    }
    case "skillCalcMod": {
      const baseModifier =
        state.abilities[state.skills[action.name].ability].modifier
      const proficiencyBonus = (state.skills[action.name].isProficient) ? state.proficiencyBonus : 0
      return {
        ...state,
        skills: {
          ...state.skills,
          [action.name]: {
            ...state.skills[action.name],
            modifier: baseModifier + proficiencyBonus
          }
        }
      };
    }
    /*
        dispatch({ type: "saveBonuses", name, bonuses: _bonuses})
    dispatch({ type: "saveIsProficient", name, isProficient: _isProficient})
    dispatch({ type: "saveCalcFinalValue", name})
    dispatch({ type: "saveCalcMod", name})
    */
    case "saveBonuses": {
      return {
        ...state,
        saves: {
          ...state.saves,
          [action.name]: {
            ...state.saves[action.name],
            bonuses: [...action.bonuses]
          }
        }
      }
    }
    case "saveIsProficient": {
      return {
        ...state,
        saves: {
          ...state.saves,
          [action.name]: {
            ...state.saves[action.name],
            isProficient: action.isProficient
          }
        }
      }
    }
    case "saveCalcFinalValue": {
      const finalValue =
        state.saves[action.name].baseValue +
        state.saves[action.name].bonuses.reduce((sum, e) => sum + e, 0)
      return {
        ...state,
        saves: {
          ...state.saves,
          [action.name]: {
            ...state.saves[action.name],
            finalValue: finalValue
          }
        }
      }
    }
    case "saveCalcMod": {
      const modifier = Math.floor(state.saves[action.name].finalValue / 2) - 5
      return {
        ...state,
        saves: {
          ...state.saves,
          [action.name]: {
            ...state.saves[action.name],
            modifier: modifier
          }
        }
      }
    }
    default:
      return state;
  }
};
