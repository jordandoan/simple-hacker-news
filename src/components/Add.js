import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const GET_LINKS = gql`
 query GetLinks {
   feed {
     links {
       description
       url
     }
   }
 }
`

const POST = gql`
  mutation Post($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      url
      description
    }
  }
`

const Add = () => {
  const [fields, setFields] = useState({url: "", description: ""});
  const [addLink, status] = useMutation(POST,
    {
      update(cache, {data}) {
        const { feed } = cache.readQuery({ query: GET_LINKS });
        cache.writeQuery({
          query: GET_LINKS,
          data: {feed: { ...feed, links: feed.links.concat([data.post]) }},
        });
      }
    }
);

  const handleChange = (e) => {
    setFields({...fields, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addLink({variables: fields})
    setFields({url: "", description: ""})

  }
  return (
    <div>
      {status.error && <p>{status.error.message}</p>}
      <form onSubmit={e => handleSubmit(e)}>
        <input name="url" value={fields.url} placeholder="URL"  onChange={e => handleChange(e)} />
        <input name="description" value={fields.description} placeholder="Description"  onChange={e => handleChange(e)}/>
        <button>Add link</button>
      </form>
    </div>
  );
}

export default Add;
