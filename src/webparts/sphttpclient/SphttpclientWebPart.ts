import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SphttpclientWebPartStrings';
import Sphttpclient from './components/Sphttpclient';
import { ISphttpclientProps } from './components/ISphttpclientProps';
import {sp} from "@pnp/sp/presets/all";
export interface ISphttpclientWebPartProps {
  description: string;
}

export default class SphttpclientWebPart extends BaseClientSideWebPart<ISphttpclientWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext:this.context as any
      })
    });
  }

  public render(): void {
    const element: React.ReactElement<ISphttpclientProps> = React.createElement(
      Sphttpclient,
      {
        description: this.properties.description,
        context:this.context,
        siteurl:this.context.pageContext.web.absoluteUrl
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
