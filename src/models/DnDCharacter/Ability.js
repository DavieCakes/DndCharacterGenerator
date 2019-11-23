export default function Ability ({name = '', baseValue = 10, bonuses = []} = {}) {
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