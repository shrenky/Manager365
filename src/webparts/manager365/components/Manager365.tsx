import * as React from 'react';
import styles from './Manager365.module.scss';
import { IManager365Props } from './IManager365Props';
import { IManager365States } from './IManager365States';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchService } from '../data/SearchService';
import { Spinner, Label } from 'office-ui-fabric-react';

export default class Manager365 extends React.Component<IManager365Props, IManager365States> {
  constructor(props)
  {
    super(props);
    this.state={loading:true, siteUrls:null}
  }

  public componentDidMount(): void {
    this.loadSiteCollection();
  }

  public render(): React.ReactElement<IManager365Props> {
    

    const loading = this.state.loading ? <Spinner label='loading...' /> : <div />;

    return (
      <div className={ styles.manager365 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
                {
                  loading
                }
                <ul>
                  {
                    this.state.loading ? <li/> : this.state.siteUrls.map(url=>{ return <li>{url}</li>})
                  }
                </ul>
                
            </div>
          </div>
        </div>
      </div>
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
