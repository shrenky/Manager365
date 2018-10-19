import * as React from 'react';
import { Checkbox, ICheckboxProps} from 'office-ui-fabric-react/lib/Checkbox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Spinner } from 'office-ui-fabric-react';
import { SearchService } from '../../data/SearchService';
import Styles from '../Manager365.module.scss';

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
}

export default class Node extends React.Component<INodeProps, INodeStates>{
    constructor(props){
        super(props);
        this.state= {
            isChildrenLoaded: true,
            isFold: this.props.fold,
            childrenUrls: []
        };
        this.loadChildren = this.loadChildren.bind(this);
    }

    public render(){
        const httpClient = this.props.spHttpClient;
        const loading = !this.state.isChildrenLoaded ? 
                            <Spinner label='loading...' /> : 
                            <div>
                                {
                                    
                                        this.state.childrenUrls.map(url=>{
                                            console.log('Web: ' + url);
                                            return <Node url={url} fold={false} type={'web'} level={2} spHttpClient={httpClient} />
                                        })
                                }
                            </div>;
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
}