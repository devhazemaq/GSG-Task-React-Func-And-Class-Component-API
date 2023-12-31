import React, { Component } from 'react'
import Table from '../../components/Table';
import { POSTS_COLUMNS } from '../../constants/posts';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../router/paths'
import axios from 'axios';

export default class PostsPage extends Component {

  state = {
    posts: [],
    isLoading: true,
  }


  componentDidMount(){
    fetch('https://some-data.onrender.com/stores')
      .then((Response)=> Response.json() )
      .then((data) => this.setState({posts:data, isLoading : false}) )
  }

  handleDelete = async (id) => {
    console.log(id, 'is deleted');
    try {
      axios.delete(`https://some-data.onrender.com/stores/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  handleEdit = (id) => {
    console.log(id, 'is edited');
    this.setState({ editId: id });
  };

  handleView = (row) => {
    console.log(row.id, 'is viewed');
    this.setState({rowId: row.id})
  }

  render() {



    return (
      <div>
        <h1>Posts<small>page <small>haz</small></small></h1>
        <br /> <br />

        <button onClick={ ()=> this.setState({isCreating:true}) } >
          Create Post
        </button>

        <br /> <br /><br />
        <Table
          columns={POSTS_COLUMNS(this.handleDelete, this.handleEdit)}
          data={this.state.posts}
          onRowClick={this.handleView}
          isLoading={this.state.isLoading}

        />
  
        { this.state.rowId &&
          <Navigate to={`${this.state.rowId}`} 
          replace /> }

{this.state.editId && (
          <Navigate
            to={PATHS.POSTS.EDIT.replace(':id', this.state?.editId)}
            replace
          />)}

        {this.state?.isCreating && <Navigate to={PATHS.POSTS.CREATE} />}
        
      </div>
    )
  }
}

