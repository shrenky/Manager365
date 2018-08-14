import * as React from 'react';
import styles from './Manager365.module.scss';
import { IManager365Props } from './IManager365Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Manager365 extends React.Component<IManager365Props, {}> {
  public render(): React.ReactElement<IManager365Props> {
    return (
      <div className={ styles.manager365 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
