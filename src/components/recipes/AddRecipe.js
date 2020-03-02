import React, { useState }  from 'react'; 
//import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { postAddRecipe } from '../../store/actions';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

    const initialState = {
        title:'',
        source:'',
        instructions:'',
        category:''
    };

const AddNewRecipe = props => {
     const [ newRecipe, setNewRecipe ] = useState (initialState);

     const history = useHistory()
     const dispatch = useDispatch();

     const handleChange = e => { 
        setNewRecipe({
             ...newRecipe, 
              [e.target.name]: e.target.value,
        })
     };  

     const handleSubmit = e => {
         e.preventDefault();
         dispatch(
            postAddRecipe({
                title:newRecipe.title,
                source:newRecipe.source,
                instructions:newRecipe.instructions,
                category:newRecipe.category,
                id:Date.now()
            })   
         )
         setNewRecipe(``);
         history.push('/recipes')
        // axiosWithAuth()
        //   .post('/api/recipes', newRecipe)
        //   .then(res => {
        //       console.log ("Response in the POST request AddNewRecipe", res)
        //       setNewRecipe(res.data)
        //       props.history.push('/');
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
    };
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="title">Name</Label>
                <Input 
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder="title"
                    onChange={handleChange}
                    value={newRecipe.title} 
                />
            </FormGroup>
            <FormGroup>
                <Label for="source">Source</Label>
                <Input 
                    type="text" 
                    name="source" 
                    id="source" 
                    placeholder="source"
                    onChange={handleChange}
                    value={newRecipe.source}
                />
            </FormGroup>
            <FormGroup>
                <Label for="category">Category</Label>
                <Input 
                    type="select" 
                    name="category" 
                    id="category"
                    onChange={handleChange}
                    value={newRecipe.category}
                >
                    <option>Diner</option>
                    <option>Dessert</option>
                    <option>Breakfast</option>
                    <option>Drink</option>
                    <option>Cookies</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">Instructions</Label>
                <Input 
                    type="textarea" 
                    name="instructions" 
                    id="instructions" 
                    onChange={handleChange}
                    value={newRecipe.instructions}
                />
            </FormGroup>
            <FormGroup>
                <Label for="image">File</Label>
                <Input type="file" name="image" id="image" />
            </FormGroup>
        <Button type= "submit"  
        // onClick={ ()=> props.history.push("/recipes")}
        >Submit</Button>
      </Form>
    )
 }
export default AddNewRecipe;
