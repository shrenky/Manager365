import { getChildren } from "office-ui-fabric-react";

export const INCREMENT = 'INCREMENT';
export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';

export const FETCH_DATA = 'FETCH_DATA'
export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING'
export const FETCH_DATA_FULFILLED = 'FETCH_DATA_FULFILLED'
export const FETCH_DATA_REJECTED = 'FETCH_DATA_REJECTED'

import { SearchService } from '../../data/SearchService';

export interface INodeAction {
    type: string;
    nodeId?:any;
    childId?: any;
    counter?: number;
    loadNode?: any;
    payload?: any;
}

export function fetchData(nodeId, spHttpClient: any, url: string){
    console.log('in fetch');
    const service = new SearchService(spHttpClient);
    return {
        type: FETCH_DATA,
        payload: service.getSitesStartingWith(url).then((urls) => { 
            console.log('get urls: ' + urls);
            return urls;
            //fetchDataFulfilled(urls);
          }),
          meta: {
            nodeId: nodeId
          }
    }
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