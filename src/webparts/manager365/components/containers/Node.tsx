import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/Actions';
import treeCommons from '../../utility/treeCommons';

export interface INodeStateProps{
    type:string;
    id:any;
    counter:any;
    childIds:any;
    client:any;
    url:string;
    urls:string[];
    isFulfilled:false;
    isRejected:false;
}

export interface INodeDispatchProps{
    increment(id);
    createNode(payload);
    fetchData(type, nodeId, client, url);
    addChild(id, childId);
}

export class Node extends React.Component<INodeStateProps & INodeDispatchProps> {
    constructor(props){
        super(props);
        this.handleLoadClick = this.handleLoadClick.bind(this);
        this.handleIncrementClick = this.handleIncrementClick.bind(this);
    }

    public renderChild = childId => {
        const { id } = this.props;
        return (
          <li key={childId}>
            <ConnectedNode id={childId} parentId={id} client={this.props.client}/>
          </li>
        );
      }
    
    public render() {
      console.log('in render');
      console.log(this.props.url);
      console.log(this.props.urls);
      console.log(treeCommons.getNextNodeId());
      const { counter, childIds, url } = this.props;
      return (
        <div>
          Url: {url}
          {' '}
          Counter: {counter}
          {' '}
          <button onClick={this.handleIncrementClick}>
            +
          </button>
          {' '}
          <button onClick={this.handleLoadClick}>
            Load
          </button>
          {' '}
          
          <ul>
            {
              childIds.map(this.renderChild)
            }
          </ul>
        </div>
      );
    }

    private handleLoadClick(){
        console.log(this.props);
        const { fetchData, id, url, type } = this.props;
        fetchData(type, id, this.props.client, url);
    }

    private handleIncrementClick() {
        console.log('handleIncrementClick: '+ this.props);
        const { increment, id } = this.props;
        increment(id);
    }
}

function mapStateToProps(state, ownProps):INodeStateProps {
    return state[ownProps.id];
  }

  
const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;