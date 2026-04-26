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
import ChoiceService from '../../Service/ChoiceService';
export interface ISharePointFormWebPartProps {
  description: string;

}

export default class SharePointFormWebPart extends BaseClientSideWebPart<ISharePointFormWebPartProps> {
private choice_service:ChoiceService|undefined;
 protected onInit(): Promise<void> {
  this.choice_service=new ChoiceService(this.context);
    return super.onInit().then(_ => {
    sp.setup({
      spfxContext:this.context as any
    });
    });
  }

  public async render(): Promise<void> {
    const element: React.ReactElement<ISharePointFormProps> = React.createElement(
      SharePointForm,
      {
        description: this.properties.description,
        siteurl:this.context.pageContext.web.absoluteUrl,
        context:this.context,
        departmentoptions:await this.choice_service?.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Department"),
        genderoptions:await this.choice_service?.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Gender"),
        skillsoptions:await this.choice_service?.getChoiceValues(this.context.pageContext.web.absoluteUrl,"Skills"),
        cityoptions:await this.choice_service?.getLookupValueforCities()

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
