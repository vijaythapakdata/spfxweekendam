import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PaginatedtableWebPartStrings';
import Paginatedtable from './components/Paginatedtable';
import { IPaginatedtableProps } from './components/IPaginatedtableProps';
import {sp} from "@pnp/sp/presets/all";
export interface IPaginatedtableWebPartProps {
  description: string;
}

export default class PaginatedtableWebPart extends BaseClientSideWebPart<IPaginatedtableWebPartProps> {


  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
     sp.setup({
      spfxContext:this.context as any
     });
    });
  }
  public render(): void {
    const element: React.ReactElement<IPaginatedtableProps> = React.createElement(
      Paginatedtable,
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
