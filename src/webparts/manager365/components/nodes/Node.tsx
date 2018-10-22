import * as React from 'react';
import { Checkbox, ICheckboxProps} from 'office-ui-fabric-react/lib/Checkbox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Spinner } from 'office-ui-fabric-react';
import { SearchService } from '../../data/SearchService';
import Styles from '../Manager365.module.scss';
import { ListService } from '../../data/ListService';

export interface INodeProps{
    url: string;
    fold: boolean;
    type: string;
    level: number;
    spHttpClient: any;
}

export interface INodeStates{
    isChildrenLoaded: boolean;
    isFold: boolean;
    childrenUrls: string[];
    listTitles: string[];
}

export default class Node extends React.Component<INodeProps, INodeStates>{
    constructor(props){
        super(props);
        this.state= {
            isChildrenLoaded: true,
            isFold: this.props.fold,
            childrenUrls: [],
            listTitles: []
        };
        this.loadChildren = this.loadChildren.bind(this);
    }

    public render(){
        const httpClient = this.props.spHttpClient;
        const loadingWeb = !this.state.isChildrenLoaded ? 
                            <Spinner label='loading...' /> : 
                            <div>
                                {
                                    
                                        this.state.childrenUrls.map(url=>{
                                            console.log('Web: ' + url);
                                            return <Node url={url} fold={false} type={'web'} level={2} spHttpClient={httpClient} />
                                        })
                                }
                            </div>;
        const loadingList = !this.state.isChildrenLoaded ? 
                            <Spinner label='loading...' /> : 
                            <div>
                                {
                                    
                                        this.state.listTitles.map(url=>{
                                            console.log('List Title: ' + url);
                                            return <Node url={url} fold={false} type={'list'} level={3} spHttpClient={httpClient} />
                                        })
                                }
                            </div>;
        const loading = this.props.type == 'site' ? loadingWeb : loadingList;
        return (
            <div onClick={this.loadChildren}>
                <Icon iconName="Dictionary" style={{width:'16px', height:'16px'}}/>
                <span>{this.props.url}</span>
                <div>
                    {
                        loading
                    }
                </div>
                
            </div>
        );
    }

    private loadChildren()
    {
        this.setState(
            {
                isChildrenLoaded: false
            }
        );
        if(this.props.type == 'site')
        {
            let self = this;
            if(this.state.childrenUrls.length == 0)
            {
               let service = new SearchService(this.props.spHttpClient);
                service.getWebsFromSite(this.props.url).then((urls) => { 
                    console.log(urls);
                    this.setState(
                                {
                                    isChildrenLoaded: true,
                                    isFold:false,
                                    childrenUrls:urls
                                }
                            );
                }).catch(e=>console.log(e)); 
            }
            
        }
        else if(this.props.type == 'web')
        {
            console.log('get list from: ' + this.props.url);

            let listservice = new ListService(this.props.spHttpClient);
            listservice.getListTitlesFromWeb(this.props.url).then((results) => {
                console.log(results);
                const listTitles = results.map(result=>{return result.title});
                console.log(listTitles);
                this.setState(
                    {
                        isChildrenLoaded: true,
                        isFold: false,
                        listTitles: listTitles
                    }
                );
            }).catch(e=>console.log(e));
        }
    }
}