import React, { Component } from 'react';
import { Label, Modal, Button, ButtonToolbar, ButtonGroup, Glyphicon, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import Counter from './Counter';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      rnumber : 0,
      topnumber : 100,
      botnumber : 0,
      timespeed: 20,
      history : [],
      showSetting : false,
      isAcak : false,
      buttonLabel : "Mulai Acak"
    }
    this.audio = new Audio('./spin1.mp3');
  }

  componentDidUpdate(){
    if(this.state.isAcak){
      setTimeout(() => {
        this.randomize();
      }, this.state.timespeed);
    }
  }

  randomize = () => {
    if(this.state.history.length<=(this.state.topnumber-this.state.botnumber-1)){
      var result = (1 + this.state.botnumber) + (Math.floor(Math.random() * (this.state.topnumber-this.state.botnumber)));
      while(this.state.history.indexOf(result)!==-1){
        result = (1 + this.state.botnumber) + (Math.floor(Math.random() * (this.state.topnumber-this.state.botnumber)));
      }
      this.state.rnumber = result;
      this.setState(this.state);
      if(!this.state.isAcak){
        this.state.history.push(this.state.rnumber);
      }
    }
  }

  openSetting = () => {
    this.setState({showSetting: true});
  }

  closeSetting = () => {
    this.setState({showSetting: false});
  }

  clearHistory = () => {
    this.setState({history : [], rnumber : 0});
  }

  onTopChange = (e) => {
    this.setState({topnumber: parseInt(e.target.value)});
  }

  onBotChange = (e) => {
    this.setState({botnumber: parseInt(e.target.value)});
  }

  onTimespeedChange = (e) => {
    this.setState({timespeed: parseInt(e.target.value)});
  }

  onRandomize = () => {
    this.state.isAcak = !this.state.isAcak;
    if(this.state.isAcak){
      this.randomize();
      document.getElementById("audioSpin").play();
      this.state.buttonLabel = "Berhenti";
    }else{
      this.state.buttonLabel = "Mulai Acak";
    }
  }

  render() {
    return (
      <div className="App">

        <audio id="audioSpin">
          <source src="./spin1.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <Modal show={this.state.showSetting} onHide={this.closeSetting}>
          <Modal.Header closeButton>
            <Modal.Title>Pengaturan</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FieldGroup
                id="formControlsTop"
                type="text"
                label="Angka Tertinggi"
                placeholder="Masukkan angka tertinggi"
                value={this.state.topnumber}
                onChange={this.onTopChange}
              />
              <FieldGroup
                id="formControlsBottom"
                type="text"
                label="Angka Terendah"
                placeholder="Masukkan angka terendah"
                value={this.state.botnumber}
                onChange={this.onBotChange}
              />
              <FieldGroup
                id="formControlsTimes"
                type="text"
                label="Kecepatan Waktu"
                placeholder="Masukkan waktu perubahan angka."
                value={this.state.timespeed}
                onChange={this.onTimespeedChange}
                help="Semakin kecil angka, semakin cepat perubahannya."
              />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeSetting}>Close</Button>
          </Modal.Footer>

        </Modal>

        <div className="header">
          <h1>DOORPRIZE</h1>
        </div>
        <div className="button_container">
          <ButtonGroup>
            <Button onClick={this.onRandomize.bind(this)}>{this.state.buttonLabel}</Button>
            <Button onClick={this.clearHistory}><Glyphicon glyph="floppy-remove" /></Button>
            <Button onClick={this.openSetting}><Glyphicon glyph="cog" /></Button>
          </ButtonGroup>
        </div>
        <div className="container">
          <div onClick={this.randomize.bind(this)} className="random_number">
            <p>{this.state.rnumber}</p>
          </div>
          <div className="history">
            {
              this.state.history.map(function(number,index){
                return(
                  <Label key={number} className="labelf" bsStyle="primary">{number}</Label>
                );
              }.bind(this))
            }

          </div>
        </div>
        <div className="footer">
          by <a href="https://www.instagram.com/fauzanriff/">@fauzanriff</a>
        </div>
      </div>
    );
  }
}
