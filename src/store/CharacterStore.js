import Character from "../models/DnDCharacter"
import Generators from "../utils/Generators"

// declare const action types
const updateCharacter = "updatecharacter"
const generateCharacter = "generateCharacter"

// declare initial state
const initialState = {
	characterData: Character().serialize()
}

// declare/export action creators
export const actionCreators = {
	updateAbility: ({ name, baseValue, bonuses }) => (dispatch) => {
		dispatch({ type: updateCharacter, toUpdate: "ability", name, baseValue, bonuses })
	},
	updateSkill: ({ name, bonuses, isProficient }) => (dispatch) => {
		dispatch({ type: updateCharacter, toUpdate: 'skill', name, bonuses, isProficient })
	},
	updateSave: ({ name, bonuses, isProficient }) => (dispatch) => {
		dispatch({ type: updateCharacter, toUpdate: 'save', name, bonuses, isProficient })
	},
	updateProficiencyBonus: ({ proficiencyBonus }) => dispatch => {
		dispatch({ type: updateCharacter, toUpdate: 'proficiencyBonus', proficiencyBonus })
	},
	generate: () => dispatch => {
		dispatch({ type: generateCharacter })
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
					if (action.bonuses !== undefined) model.abilities[action.name].Bonuses = action.bonuses
					if (action.baseValue !== undefined) model.abilities[action.name].BaseValue = action.baseValue
					break
				case "proficiencyBonus":
					if (action.proficiencyBonus !== undefined) model.proficiencyBonus.FinalValue = action.proficiencyBonus
					break
				case "skill":
					if (action.bonuses !== undefined) model.skills[action.name].Bonuses = action.bonuses
					if (action.isProficient !== undefined) model.skills[action.name].IsProficient = action.isProficient
					break
				case "save":
					if (action.bonuses !== undefined) model.saves[action.name].Bonuses = action.bonuses
					if (action.isProficient !== undefined) model.saves[action.name].IsProficient = action.isProficient
					break
				default:
					break
			}

			return { ...state, characterData: model.serialize() }
		case generateCharacter:
			return { ...state, characterData: Generators.generateDnDCharacter().serialize() }
		default:
			return state;
	}
};
