import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import { useSelector } from 'react-redux'
import { axiosWithAuth } from '../../utils/axiosWithAuth'

import RecipeCard from './RecipeCard'

const RecipeList = () => {
<<<<<<< HEAD
  const userId = Number(localStorage.getItem('userId'))
  const [allRecipes, setAllRecipes] = useState([])
  const [err, setErr] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  console.log(userId)

  useEffect(() => {
    axiosWithAuth()
      .get('https://secret-recipes-2.herokuapp.com/api/recipes/allRecipes')
      .then(res => {
        setAllRecipes(res.data.filter(recipe => recipe.user_id === userId))
        setIsFetching(false)
      })
      .catch(err => {
        setErr(err)
        setIsFetching(false)
      })
  }, [userId])

  const gotallRecipes = allRecipes.length !== 0 ? true : false
  const gotError = err.message !== undefined ? true : false

  console.log(gotallRecipes)

  if (isFetching) return <div>Loading...</div>
  else if (gotallRecipes)
    return (
      <Container>
        <Row>
          {allRecipes.map(recipe => (
            <Col xs='12' sm='6' md='4' key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      </Container>
    )
  else if (!gotallRecipes)
    return (
      <div>
        No recipes yet? <Link to='/addrecipe'>Add one!</Link>
      </div>
    )
  else if (gotError) return <p>{err.message}</p>
  else return <></>
=======
//  const recipesList =useSelector(state =>state.recipes)
const [allRecipes, setAllRecipes] = useState([])
const [err, setErr] = useState([])

useEffect (() => {
  axiosWithAuth()
        .get("https://secret-recipes-2.herokuapp.com/api/recipes/allRecipes")
        .then(res => {
          setAllRecipes(res.data)
          console.log('allRecipes', res)
        })
        .catch(err => setErr(err))
}, [])

const gotallRecipes = (allRecipes.length !== 0 ) ? true : false
const gotError = (err.message !== undefined) ? true : false

if (gotallRecipes) return (
  <Container>
  <Row>
    <Col xs='12' sm='6' md='4'>
      <RecipeCard recipesList={allRecipes}/>
    </Col>
  </Row>
  </Container>
)
else if (gotError) return <p>{err.message}</p>
else return <></>
>>>>>>> e931dc2e15c9fb1c099683c490a55e414004876f
}

export default RecipeList
