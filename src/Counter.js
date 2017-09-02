import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Modal, Button, ButtonToolbar, ButtonGroup, Glyphicon, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class Counter extends Component{
  constructor(){
    super();
    this.state={
      isAcak: false
    }
  }

  static propTypes= {
    onRandomize: PropTypes.func.isRequired,
    clearHistory: PropTypes.func.isRequired,
    openSetting: PropTypes.func.isRequired,
    randomize: PropTypes.func.isRequired,
    rnumber: PropTypes.number.isRequired
  }

  componentWillMount(){
    console.log("boom");
  };

  componentDidMount(){
    console.log("testing");
    if(this.state.isAcak){
      this.props.randomize();
    }
  };

  render(){
    console.log("render");
    return(
      <div>
        <div className="button_container">
          <ButtonGroup>
            <Button onClick={this.props.onRandomize.bind(this)}>Mulai Acak</Button>
            <Button onClick={this.props.clearHistory}><Glyphicon glyph="floppy-remove" /></Button>
            <Button onClick={this.props.openSetting}><Glyphicon glyph="cog" /></Button>
          </ButtonGroup>
        </div>
        <div className="container">
          <div onClick={this.props.randomize.bind(this)} className="random_number">
            <p>{this.props.rnumber}</p>
          </div>
        </div>
      </div>
    );
  }
}
