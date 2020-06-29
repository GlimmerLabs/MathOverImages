import initializeStage from './mistgui.js';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id="container"> </div>
  }

  componentDidMount() {
    initializeStage("container");
  }
}

export default Container;
