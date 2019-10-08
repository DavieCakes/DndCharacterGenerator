import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import action creators for reference in this component
import { actionCreators } from "../store/CharacterGenerator";
import * as DnDCharacter from "../models/DnDCharacter";

import { List, Container, Card, Button } from "semantic-ui-react";

import Generators from '../utils/Generators'

class StoreTester extends Component {
  constructor(props) {
    super(props);
    this.character = DnDCharacter.makeCharacter();
  }

  componentDidMount() {
    Generators.generateDnDCharacter()
  }

  render() {
    return (
      <Container>
        {/* {this.generateFromObject()} */}
        {/* <CharacterContainer
          abilities={this.character.getAbilities()}
          skills={this.character.getSkills()}
          proficiencyBonus={this.character.ProficiencyBonus}
        /> */}
        <Button onClick={Generators.generateDnDCharacter}>Generate</Button>
        <CharacterContainer
          abilities={this.props.abilities}
          skills={this.props.skills}
          proficiencyBonus={this.props.proficiencyBonus}
        />
      </Container>
    );
  }
}

class CharacterContainer extends React.PureComponent {
  render() {
    console.log(this.props)
    return (
      <Container>
        <AbilitiesContainer abilities={this.props.abilities} />
        <SkillsContainer skills={this.props.skills} />
        <ProficiencyBonusContainer
          proficiencyBonus={this.props.proficiencyBonus}
        />
      </Container>
    );
  }
}

class ProficiencyBonusContainer extends React.PureComponent {
  render() {
    return (
      <div>
        <Card>
          <Card.Header
            as={"h3"}
            style={{
              background: "black",
              color: "white"
            }}
          >
            Proficiency Bonus
          </Card.Header>
          <Card.Content>{this.props.proficiencyBonus}</Card.Content>
        </Card>
      </div>
    );
  }
}

class SkillsContainer extends React.PureComponent {
  render() {
    return (
      <Card>
        <Card.Header
          as={"h3"}
          style={{
            background: "black",
            color: "white"
          }}
        >
          Skills
        </Card.Header>
        <Card.Content>
          {Object.keys(this.props.skills).map(e => {
            const skill = this.props.skills[e]
            return (
              <Skill
                key={e}
                name={e}
                modifer={skill.modifier}
                isProficient={e.isProficient}
              />
            );
          })}
        </Card.Content>
      </Card>
    );
  }
}

class Skill extends React.PureComponent {
  render() {
    return (
      <div>
        <List.Item>
          {this.props.name} | {this.props.modifer}{" "}
        </List.Item>
      </div>
    );
  }
}

class AbilitiesContainer extends React.PureComponent {
  render() {
    return (
      <Card>
        <Card.Header
          as={"h3"}
          style={{
            background: "black",
            color: "white"
          }}
        >
          Abilities:
        </Card.Header>
        <Card.Content>
          <List>
            {Object.keys(this.props.abilities).map(e => {
              const ability = this.props.abilities[e]
              return (

                <Ability
                key={e}
                name={e}
                finalValue={ability.finalValue}
                modifier={ability.modifier}
                />
                )
            })}
          </List>
        </Card.Content>
      </Card>
    );
  }
}

class Ability extends React.PureComponent {
  render() {
    return (
      <List.Item>
        {this.props.name} | {this.props.finalValue} | {this.props.modifier}
      </List.Item>
    );
  }
}

export default connect(
  // which part of global state does
  // component recieve as props?
  state => state.characterGenerator,

  // which action creators does
  // component receive as props?
  dispatch => bindActionCreators(actionCreators, dispatch)
)(StoreTester);
