import Character from '../models/DnDCharacter/DnDCharacter'

describe('skill wrapper function', () => {
    /**
     * args = {abilityName: '', baseValue}
     * dispatch({ type: 'updateCharacter', id: args.id, newState: CharacterWrapper(oldState, {args} )})
     */
    test('wrapper functions work with no input by setting default values', () => {
      const _character = Character()
    })

})

describe('serialization', () => {
  test('serialized output can be used as Character factory input', ()=>
    {
      const c1 = Character()
      const c2 = Character(c1.serialize())
    }
  )
})

describe("Mutating ability should cascade mutations" , () => {
	test("Update ability base value updates skill values", () => {
		const character = Character()
		character.abilities.strength.BaseValue = 10
		expect(character.skills.athletics.FinalValue).toEqual(10)
		character.abilities.strength.BaseValue = 15
		expect(character.skills.athletics.FinalValue).toEqual(15)
	})
})