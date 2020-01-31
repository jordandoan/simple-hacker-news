import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { GET_LINKS, LINK_FRAGMENT } from './Queries';

import styles from './Add.module.scss';

const POST = gql`
  mutation Post($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      ...linkInfo
    }
  }
  ${LINK_FRAGMENT}
`

const Add = (props) => {

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
      .then(res => {
        props.setOpen(false);
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.container}>
      {status.error && <p>{status.error.message}</p>}
      <form className={styles.form} onSubmit={e => handleSubmit(e)}>
        <div className={styles.input}>
          Share a link
          <input name="url" value={fields.url} placeholder="URL"  onChange={e => handleChange(e)} />
        </div>
        <div className={styles.input}>
          What do you think?
          <input name="description" value={fields.description} placeholder="Description"  onChange={e => handleChange(e)}/>
        </div>
        <button className={styles.button}>Add link</button>
      </form> 
    </div>
  );
}

export default Add;
