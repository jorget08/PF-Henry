import { React, useEffect, useState } from 'react'
import { Formik, Form, Field, FieldArray } from "formik"
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, postBook, putBook } from '../../redux/actions'
import { Link, useHistory, useLocation } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import './styles.css'
import Sidebar from '../AdminDashboard/Sidebar'
export default function FormCreate() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
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

    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setBase({
            ...base,
            [name]: value
        })
        console.log(base)
    }
    useEffect(() => {
        dispatch(getCategories)
    }, [dispatch])

    const redirect = ({ id }) => {
        if (id) {
            history.push(`/book/${id}`)
        }
    }

    var catego = useSelector(state => state.categories)

    return (
        <>
        {user.rols?.name === "admin" ?
        <div className='containerCreate'>
            <Sidebar />
            <h2 className='h1'>Book management</h2>

            <Formik

                initialValues={base}

                validate={(valores) => {

                    let errors = {}

                    if (!valores.title) {
                        errors.title = "Please enter a title"
                    } else if (/^\s/.test(valores.title)) {
                        errors.title = "Cant start whit an empty space"
                    } else if (valores.title.length > 100) {
                        errors.title = "The title cannot exceed 100 characters"
                    }

                    if (!valores.author) {
                        errors.author = "Please enter an author"
                    } else if (valores.author.length > 50) {
                        errors.author = "The author cannot exceed 50 characters"
                    }

                    if (!valores.price) {
                        errors.price = "Please enter a price"
                    } else if (valores.price < 0) {
                        errors.price = "The price cannot be lower than 0"
                    }

                    if (valores.categories.length === 0 && valores.title && valores.author) {
                        errors.categories = "Must chose at least one category"
                    }

                    if (valores.stock < 0) {
                        errors.stock = "The stock cannot be lower than 0"
                    }

                    if (valores.description.length > 5000) {
                        errors.description = "Up to 5000 characters only"
                    }

                    return errors

                }}

                onSubmit={(valores, { resetForm }) => {
                    if (valores.image === "") {
                        valores.image = 'https://us.123rf.com/450wm/urric/urric1810/urric181000005/118555840-libro-marr%C3%B3n-sobre-fondo-blanco.jpg?ver=6'
                    }
                    (detail.id !== undefined) ? dispatch(putBook(valores, detail.id)) : dispatch(postBook(valores))
                    resetForm()
                    setFormSubmit(true)
                    setTimeout(() => setFormSubmit(false), "2000")
                    setTimeout(() => redirect(detail), "2000")
                }}
            >
                {({ errors, touched }) => (
                    <div className='formContainer'>
                        <Form>
                            <div className='formInfo'>
                                <h2 style={{ textAlign: "center", fontWeight: "800" }}>{(detail.id !== undefined ? "Modify the book" : "Create a book")}</h2>

                                <div className='field'>
                                    <label name="title">Title</label>
                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder='Title'
                                    />
                                    {touched.title && errors.title && <span className='errorMsg'>{errors.title}</span>}
                                </div>
                                <div className='field'>
                                    <label name="author">Author</label>
                                    <Field
                                        type="text"
                                        name="author"
                                        placeholder='Author'

                                    />
                                    {touched.author && errors.author && <span className='errorMsg'>{errors.author}</span>}
                                </div>
                                <div className='field'>
                                    <label name="categories">Category</label>
                                    <FieldArray
                                        name="categories"
                                    >
                                        {props => {
                                            const { push, form } = props
                                            const { values } = form

                                            return (
                                                <select onClick={(e) => {
                                                    if (!values.categories.includes(e.target.value) && e.target.value !== "none" && e.target.value !== last) {
                                                        push(e.target.value);
                                                        setLast(e.target.value)
                                                    } else {
                                                        setLast("")
                                                    }
                                                }
                                                }>
                                                    {touched.categories && errors.categories && <span className='errorMsg'>{errors.categories}</span>}
                                                    <option value="none">Select category</option>
                                                    {catego && catego.map(c => {
                                                        return (
                                                            <option value={c.name} name={c.name}>{c.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            )
                                        }}
                                    </FieldArray>
                                </div>
                                <div className='field categoriesSelected'>
                                    <FieldArray
                                        name="categories"
                                    >
                                        {props => {
                                            const { form } = props
                                            const { values } = form
                                            return (
                                                <div >
                                                    {(values.categories.length > 0) && <label name="categories">Categories selected:</label>}

                                                    {(values.categories.length > 0) && values.categories.map((t, i) => {
                                                        return <div key={t} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderTop: i > 0 ? '1px solid gray' : '', padding: '5px 0 10px 0', fontSize: '15px' }}><span style={{ marginRight: '10px' }} value={t}>{t}</span><button type="button" value={t} onClick={(e) => {
                                                            let extra = []
                                                            for (let element of values.categories) {
                                                                if (element !== e.target.value) { extra.push(element) }
                                                            }
                                                            values.categories = extra
                                                            setBoolean(!boolean)
                                                        }

                                                        }
                                                        >x</button></div>
                                                    })}
                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>
                                <div className='field'>
                                    <label name="price">Price</label>
                                    <Field
                                        type="number"
                                        name="price"
                                        placeholder='Price'
                                        min="1"

                                    />
                                    {touched.price && errors.price && <span className='errorMsg'>{errors.price}</span>}
                                </div>
                                <div className='field'>
                                    <label name="stock">Stock</label>
                                    <Field
                                        type="number"
                                        name="stock"
                                        placeholder='Stock'
                                        min="1"

                                    />
                                    {touched.stock && errors.stock && <span className='errorMsg'>{errors.stock}</span>}
                                </div>
                                <div className='field'>
                                    <label name="iamge">Image URL</label>
                                    <Field
                                        type="text"
                                        name="image"
                                        placeholder='URL'
                                    />
                                </div>
                                <div className='description'>
                                    <label name="description">Summary</label>
                                    <Field
                                        type="text"
                                        name="description"
                                        placeholder='Some description?'
                                        className="description"
                                        as="textarea"

                                    />
                                    {touched.description && errors.description && <span className='errorMsg'>{errors.description}</span>}
                                </div>
                                {(detail.id !== undefined) ? <button type="submit">Modify!</button> : <button type="submit">Create!</button>}
                                {formSubmit && <span>Action successfully complete!</span>}
                            </div>
                        </Form >
                    </div >
                )
                }
            </Formik >
            {
                detail.id !== undefined &&
                <div className='pastInfo'>

                    <h1>See how It Was Before</h1>

                    <div className='container'>
                        {console.log(detail.id)}
                        <div>
                            <div className='container__info'>
                                <div className='image'>
                                    <img src={base.image} alt="" />
                                </div>
                                <div className='info'>
                                    <h1>{base.title}</h1>
                                    <div className=''>
                                        <p>Author: <strong>{base.author}</strong></p>
                                        <p>{base.description}</p>
                                        <p>Literary Genres:</p>
                                        <ul className='genres'>
                                            {base.categories?.map(e => {
                                                return (
                                                    <li className='genre'>{e}</li>
                                                )
                                            })}

                                        </ul>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >:
        <div className="aviso">
        <h2>You don't have access here, please go back home</h2>
        <Link to={`/home`}>
        <button className='minimize'>Back home</button>
        </Link>
        </div>}
        </>)

}