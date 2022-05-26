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
                
                if(!valores.title){
                    errors.title = "Por favor introduce un título"
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
                    </div>
                    {/* "Introducir opción para carga de imagen, local o URL */}
                </form>
            )}
        </Formik>
    </>
)

}