import {React, useEffect, useState} from 'react'
import {Formik, Form, Field, FieldArray} from "formik"
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, postBook, putBook } from '../../redux/actions'
import { Link, useHistory, useLocation } from 'react-router-dom'

export default function FormCreate() {
    
    const dispatch = useDispatch()
    var [formSubmit, setFormSubmit] = useState(false)
    var [last, setLast] = useState("")
    var [boolean, setBoolean] = useState(true)

    const history = useHistory()
    
    const location = useLocation()
    
    if (location.state === undefined) {
        var detail = {
            title: "", 
            author: "",
            categories: [],
            price: 0,
            stock: 0,
            description: "",
            image: ""
        }
    } else { 
        var { detail } = location.state
    }   

    var catDetail = [...detail.categories.map(c => c.name)]

    var [base, setBase] = useState({
        title: detail.title,
        author: detail.author,
        categories: catDetail,
        price: detail.price,
        stock: detail.stock,
        description: detail.description,
        image: detail.image
    })
    
    useEffect(() => {
        dispatch(getCategories)
    }, [dispatch])

    const redirect = ({id}) => {
        if (id) {
            history.push(`/book/${id}`)
        } 
        // si se quiere que despues de creado un book vuelva solo a home despues de 2 segundos, descomentar las siguientes tres lineas.
        // else {
        //     history.push(`/home`)
        // }
    }

    var catego = useSelector(state => state.categories)

    return (
        <>  
            {(detail.id !== undefined)? <h2>Modify the book!</h2> : <h2>Create a book!</h2>} 
            <Link to='/home'>
                <button type="button">Back to Home</button>
            </Link>
            <Formik

                initialValues={base}
                
                validate={(valores) => {

                    let errors = {}

                    if(!valores.title) {
                        errors.title = "Please enter a title"
                    } else if(/^\s/.test(valores.title)) {
                        errors.title = "Cant start whit an empty space"
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

                    if(valores.categories.length === 0 && valores.title && valores.author) {
                        errors.categories = "Must chose at least one category"
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
                    (detail.id !== undefined)? dispatch(putBook(valores, detail.id)) : dispatch(postBook(valores))
                    resetForm()
                    setFormSubmit(true)
                    setTimeout(() => setFormSubmit(false), "2000")
                    setTimeout(() => redirect(detail), "2000")            
                }}
            >
                {( {errors, touched} ) => (
                    <>
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
                                                    setBoolean(!boolean)
                                                }
                                            
                                            }
                                            >x</button></div>
                                        }) : null} 
                                    </div>
                                )
                                }}
                            </FieldArray>
                            {touched.categories && errors.categories && <span>{errors.categories}</span>}
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
                        {(detail.id !== undefined)? <button type="submit">Modify!</button> : <button type="submit">Create!</button>} 
                        {formSubmit && <span>Action successfully complete!</span>}
                    </Form>
                    </>
                )}
            </Formik>
        </>
    )

}