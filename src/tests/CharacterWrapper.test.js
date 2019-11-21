import Character from '../models/DnDCharacter'
import {skill, ability, proficiency} from '../models/DnDCharacter'



describe('skill wrapper function', () => {
    /**
     * args = {abilityName: '', baseValue}
     * dispatch({ type: 'updateCharacter', id: args.id, newState: CharacterWrapper(oldState, {args} )})
     */
    test('wrapper functions work with no input by setting default values', () => {
      const _character = Character()
      const _skill = skill()
      const _ability = ability()
      const _proficiency = proficiency()
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