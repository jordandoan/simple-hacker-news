import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_LINK } from './Queries';
import { CREATE_COMMENT } from './Mutations';

const DetailedLink = (props) => {
  const linkID = props.match.params.linkID
  const [fields, setFields] = useState({text: ""})
  const { data, loading } = useQuery(GET_LINK, { variables: { id: linkID }})
  const [createComment, other] = useMutation(CREATE_COMMENT)
  const link = data && data.link

  const handleChange = (e) => {
    e.preventDefault()
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createComment({variables: {...fields, link: linkID }})
  }

  if (loading) return <div>Finding post...</div>
  return (
    <div>
      <button onClick={props.history.goBack}>Go back</button>
      <p>{link.url} {link.description}</p>
      <textarea placeholder="Add a comment..." name="text" value={fields.text} onChange={handleChange}/>
      <button onClick={handleSubmit}>Submit</button>
      {link.comments.map(comment => 
        <div>
          {comment.text}
        </div>)}
    </div>
  )
}

export default DetailedLink;