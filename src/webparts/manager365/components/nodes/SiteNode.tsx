import * as React from 'react';

export interface ISiteNodeProps{
    siteUrl: string;
    fold: boolean;
}

export default class SiteNode extends React.Component<ISiteNodeProps, null>{
    constructor(props){
        super(props);
    }

    public render(){
        return (
            <div>{this.props.siteUrl}</div>
        );
    }
}