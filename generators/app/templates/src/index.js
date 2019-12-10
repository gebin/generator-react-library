let React = require( 'react');
import Hello from './components/Hello';

export default class ReactLibraryTpl extends React.Component{
    render(){
        return (<Hello name={'Vue'}></Hello>);
    }
}