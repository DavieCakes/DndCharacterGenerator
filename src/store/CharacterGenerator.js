import Character from "../models/DNDCharacter"

// declare const action types
const updateCharacter = "updatecharacter"

// declare initial state
const initialState = {
  characterData: Character().serialize()
}

// declare/export action creators
export const actionCreators = {
  updateAbility: ({ name, baseValue, bonuses }) => (dispatch) => {
    dispatch({ type: updateCharacter, toUpdate: "ability", name: name, baseValue: baseValue, bonuses: bonuses })
  },
  updateSkill: ({ name, bonuses, isProficient }) => (dispatch, getState) => {
    throw "not implemented"
  },
  updateSave: ({ name, bonuses, isProficient }) => (dispatch, getState) => {
    throw "not implemented"
  }
};

// declare/export reducer for this sub-store
export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case updateCharacter:
      const model = Character(state.characterData)
      switch (action.toUpdate) {
        case "ability":
          if (action.bonuses) model.abilities[action.name].Bonuses = action.bonuses
          if (action.baseValue) model.abilities[action.name].BaseValue = action.baseValue
          break
        case "proficiencyBonus":
          if (action.proficiencyBonus) model.proficiencyBonus = action.proficiencyBonus
          break
        case "skill":
          if (action.bonuses) model.skills[action.name].Bonuses = action.bonuses
          if (action.isProficient) model.skills[action.name].isProficient = action.isProficient
          break
        case "save":
          if (action.bonuses) model.save[action.name].Bonuses = action.bonuses
          if (action.isProficient) model.save[action.name].isProficient = action.isProficient
          break
      }
      return { ...state, characterData: model.serialize() }
    default:
      return state;
  }
};
