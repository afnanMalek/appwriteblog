import React from 'react'
import { Container , PostForm as PostForm_Component } from '../components'
function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm_Component/>
        </Container>
    </div>
  )
}

export default AddPost