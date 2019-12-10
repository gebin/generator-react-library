let React = require("react");
let PropTypes = require('prop-types');

class Hello extends React.Component {
  render() {
    return <div> Hello {this.props.name}</div>;
  }
}

Hello.propTypes = {
    name: PropTypes.string.isRequired,
}

Hello.defaultProps = {
    name : 'React！'
}
export default Hello;
