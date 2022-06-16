import { React, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './styles.css'
import { getCategories, getDetail, postBook, putBook } from '../../../redux/actions'

export default function EditBook() {

    const dispatch = useDispatch()
    const bookEditDetail = useSelector(state => state.detail)
    var [formSubmit, setFormSubmit] = useState(false)
    var [boolean, setBoolean] = useState(false)
    var catego = useSelector(state => state.categories)

    var [formul, setForm] = useState({ bookEditDetail })

    useEffect(() => {
        dispatch(getCategories)
        if (bookEditDetail) setForm(bookEditDetail)
    }, [bookEditDetail])

    var [errors, setErrors] = useState({
        title: "",
        author: "",
        price: "",
        stock: "",
        categories: "",
        description: ""
    })

    const handleChangeFormul = (e) => {
        e.preventDefault();
        setForm({
            ...formul,
            [e.target.name]: e.target.value,
        })

        if (!e.target.value && e.target.name !== "categorie") {
            setErrors({ ...errors, [e.target.name]: `Please enter a ${e.target.name}` })
        } else {
            setErrors({ ...errors, [e.target.name]: "" })
        }

        if (e.target.name === "price" || e.target.name === "stock") {
            if (e.target.value < 0) setErrors({ ...errors, [e.target.name]: `The ${e.target.name} cant be lower than 0!` })
            else if ((/\W/).test(e.target.value)) setErrors({ ...errors, [e.target.name]: `Only positive integers!` })
            else setErrors({ ...errors, [e.target.name]: "" })
        }

    }

    function handleTypeSelect(e) {
        var newy = formul.categories.map((c) => { if (c.name) { return c.name } else { return c } })
        console.log(newy)
        setForm({ ...formul, categories: [...newy, e.target.value] })
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(formul);
        setForm({ ...formul, categories: formul.categories.map(c => c.name) })
        dispatch(putBook(formul, formul.id))
        setFormSubmit(true)
        setTimeout(() => setFormSubmit(false), "2000")
        window.location.reload()
    }

    var validate = true

    if (errors.title === "" &&
        errors.author === "" &&
        errors.price === "" &&
        errors.stock === "" &&
        errors.categories === "" &&
        errors.description === "" &&
        formul.title !== ""
    ) { validate = false }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div className='image' style={{ margin: 'auto 40px auto 20px  ' }}>
                <img src={formul.image} alt="" />
            </div>
            <div className='formContainer formModalContainer'>


                <h1 style={{ textAlign: 'center' }}>Edit Book</h1>
                <form className='formInfo formInfoContainer' >
                    <div className='field'>
                        <label name="title">Title</label>
                        <input onChange={(e) => { handleChangeFormul(e) }} type="text" value={formul.title} name="title"></input>
                        {errors.title && <span className='errorMsg'>{errors.title}</span>}
                    </div>

                    <div className='field'>
                        <label name="author">Author</label>
                        <input onChange={(e) => { handleChangeFormul(e) }} type="text" value={formul.author} name="author"></input>
                        {errors.author && <span className='errorMsg'>{errors.author}</span>}
                    </div>

                    <div className="field">
                        <label className="label">Select type:</label>
                        <select onChange={(e) => { handleTypeSelect(e) }}>
                            <option value="categories">None</option>
                            {catego ? catego.map(t => {
                                return (
                                    <option value={t.name} name="categories" key={t.id}>{t.name}</option>
                                )
                            }) : null
                            }
                        </select>
                    </div>
                    <div className='field categoriesSelected' style={{ display: 'flex', flexDirection: 'column' }}>
                        {formul.categories && <label name="categories">Categories selected:</label>}
                        {formul.categories ? formul.categories.map((t, i) => {
                            return (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderTop: i > 0 ? '1px solid gray' : '', padding: '5px 0 10px 0', fontSize: '15px' }}>
                                    <span style={{ marginRight: '10px' }} value={t.name} name="categories" >{t.name ? t.name : t}</span><button type="button" value={t} onClick={(e) => {
                                        let extra = []
                                        for (let element of formul.categories) {
                                            if (element !== e.target.value) { extra.push(element) }
                                        }
                                        formul.categories = extra
                                        setBoolean(!boolean)
                                    }
                                    }
                                    >x</button>
                                </div>
                            )
                        }) : null}
                        {errors.categories && <span className="error">{errors.categories}</span>}
                    </div>

                    <div className='field'>
                        <label name="price">Price</label>
                        <input onChange={(e) => { handleChangeFormul(e) }} type="number" value={formul.price} name="price"></input>
                        {errors.price && <span className='errorMsg'>{errors.price}</span>}
                    </div>

                    <div className='field'>
                        <label name="stock">Stock</label>
                        <input onChange={(e) => { handleChangeFormul(e) }} type="number" value={formul.stock} name="stock"></input>
                        {errors.stock && <span className='errorMsg'>{errors.stock}</span>}
                    </div>

                    <div className='field'>
                        <label name="description">Description</label>
                        <input onChange={(e) => { handleChangeFormul(e) }} type="text" value={formul.description} name="description"></input>
                        {errors.description && <span className='errorMsg'>{errors.description}</span>}
                    </div>

                    <div className='field'>
                        <label name="image">Image URL</label>
                        <input onChange={(e) => { handleChangeFormul(e) }} type="text" value={formul.image} name="image"></input>
                        {errors.image && <span className='errorMsg'>{errors.image}</span>}
                    </div>

                    <button type="submit" disabled={validate} onClick={(e) => onSubmit(e)}>Modify!</button>
                    {formSubmit && <span>Action successfully complete!</span>}
                </form>
            </div>
        </div>
    )
}