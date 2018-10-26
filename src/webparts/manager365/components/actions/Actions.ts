export const INCREMENT = 'INCREMENT'
export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'

export interface INodeAction {
    type: string;
    nodeId?:any;
    childId?: any;
    counter?: number;
}

export function increment(nodeId): INodeAction {
    console.log('in increment: ' + nodeId);
    return {
        type: INCREMENT,
        nodeId: nodeId
    }
}

let nextId = 0

export function createNode():INodeAction{
    return {
        type: CREATE_NODE,
        nodeId: `${++nextId}`
    }
}

export function deleteNode(nodeId):INodeAction{
    return {
        type: DELETE_NODE,
        nodeId
    }
}

export function addChild(nodeId, childId):INodeAction{
    return {
        type: ADD_CHILD,
        nodeId,
        childId
    }
  
}

export function removeChild(nodeId, childId){
    return{
        type: REMOVE_CHILD,
        nodeId,
        childId
    }
}