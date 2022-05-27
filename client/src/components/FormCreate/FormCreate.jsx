import {React, useState} from 'react'
import {Formik, Form, Field} from "formik"

export default function FormCreate() {
    
    var [formSubmit, setFormSubmit] = useState(false)

    return (
        <>
            <Formik

                // {title, author, description, stock, image, price, categories => array} = req.body

                initialValues={{
                    title: "",
                    author: "",
                    categories: [],
                    price: "",
                    description: "",
                    image: ""
                }}
                
                validate={(valores) => {

                    let errors = {}

                    if(!valores.title) {
                        errors.title = "Por favor introduce un título"
                    } else if(valores.title.length > 100) {
                        errors.title = "El título no puede exceder los 100 caracteres"
                    }

                    if(!valores.author) {
                        errors.author = "Por favor introduce un autor"
                    } else if(valores.author.length > 50) {
                        errors.author = "El nombre del autor no puede exceder los 100 caracteres"
                    } else if((/\W/).test(valores.title)) {
                        errors.author = "El nombre del autor no puede poseer caracteres especiales"
                    }

                    if(!valores.price) {
                        errors.price = "Por favor introducir el precio"
                    } else if(valores.price < 0) {
                        errors.price = "El precio no puede ser inferior a 0 (cero)"
                    }

                    if(valores.stock < 0) {
                        errors.stock = "El stock no puede ser negativo"
                    }

                    if(valores.description.length > 1000) {
                        errors.description = "La longitud de la descripción no puede superar los 1000 caracteres"
                    }

                    return errors

                }}

                onSubmit={(valores, {resetForm}) => {
                    resetForm()
                    console.log("prueba")
                    console.log(valores)
                    setFormSubmit(true)
                    setTimeout(() => setFormSubmit(false), "3000")
                }}
            >
                {( {errors, touched} ) => (
                    <>
                    <div>Agrega un libro!</div>
                    <Form>
                        <div>
                            <label name="title">Título</label>
                            <Field 
                            type="text" 
                            name="title" 
                            placeholder='Título' 
                            />
                            {touched.title && errors.title && <span>{errors.title}</span>}
                        </div>
                        <div>
                            <label name="author">Autor</label>
                            <Field
                            type="text" 
                            name="author" 
                            placeholder='Autor' 
                            />
                            {touched.author && errors.author && <span>{errors.author}</span>}
                        </div>
                        <div>
                            <label name="categories">Categorías</label>
                            <Field 
                            name="categories" 
                            as="select">
                                <option value="opcion">Opcion</option>
                                <option value="opcion">Opcio</option>
                            </Field>
                        </div>
                        <div>
                            <label name="price">Precio</label>
                            <Field
                            type="number" 
                            name="price" 
                            placeholder='Indica el precio' 
                            />
                            {touched.price && errors.price && <span>{errors.price}</span>}
                        </div>
                        <div>
                            <label name="stock">Stock</label>
                            <Field
                            type="number" 
                            name="stock" 
                            placeholder='Indica el precio' 
                            />
                            {touched.stock && errors.stock && <span>{errors.stock}</span>}
                        </div>
                        <div>
                            <label name="description">Descripción</label>
                            <Field
                            type="text" 
                            name="description" 
                            placeholder='Añádele alguna descripción'
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