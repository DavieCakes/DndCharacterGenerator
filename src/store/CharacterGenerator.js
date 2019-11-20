import Character from "../models/DNDCharacter"

// declare const action types
const updateCharacter = "updatecharacter"

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
    case updateCharacter:
      
      return newState
    default:
      return state;
  }
};
