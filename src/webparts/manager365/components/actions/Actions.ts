export const INCREMENT = 'INCREMENT';
export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
export const FETCH_DATA_FULFILLED = 'FETCH_DATA_FULFILLED';
export const FETCH_DATA_REJECTED = 'FETCH_DATA_REJECTED';

export const FOLD_UNFOLD = 'FOLD_UNFOLD';
export const SELECT_NODE = 'SELECT_NODE';
export const LOAD_PROPERTIES = 'LOAD_PROPERTIES';
export const LOAD_PROPERTIES_PENDING = 'LOAD_PROPERTIES_PENDING';
export const LOAD_PROPERTIES_FULFILLED = 'LOAD_PROPERTIES_FULFILLED';
export const LOAD_PROPERTIES_REJECTED = 'LOAD_PROPERTIES_REJECTED';

import { SearchService } from '../../data/SearchService';
import treeCommons from '../../utility/treeCommons';
import { ListService, IListTitle } from "../../data/ListService";
import {NODE_TYPE} from '../generateTree';
import {
    sp
} from '@pnp/sp';

export interface INodeAction {
    type: string;
    nodeId?:any;
    childId?: any;
    counter?: number;
    loadNode?: any;
    payload?: any;
}

export function fold_unfold(nodeId): INodeAction {
    console.log('fold_unfold: ' + nodeId);
    return {
        type: FOLD_UNFOLD,
        nodeId: nodeId
    }
}

export function select_node(nodeId): INodeAction {
    console.log('select_node: ' + nodeId);
    return {
        type: SELECT_NODE,
        nodeId: nodeId
    }
}

export function load_properties(type:NODE_TYPE, listTitle: string, nodeId) {
    console.log('load_properties' + nodeId);
    if(type == NODE_TYPE.LIST)
    {
        return {
            type:LOAD_PROPERTIES,
            payload: sp.web.lists.getByTitle(listTitle).get().then(listProps =>{
                console.log(listProps);
                return listProps;
            }),
            meta: {
                nodeId: nodeId
            }
        }
    }
    
}

export function fetchData(type:NODE_TYPE, nodeId, spHttpClient: any, url: string){
    console.log('in fetch, httpClient: ' + spHttpClient);
    if(type == NODE_TYPE.TENANT)
    {
        const service = new SearchService(spHttpClient);
        console.log('get sites');
        return {
            type: FETCH_DATA,
            payload: service.getSitesStartingWith(url).then((urls) => { 
                console.log('get urls: ' + urls);
                return urls;
              }),
              meta: {
                nodeId: nodeId
              }
        };
    }
    else if(type == NODE_TYPE.SITE)
    {
        const service = new SearchService(spHttpClient);
        console.log('get webs');
        return {
            type: FETCH_DATA,
            payload: service.getWebsFromSite(url).then((urls) => { 
                console.log('get web urls: ' + urls);
                return urls;
              }),
              meta: {
                nodeId: nodeId
              }
        };
    }
    else if(type == NODE_TYPE.WEB)
    {
        console.log('get lists from: ' + url);
        const listService = new ListService(spHttpClient);
        return {
            type: FETCH_DATA,
            payload: listService.getListTitlesFromWeb(url).then((titles) => { 
                console.log('get list Titles: ' + titles);
                return titles;
              }),
              meta: {
                nodeId: nodeId
              }
        };
    }
    else
    {

    }
}

export function increment(nodeId): INodeAction {
    console.log('in increment: ' + nodeId);
    return {
        type: INCREMENT,
        nodeId: nodeId
    };
}

export function createNode(payload):INodeAction{
    return {
        type: CREATE_NODE,
        nodeId: `${treeCommons.getNextNodeId()}`,
        payload: payload
    };
}

export function deleteNode(nodeId):INodeAction{
    return {
        type: DELETE_NODE,
        nodeId
    };
}

export function addChild(nodeId, childId):INodeAction{
    return {
        type: ADD_CHILD,
        nodeId,
        childId
    };
}

export function removeChild(nodeId, childId){
    return{
        type: REMOVE_CHILD,
        nodeId,
        childId
    };
}