import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom'

const initialState = {
  title: '',
  source: '',
  ingredients: '',
  instructions: '',
  category: '',
}

const EditRecipe = () => {
  const { id } = useParams()
  const history = useHistory()
  const [recipe, setRecipe] = useState(initialState)

  useEffect(() => {
    axiosWithAuth()
      .get(`/recipes/${id}`)
      .then(res => {
        console.log('edit recipe get response', res)
        setRecipe(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

  const changeHandler = ev => {
    ev.persist()
    setRecipe({ ...recipe, [ev.target.name]: ev.target.value })
  }

  const handleSubmit = e => {
    console.log('Put recipe in handle submit', recipe)
    e.preventDefault()
    axiosWithAuth()
      .put(`/recipes/${id}`, recipe)
      .then(res => {
        console.log('Response in the PUT request', res.data)
        setRecipe(res.data)
        history.push(`/recipes/${id}`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const cancel = e => {
    e.preventDefault()
    history.push(`/recipes/${id}`)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for='title'>Name</Label>
        <Input
          type='text'
          name='title'
          id='title'
          placeholder='title'
          onChange={changeHandler}
          value={recipe.title}
        />
      </FormGroup>
      <FormGroup>
        <Label for='source'>Source</Label>
        <Input
          type='text'
          name='source'
          id='source'
          placeholder='source'
          onChange={changeHandler}
          value={recipe.source}
        />
      </FormGroup>
      <FormGroup>
        <Label for='category'>Category</Label>
        <Input
          type='select'
          name='category'
          id='category'
          onChange={changeHandler}
          value={recipe.category}
        >
          <option>Add category</option>
          <option>Lunch</option>
          <option>Breakfast</option>
          <option>Dinner</option>
          <option>Cookies</option>
          <option>Dessert</option>
          <option>Bread</option>
          <option>Salad</option>
          <option>Soup</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for='exampleText'>Ingredients</Label>
        <Input
          type='textarea'
          name='ingredients'
          id='ingredients'
          onChange={changeHandler}
          value={recipe.ingredients}
        />
      </FormGroup>
      <FormGroup>
        <Label for='exampleText'>Instructions</Label>
        <Input
          type='textarea'
          name='instructions'
          id='instructions'
          onChange={changeHandler}
          value={recipe.instructions}
        />
      </FormGroup>
      <FormGroup>
        <Label for='image'>File</Label>
        <Input type='file' name='image' id='image' />
      </FormGroup>
      <Button type='submit'>Save changes</Button>
      <Button onClick={cancel}>Cancel</Button>
    </Form>
  )
}
export default EditRecipe
