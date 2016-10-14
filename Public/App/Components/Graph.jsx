//Graph component

import {default as React, Component} from 'react';
const vis = require('vis');
const keycharm = require('keycharm');

//Had to go into the source code to find this bug, and overwite the method with the bug fix. The fix was that
//keycharm was not given any arguments, even though the function depends on having an arg
//(accessing options.containerElement) so I gave it the containerElement. This seems to actually be a bug in
// keycharm. In thesource code for key charm the for assigning args is

// var container = options && options.container || window;

//However when looking at the error's stack trace in the browser the code in question looks like:

// var container = options.container || window;


vis.Network.prototype._createKeyBinds = function() {
  var me = this;
  if (this.keycharm !== undefined) {
    this.keycharm.destroy();
  }
  this.keycharm = keycharm();

  this.keycharm.reset();

  if (this.constants.keyboard.enabled && this.isActive()) {
    this.keycharm.bind("up",   this._moveUp.bind(me)   , "keydown");
    this.keycharm.bind("up",   this._yStopMoving.bind(me), "keyup");
    this.keycharm.bind("down", this._moveDown.bind(me) , "keydown");
    this.keycharm.bind("down", this._yStopMoving.bind(me), "keyup");
    this.keycharm.bind("left", this._moveLeft.bind(me) , "keydown");
    this.keycharm.bind("left", this._xStopMoving.bind(me), "keyup");
    this.keycharm.bind("right",this._moveRight.bind(me), "keydown");
    this.keycharm.bind("right",this._xStopMoving.bind(me), "keyup");
    this.keycharm.bind("=",    this._zoomIn.bind(me),    "keydown");
    this.keycharm.bind("=",    this._stopZoom.bind(me),    "keyup");
    this.keycharm.bind("num+", this._zoomIn.bind(me),    "keydown");
    this.keycharm.bind("num+", this._stopZoom.bind(me),    "keyup");
    this.keycharm.bind("num-", this._zoomOut.bind(me),   "keydown");
    this.keycharm.bind("num-", this._stopZoom.bind(me),    "keyup");
    this.keycharm.bind("-",    this._zoomOut.bind(me),   "keydown");
    this.keycharm.bind("-",    this._stopZoom.bind(me),    "keyup");
    this.keycharm.bind("[",    this._zoomIn.bind(me),    "keydown");
    this.keycharm.bind("[",    this._stopZoom.bind(me),    "keyup");
    this.keycharm.bind("]",    this._zoomOut.bind(me),   "keydown");
    this.keycharm.bind("]",    this._stopZoom.bind(me),    "keyup");
    this.keycharm.bind("pageup",this._zoomIn.bind(me),   "keydown");
    this.keycharm.bind("pageup",this._stopZoom.bind(me),   "keyup");
    this.keycharm.bind("pagedown",this._zoomOut.bind(me),"keydown");
    this.keycharm.bind("pagedown",this._stopZoom.bind(me), "keyup");
  }

  if (this.constants.dataManipulation.enabled == true) {
    this.keycharm.bind("esc",this._createManipulatorBar.bind(me));
    this.keycharm.bind("delete",this._deleteSelected.bind(me));
  }
};


const uuid = require('uuid');

class Graph extends Component {
  constructor(props) {
    super(props);
    const {identifier} = this.props;
    this.updateGraph = this.updateGraph.bind(this);
    this.state = {
      hierarchicalLayout: false,
      identifier: identifier ? identifier : uuid.v4()
    };
  }

  componentDidMount() {
    this.updateGraph();
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  changeMode(event) {
    this.setState({hierarchicalLayout: !this.state.hierarchicalLayout});
    this.updateGraph();
  }

  updateGraph() {
    let container = document.getElementById(this.state.identifier);
    let options = {
      stabilize: false,
      smoothCurves: false,
      edges: {
        color: '#000000',
        width: 0.5,
        arrowScaleFactor: 0.5,
        style: 'arrow'
      }
    };

    if (this.state.hierarchicalLayout) {
      options.hierarchicalLayout = {
        enabled: true,
        direction: 'UD',
        levelSeparation: 100,
        nodeSpacing: 1
      };
    } else {
      options.hierarchicalLayout = {
        enabled: false
      };
    }

    debugger;
    new vis.Network(container, this.props.data, options);
  }

  render() {
    const {identifier, style} = this.state;
    return React.createElement('div', {onDoubleClick: this.changeMode.bind(this), id: identifier, style}, identifier);
  }
}

Graph.defaultProps = {
  data: {},
  style: {width: '1200px', height: '900px'}
};

export default Graph;