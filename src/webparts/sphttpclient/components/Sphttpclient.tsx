import * as React from 'react';
import styles from './Sphttpclient.module.scss';
import type { ISphttpclientProps } from './ISphttpclientProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient,SPHttpClientResponse } from '@microsoft/sp-http';
import { ISpHttpClientListColumns } from '../../../CommonMethods/ISharePointListCoulmns';
import { ListName } from '../../../Enum/ListName';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
const Sphttpclient:React.FC<ISphttpclientProps>=(props)=>{
  const [fullName,setFullName]=React.useState<string>("");
  const [age,setAge]=React.useState('');
  const [allItems,setAllItems]=React.useState<ISpHttpClientListColumns[]>([]);

  //create items

  const createItems=async():Promise<void>=>{
    const body:string=JSON.stringify({
      'Title':fullName,
      'Age':age
    });
    try{
      const response:SPHttpClientResponse=await props.context.spHttpClient.post(`${props.siteurl}/_api/web/lists/getbytitle('${ListName.EmployeeList}')/items`,
        SPHttpClient.configurations.v1,
        {
          headers:{
            'Accept':'application/json;odata=nometadata',
            'Content-type':'application/json;odata=nometadata',
            'odata-version':''
          },
          body:body
        }
      );
      if(response.ok){
        const responseJSON=await response.json();
        console.log(responseJSON);
        alert(`Item created successfully with ID: ${responseJSON.ID}`);
       
      }
      else{
        const errorResponse=await response.json();
        console.error('Error creating item:',errorResponse);
        alert(`Failed to create item: ${errorResponse.error.message}`);
      }
    }
    catch(err:any){
      console.error('Error creating item:',err);
      alert(`An error occurred while creating the item: ${err.message}`);
    }
  }

  //update items

  const updateITems=():void=>{
    const idElement=document.getElementById('itemId') as HTMLInputElement;
    if(idElement){
      const id:number=parseInt(idElement.value);
      const body:string=JSON.stringify({
        'Title':fullName,
        'Age':age
      });
      if(id>0){
        props.context.spHttpClient.post(`${props.siteurl}/_api/web/lists/getbytitle('${ListName.EmployeeList}')/items(${id})`,
        SPHttpClient.configurations.v1,
        {
          headers:{
            'Accept':'application/json;odata=nometadata',
            'Content-type':'application/json;odata=nometadata',
            'odata-version':'',
            'IF-MATCH':'*',
            'X-HTTP-Method':'MERGE'
          },
          body:body
        }
        )
        .then((response:SPHttpClientResponse)=>{
          if(response.ok){
            alert(`Item with ID: ${id} updated successfully`);
          }
          else{
            response.json().then((responseJSON)=>{
              console.log(responseJSON);
              alert(`Failed to update item with ID: ${id}. Error: ${responseJSON.error.message}`);
            });
          }
        })
        .catch((err)=>{
          console.error('Error updating item:',err);
        });
      }
      else{
        alert('Please enter a valid item ID greater than 0 for update operation.');
      }
    }
    else{
      alert('Item ID input element not found. Please ensure it is rendered in the DOM.');
    }
  }

  //delete items
  const deleteItems=():void=>{
    const idElement=document.getElementById('itemId') as HTMLInputElement;
    const id:number=parseInt(idElement.value);
    if(id>0){
      props.context.spHttpClient.post(`${props.siteurl}/_api/web/lists/getbytitle('${ListName.EmployeeList}')/items(${id})`,
      SPHttpClient.configurations.v1,
      {
        headers:{
          'Accept':'application/json;odata=nometadata',
          'Content-type':'application/json;odata=nometadata',
          'odata-version':'',
          'IF-MATCH':'*',
          'X-HTTP-Method':'DELETE'
        }
      }
      )
      .then((response:SPHttpClientResponse)=>{
        if(response.ok){
          alert(`Item with ID: ${id} deleted successfully`);
        }
        else{
          response.json().then((responseJSON)=>{
            console.log(responseJSON);
            alert(`Failed to delete item with ID: ${id}. Error: ${responseJSON.error.message}`);
          });
        }
      })
      .catch((err)=>{
        console.error('Error deleting item:',err);
      });
    }
    else{
      alert('Please enter a valid item ID greater than 0 for delete operation.');
    }
  }
  //get item by id
  const getItemBYID=():void=>{
    const idElement=document.getElementById('itemId') as HTMLInputElement|null;
    if(idElement?.value){
      const id:number=Number(idElement.value);
      if(id>0){
        props.context.spHttpClient.get(`${props.siteurl}/_api/web/lists/getbytitle('${ListName.EmployeeList}')/items(${id})`,
        SPHttpClient.configurations.v1,
        {
          headers:{
            'Accept':'application/json;odata=nometadata',
            'Content-type':'application/json;odata=nometadata',
            'odata-version':''
          }
        })
        .then((response:SPHttpClientResponse)=>{
          if(response.ok){
response.json().then((responseJSON)=>{
  setFullName(responseJSON.Title);
  setAge(responseJSON.Age);
  alert(`Item with ID: ${id} retrieved successfully`);
});
          }
          else{
            response.json().then((responseJSON)=>{
              console.log(responseJSON);
              alert(`Failed to retrieve item with ID: ${id}. Error: ${responseJSON.error.message}`);
            });
          }
        })
       
    }
    else{
      alert('Please enter a valid item ID for retrieval.');
    }
  }
  else{
      alert('Item ID input element not found. Please ensure it is rendered in the DOM.');
  }
}
//get all items

const getALLitems=():void=>{
  props.context.spHttpClient.get(`${props.siteurl}/_api/web/lists/getbytitle('${ListName.EmployeeList}')/items`,
  SPHttpClient.configurations.v1,
  {
    headers:{
      'Accept':'application/json;odata=nometadata',
      'Content-type':'application/json;odata=nometadata',
      'odata-version':''
    }
  })
  .then((response:SPHttpClientResponse)=>{
    if(response.ok){
      response.json().then((responseJSON)=>{
        setAllItems(responseJSON.value);
        alert('All items retrieved successfully');
      });
    }
    else{
      response.json().then((responseJSON)=>{
        console.log(responseJSON);
        alert(`Failed to retrieve items. Error: ${responseJSON.error.message}`);
      });
    }
  })
  .catch((err)=>{
    console.error('Error retrieving items:',err);
  });
}
  return(
    <>
       <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>{escape(props.description)}</p>
            <div className="form-group">
              <label htmlFor="itemId">Item ID:</label>
              <input type="text" className="form-control" id="itemId"></input>
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)}></input>
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="text" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)}></input>
            </div>
            <div className="form-group">
              <label htmlFor="allItems">All Items:</label>
              <div id="allItems">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allItems.map((item) => (
                      <tr key={item.ID}>
                        <td>{item.ID}</td>
                        <td>{item.Title}</td>
                        <td>{item.Age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex justify-content-start">
              <button className="btn btn-primary mx-2" onClick={createItems}>Create</button>
              <button className="btn btn-success mx-2" onClick={getItemBYID}>Read</button>
              <button className="btn btn-info mx-2" onClick={getALLitems}>Read All</button>
              <button className="btn btn-warning mx-2" onClick={updateITems}>Update</button>
              <button className="btn btn-danger mx-2" onClick={deleteItems}>Delete</button>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}
export default Sphttpclient;
