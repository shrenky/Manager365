import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/Actions';
import { Dispatch } from 'redux';

export interface INodeStateProps{
    type:string;
    nodeId: any;
    id:any;
    counter:any;
    parentId:any;
    childIds:any;

}

export interface INodeDispatchProps{
    increment(id);
    createNode();
    addChild(id, childId);
}

;

export class Node extends React.Component<INodeStateProps & INodeDispatchProps> {
    constructor(props){
        super(props);
        this.handleIncrementClick = this.handleIncrementClick.bind(this);
        this.handleAddChildClick = this.handleAddChildClick.bind(this);
    }

    renderChild = childId => {
        const { id } = this.props
        return (
          <li key={childId}>
            <ConnectedNode id={childId} parentId={id} />
          </li>
        )
      }
    
      render() {
        const { counter, parentId, childIds } = this.props
        return (
          <div>
            Counter: {counter}
            {' '}
            <button onClick={this.handleIncrementClick}>
              +
            </button>
            {' '}
            
            <ul>
              {childIds.map(this.renderChild)}
              <li key="add">
                <a href="#" // eslint-disable-line jsx-a11y/anchor-is-valid
                  onClick={this.handleAddChildClick}
                >
                  Add child
                </a>
              </li>
            </ul>
          </div>
        )
      }

    private handleIncrementClick() {
        const { increment, nodeId } = this.props
        increment(nodeId);
    }

    private handleAddChildClick(e){
        e.preventDefault();
        const { addChild, createNode, id } = this.props;
        const childId = createNode().nodeId;
        addChild(id, childId);
    }
}

function mapStateToProps(state, ownProps):INodeStateProps {
    return state[ownProps.id]
  }

  
const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode