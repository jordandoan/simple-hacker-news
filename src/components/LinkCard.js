import React, {useState} from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const DELETE = gql`
  mutation Delete($id: ID!) {
    deleteLink(id: $id) {
      id
    }
  }
`
const EDIT = gql`
  mutation Edit($id: ID!, $url: String!, $description: String!) {
    updateLink(id: $id, url: $url, description: $description) {
      id
    }
  }
`

const LinkCard = ({ link, index, user }) => {
  let [deleteLink, deleteStatus] = useMutation(DELETE);
  let [editLink, editStatus] = useMutation(EDIT);
  let [formActive, setForm] = useState(false);
  let [fields, setFields] = useState({url: link.url, description: link.description})

  const handleDelete = () => {
    deleteLink({variables: {id: link.id}})
  }

  const handleChange = (e) => {
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editLink({variables: {...fields, id: link.id}})
    setForm(false);
  }

  return (
    <div className="link-container">
      {!formActive && 
      (<>
        <p>{link.url}</p>
          <p>{link.description}</p>
          <p>Posted by: {link.postedBy.name}</p>
          {link.postedBy.id == user.id  && 
            <>
              <button onClick={() => handleDelete()}>Delete</button>
              <button onClick={() => setForm(true)}>Edit</button>
            </>}
      </>)
      }
      {formActive && 
        <form>
          <div>
            <input name="url" value={fields.url} onChange={e => handleChange(e)}/>
          </div>
          <div>
            <textarea name="description" value={fields.description} onChange={e => handleChange(e)}/>
          </div>
          <button onClick={(e) => handleSubmit(e)}>Save changes</button>
        </form>
      }
    </div>
  );
}

export default LinkCard;