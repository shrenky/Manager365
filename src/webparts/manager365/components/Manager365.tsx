import * as React from 'react';
import Styles from './Manager365.module.scss';
import { IManager365Props } from './IManager365Props';
import { IManager365States } from './IManager365States';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchService } from '../data/SearchService';
import { 
  Spinner,
  Nav,
  INavProps
} from 'office-ui-fabric-react';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/Reducers'
import generateTree from './generateTree'
import Node from './containers/Node'

const tree = generateTree();
const store = createStore(reducer, tree as any);

export default class Manager365 extends React.Component<IManager365Props, IManager365States> {
  constructor(props)
  {
    super(props);
    this.state={loading:true, siteUrls:[]}
  }

  public componentDidMount(): void {
    this.loadSiteCollection();
  }

  public render(): React.ReactElement<IManager365Props> {
    return (
        <Provider store={store}>
          <Node id={0} />
        </Provider>
    );
  }

  public loadSiteCollection(): void{
    let self = this;
    let serverUrl = `${window.location.protocol}//${window.location.hostname}`;
    let service = new SearchService(this.props.spHttpClient);
    service.getSitesStartingWith(serverUrl).then((urls) => { 
        self.setState({loading:false, siteUrls: urls})
      }).catch(e=>console.log(e));
  }
}

/*
<div className="ms-NavExample-LeftPane">
                  {
                    <Nav
                      groups={
                        [
                          {
                            links: [
                              {
                                name: "Tenant",
                                url: "",
                                links: siteLinks,
                                isExpanded: false
                              }
                            ]
                          }
                        ]
                      }
                    />
                  }
                </div> */