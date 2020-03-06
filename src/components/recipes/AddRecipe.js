import React, { useState } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { postAddRecipe } from '../../store/actions';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { withFormik, Form, Feild, } from 'formik';
import * as Yup from 'yup'

const initialState = {
  title: '',
  source: '',
  ingredients: '',
  instructions: '',
  category: '',
  user_id: 1,
}

const AddNewRecipe = ({ errors, touched }) => {
  const userId = Number(localStorage.getItem('userId'))
  const [newRecipe, setNewRecipe] = useState(initialState)

  const history = useHistory()
  const dispatch = useDispatch()

  const handleChange = e => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(
      postAddRecipe({
        title: newRecipe.title,
        source: newRecipe.source,
        ingredients: newRecipe.ingredients,
        instructions: newRecipe.instructions,
        category: newRecipe.category,
        user_id: userId,
      })
    )
    setNewRecipe(``)
    history.push('/recipes')
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
          onChange={handleChange}
          value={newRecipe.title}
        />
        {touched.title && errors.title && (<p>{errors.title}</p>)}
      </FormGroup>
      <FormGroup>
        <Label for='source'>Source</Label>
        <Input
          type='text'
          name='source'
          id='source'
          placeholder='source'
          onChange={handleChange}
          value={newRecipe.source}
        />
        {touched.source && errors.source && (<p>{errors.source}</p>)}
      </FormGroup>
      <FormGroup>
        <Label for='ingredients'>ingredients</Label>
        <Input
          type='text'
          name='ingredients'
          id='ingredients'
          placeholder='ingredients'
          onChange={handleChange}
          value={newRecipe.ingredients}
        />
        {touched.ingredients && errors.ingredients && (<p>{errors.ingredients}</p>)}
      </FormGroup>
      <FormGroup>
        <Label for='category'>Category</Label>
        <Input
          type='select'
          name='category'
          id='category'
          onChange={handleChange}
          value={newRecipe.category}
        >
          <option>Add category</option>
          <option>Lunch</option>
          <option>Breakfast</option>
          <option>Diner</option>
          <option>Cookies</option>
          <option>Dessert</option>
          <option>Bread</option>
          <option>Salad</option>
          <option>Soup</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for='exampleText'>Instructions</Label>
        <Input
          type='textarea'
          name='instructions'
          id='instructions'
          onChange={handleChange}
          value={newRecipe.instructions}
        />{touched.instructions && errors.instructions && (<p>{errors.instructions}</p>)}
      </FormGroup>
      <FormGroup>
        <Label for='image'>File</Label>
        <Input type='file' name='image' id='image' />
      </FormGroup>

      <Button type='submit'>
        Submit
      </Button>
    </Form>
  )
}
const FormikAddRecipeForm = withFormik ({
  mapPropsToValues(props){
    return {
      title:props.title ||'',
      source:props.source ||'',
      instructions:props.instructions ||'',
      ingredients:props.ingredients ||'',
    }
  }, validationSchema :Yup.object().shape({
    title:Yup.string()
    .required("Please add recipe title"),
    source:Yup.string()
    .required("Please add recipe source"),
    instructions:Yup.string()
    .required("Please add recipe instructions"),
    ingredients:Yup.string()
    .required("Please add recipe ingredients")
  })
})(AddNewRecipe)

export default withRouter(FormikAddRecipeForm)
