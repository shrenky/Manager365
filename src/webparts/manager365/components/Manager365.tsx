import * as React from 'react';
import { IManager365Props } from './IManager365Props';
import { IManager365States } from './IManager365States';
import { 
  Spinner,
  Nav,
  INavProps
} from 'office-ui-fabric-react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/Reducers';
import generateTree from './generateTree';
import Node from './containers/Node';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';

const tree = generateTree();
const store = createStore(reducer, tree as any, applyMiddleware(thunk, promiseMiddleware(), logger));

export default class Manager365 extends React.Component<IManager365Props, IManager365States> {
  constructor(props)
  {
    super(props);
    this.state={loading:true, siteUrls:[]};
  }

  public render(): React.ReactElement<IManager365Props> {
    //loading node starts from 1, node 0 is selected node.
    return (
        <Provider store={store}>
          <Node id={1} client={this.props.spHttpClient}/>
        </Provider>
    );
  }
}