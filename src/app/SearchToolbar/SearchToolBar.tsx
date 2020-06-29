/**
 * SearchToolbar - Search Component to search the Project Namespaces(Names) .
 *
 * @version 1.0.1
 * @author [Nikunj Doshi](https://github.com/nikunjdoshi67)
 */

import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import {
  DataToolbar,
  DataToolbarContent,
  DataToolbarItem,
} from '@patternfly/react-core/dist/esm/components';
import { Toolbar, ToolbarContent, ToolbarItem, InputGroup, TextInput, Button, ButtonVariant } from '@patternfly/react-core';
import { SearchIcon, CloseIcon } from '@patternfly/react-icons';

import { DashboardTable } from '@app/myTable/DashboardTable/DashboardTable';



type myProps = {
  data: Array<dataObject>;
  columnTitle: object;
};

type dataObject = {
  namespace: string;
  activationTime: number;
};

type myState = {
  mainData: Array<dataObject>;
  displayData: Array<dataObject>;
  filterTag: string;
};

class SearchToolBar extends React.Component<myProps, myState> {
  constructor(props: myProps) {
    super(props);
    this.state = {
      mainData: this.props.data,
      displayData: this.props.data,
      filterTag: ''
    };
  }

// static getDerivedStateFromProps(props: myProps , state: myState){
//     console.log(props);
//    return({
//       mainData: props.data,
//       displayData: props.data,
//       filterTag: ''
//     })
//   }

  UNSAFE_componentWillReceiveProps(nextProps: myProps){
    this.setState({
      mainData: nextProps.data,
      displayData: nextProps.data,
      filterTag: ''
    })
  }
  
  /**
   * @param  Project Name to be searched
   * @return Searched Data from regex function
   */

  render() {
    return (
      <React.Fragment>
        <Toolbar id="toolbar"><ToolbarContent>
        <ToolbarItem>
         <InputGroup>
           <TextInput name="textInput1" id="textInput1" type="search" aria-label="search input" value={this.state.filterTag} onChange={(filterTag)=>this.search(filterTag)}/>
           <Button variant={ButtonVariant.control} aria-label="search button for search input">
             <SearchIcon />
           </Button>
           <Button onClick={()=>this.reset()}> <CloseIcon/> </Button>
         </InputGroup>
       </ToolbarItem>
       </ToolbarContent>
       </Toolbar>
       <DashboardTable tableData={this.state.displayData} columnTitle={this.props.columnTitle}/>
      </React.Fragment>
    );
  }
  reset() {
    this.setState({...this.state, filterTag:"", displayData: this.props.data, mainData: this.props.data }) 
  }

  /** Regex Functionality implemented for the Search Toolbar. */

  search(filterTag: string){
    const tags=filterTag.trim().split(" ");
    const regExps: Array<RegExp>=tags.map(tag=> new RegExp(tag));
    const filterData: Array<dataObject> =this.state.mainData;
    const newData=filterData.filter(object => regExps.some(exp=>object.namespace.match(exp)))
    this.setState({...this.state, filterTag:filterTag, displayData: newData, mainData: this.props.data })
  }
}

export default SearchToolBar;