import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SharePointFormWebPartStrings';
import SharePointForm from './components/SharePointForm';
import { ISharePointFormProps } from './components/ISharePointFormProps';
import {sp} from "@pnp/sp/presets/all";
export interface ISharePointFormWebPartProps {
  description: string;

}

export default class SharePointFormWebPart extends BaseClientSideWebPart<ISharePointFormWebPartProps> {

 protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
    sp.setup({
      spfxContext:this.context as any
    });
    });
  }

  public render(): void {
    const element: React.ReactElement<ISharePointFormProps> = React.createElement(
      SharePointForm,
      {
        description: this.properties.description,
        siteurl:this.context.pageContext.web.absoluteUrl,
        context:this.context
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
