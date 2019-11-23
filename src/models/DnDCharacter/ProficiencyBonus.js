export default function ProficiencyBonus({value = 0} = {}) {
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