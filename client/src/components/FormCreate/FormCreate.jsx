import {React, useEffect, useState} from 'react'
import {Formik, Form, Field, FieldArray} from "formik"
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, postBook } from '../../redux/actions'
import { useLocation } from 'react-router-dom'

export default function FormCreate() {
    
    const dispatch = useDispatch()
    var [formSubmit, setFormSubmit] = useState(false)
    var [last, setLast] = useState("")
    
    useEffect(() => {
        dispatch(getCategories)
    }, [dispatch])

    var catego = useSelector(state => state.categories)

    return (
        <>
            <Formik

                initialValues={{
                    title: "",
                    author: "",
                    categories: [],
                    price: 0,
                    stock: 0,
                    description: "",
                    image: ""
                }}
                
                validate={(valores) => {

                    let errors = {}

                    if(!valores.title) {
                        errors.title = "Please enter a title"
                    } else if(valores.title.length > 100) {
                        errors.title = "The title cannot exceed 100 characters"
                    }

                    if(!valores.author) {
                        errors.author = "Please enter an author"
                    } else if(valores.author.length > 50) {
                        errors.author = "The author cannot exceed 100 characters"
                    }

                    if(!valores.price) {
                        errors.price = "Please enter a price"
                    } else if(valores.price < 0) {
                        errors.price = "The price cannot be lower than 0"
                    }

                    if(valores.stock < 0) {
                        errors.stock = "The stock cannot be lower than 0"
                    }

                    if(valores.description.length > 5000) {
                        errors.description = "Up to 5000 characters only"
                    }

                    return errors

                }}

                onSubmit={(valores, {resetForm}) => {
                    dispatch(postBook(valores))
                    resetForm()
                    setFormSubmit(true)
                    setTimeout(() => setFormSubmit(false), "3000")
                }}
            >
                {( {errors, touched} ) => (
                    <>
                    <div>Create a book!</div>
                    <Form>
                        <div>
                            <label name="title">Title</label>
                            <Field 
                            type="text" 
                            name="title" 
                            placeholder='Title' 
                            />
                            {touched.title && errors.title && <span>{errors.title}</span>}
                        </div>
                        <div>
                            <label name="author">Autor</label>
                            <Field
                            type="text" 
                            name="author" 
                            placeholder='Author' 
                            />
                            {touched.author && errors.author && <span>{errors.author}</span>}
                        </div>
                        <div>
                            <label name="categories">Category</label>
                            <FieldArray
                            name="categories" 
                            >
                                {props => {
                                    const {push, form} = props
                                    const {values} = form

                                return (
                                    <select onClick={(e) => {
                                        if(!values.categories.includes(e.target.value) && e.target.value !== "none" && e.target.value !== last) {
                                            push(e.target.value);
                                            setLast(e.target.value)
                                        } else {
                                            setLast("")
                                        }
                                    }
                                    }>
                                        <option value="none">Select category</option>
                                        {catego? catego.map(c => {    
                                        return (
                                            <option value={c.name} name={c.name}>{c.name}</option>
                                        )
                                        }) : null}
                                    </select>
                                )
                                }}
                            </FieldArray>
                        </div>
                        <div>
                            <label name="categories">Categories selected</label>
                            <FieldArray
                            name="categories" 
                            >
                                {props => {
                                    const {form} = props
                                    const {values} = form   
                                return (                         
                                    <div>
                                        {(values.categories.length > 0)? values.categories.map(t => {
                                            return <div><span value={t}>{t}</span><button type="button" value={t} onClick={(e) => 
                                                {   
                                                    let extra = [] 
                                                    for (let element of values.categories) {
                                                        if (element !== e.target.value) {extra.push(element)} 
                                                    }
                                                    values.categories = extra
                                                    
                                                }
                                            
                                            }
                                            >x</button></div>
                                        }) : null} 
                                    </div>
                                )
                                }}
                            </FieldArray>
                        </div>
                        <div>
                            <label name="price">Precio</label>
                            <Field
                            type="number" 
                            name="price" 
                            placeholder='Price' 
                            />
                            {touched.price && errors.price && <span>{errors.price}</span>}
                        </div>
                        <div>
                            <label name="stock">Stock</label>
                            <Field
                            type="number" 
                            name="stock" 
                            placeholder='Stock' 
                            />
                            {touched.stock && errors.stock && <span>{errors.stock}</span>}
                        </div>
                        <div>
                            <label name="description">Descripción</label>
                            <Field
                            type="text" 
                            name="description" 
                            placeholder='Some description?'
                            />
                            {touched.description && errors.description && <span>{errors.description}</span>}
                        </div>
                        <div>
                            <label name="iamge">URL Imágen</label>
                            <Field
                            type="text" 
                            name="image" 
                            placeholder='URL'
                            />
                        </div>
                        <button type="submit">Submit</button>
                        {formSubmit && <span>El formulario ha sido enviado con éxito!</span>}
                    </Form>
                    </>
                )}
            </Formik>
        </>
    )

}