import React from 'react'
import {Formik} from "formik"

export default function FormCreate() {

return (
    <>
        <Formik

            initialValues={{
                title: "",
                author: "",
                price: "",
                review: "",
                description: "",
            }}

            validate={(valores) => {

                let errors = {}
                
                if(!valores.title) {
                    errors.title = "Por favor introduce un título"
                } else if(valores.title.length > 100) {
                    errors.title = "El título no puede exceder los 100 caracteres"
                } else if(!/^[A-Za-z0-9_-]$/.test(valores.title)) {
                    errors.title = "El título no puede poseer caracteres especiales"
                }

                if(!valores.author) {
                    errors.author = "Por favor introduce un autor"
                } else if(valores.author.length > 50) {
                    errors.title = "El nombre del autor no puede exceder los 100 caracteres"
                } else if(!/^[A-Za-z0-9_-]$/.test(valores.author)) {
                    errors.title = "El nombre del autor no puede poseer caracteres especiales"
                }

                if(!valores.price) {
                    errors.price = "Por favor introducir el precio"
                } else if(valores.price < 0) {
                    errors.title = "El precio no puede ser inferior a 0 (cero)"
                } else if(!/^[0-9]$/.test(valores.price)) {
                    errors.title = "Este campo no puede tener caracteres especiales"
                }

                if(!valores.review) {
                    errors.review = "Por favor introduce una reseña"
                } else if(valores.review.length > 300) {
                    errors.review = "La longitud de la reseña no puede superar los 300 caracteres"
                }

                if(valores.description.length > 1000) {
                    errors.review = "La longitud de la reseña no puede superar los 1000 caracteres"
                }

                return errors

            }}

            onSubmit={(valores) => {
                console.log("prueba")
                console.log(valores)
            }}
        >
            {( {values, errors, handleSubmit, handleChange, handleBlur} ) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label name="title"></label>
                        <input 
                        type="text" 
                        name="title" 
                        placeholder='Título' 
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.title && <span>{errors.title}</span>}
                    </div>
                    <div>
                        <label name="author"></label>
                        <input 
                        type="text" 
                        name="author" 
                        placeholder='Autor' 
                        value={values.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.author && <span>{errors.author}</span>}
                    </div>
                    {/* "Introducir select desplegable para seleccionar categoría" */}
                    <div>
                        <label name="price"></label>
                        <input 
                        type="number" 
                        name="price" 
                        placeholder='Indica el precio' 
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.price && <span>{errors.price}</span>}
                    </div>
                    <div>
                        <label name="review"></label>
                        <input 
                        type="text" 
                        name="review" 
                        placeholder='Una breve reseña' 
                        value={values.review}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.review && <span>{errors.review}</span>}
                    </div>
                    <div>
                        <label name="description"></label>
                        <input 
                        type="text" 
                        name="description" 
                        placeholder='Añádele alguna descripción' 
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.description && <span>{errors.description}</span>}
                    </div>
                    {/* "Introducir opción para carga de imagen, local o URL */}
                </form>
            )}
        </Formik>
    </>
)

}