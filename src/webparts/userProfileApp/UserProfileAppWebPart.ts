import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'UserProfileAppWebPartStrings';
import UserProfileApp from './components/UserProfileApp';
import { IUserProfileAppProps } from './components/IUserProfileAppProps';

export interface IUserProfileAppWebPartProps {
  description: string;
}

export default class UserProfileAppWebPart extends BaseClientSideWebPart<IUserProfileAppWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IUserProfileAppProps> = React.createElement(
      UserProfileApp,
      {
        aadHttpClientFactory:this.context.aadHttpClientFactory
      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
