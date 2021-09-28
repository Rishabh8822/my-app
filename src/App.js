import './App.css';
import React from 'react';
import { Modal, Button, Table }  from 'react-bootstrap';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

let that;
class App extends React.Component {
   
    constructor(props){
      super(props);
      this.state = {
        isOpen : false,
        tempField:"",
        tableData:[],
        data:[
          {
            title:'First Name',
            value:''
          },
          {
            title:'Last Name',
            value:''
          },
          {
            title:'Email',
            value:''
          },
        ]
      }
    }

    handleClose = () =>{
       this.setState({isOpen:false}); 
    }
      
    openModal = () => { 
      this.setState({isOpen:true}); 
    }

    removeFields = (item) => {
        let data = this.state.data;
        data.splice(data.findIndex(v => v.title === item.title), 1);
        this.setState({data});
    }

    onChangeField = (e,item) => {
      let val = e.target.value;
      let data = this.state.data;
      let indx = data.findIndex(v => v.title === item.title);
      data[indx].value= val;
      this.setState({val});
    }

    createFields = (item) => { 
      return(
          <>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',userSelect:'none'}}>
              <label for="fname" style={{width:100}}>{item.title}</label>
            <input type="text" id={item.title} style={{ width: 250 }} onChange={(e)=>{
              this.onChangeField(e,item);
            }} name={item.title} value={item.value} placeholder={'Enter '+item.title} />
              <AiOutlineClose size={40} color={'red'} onClick={()=>this.removeFields(item)} />
            </div>
          </>
      );
    }

    createNew = () => {
      let data = this.state.data;
      data.push({ title: this.state.tempField,value:""});
      this.setState({ data, isOpen: false, tempField:''});
    }

    handleChange(evt) {
      that.setState({ tempField: evt.target.value });
    }

    onSubmit = ()=>{ 
      console.log(this.state.data);
      this.setState({tableData:this.state.data});    
    }
    render () {
      that = this;
      return (
        <>
          <div className="App">
            <div className="card">
              <div className="container">
                <div className="button_css">
                  
                    <AiOutlinePlus size={40} color={'green'} onClick={() => { this.openModal() }} />
                  
                  {/* <button className="button" style={{fontSize:30}} >+</button> */}
                </div>
                <div>
                  {this.state.data.length > 0 && this.state.data.map(item => {
                    return this.createFields(item);
                  })}
                </div>
                <div className="submit_button">
                  <button className="button" onClick={this.onSubmit}>Submit</button>
                </div>
              </div>
            </div>
            <div style={{marginTop:50}}>
              {this.state.tableData.length >0 && <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tableData.length > 0 && this.state.tableData.map((item,idx)=>(

                    <tr>
                      <td>{idx}</td>
                      <td>{item.title}</td>
                      <td>{item.value}</td>
                    </tr>
                  )

                  )}
                </tbody>
              </Table>}
            </div>  
            
            <Modal size="lg" show={this.state.isOpen} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title> Add Field</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input type="text" id="email" name="lastname" value={this.state.tempField} onChange={this.handleChange} placeholder="Enter title" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.createNew}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      );
    }

}

export default App;
