import React, {useState} from 'react';
import { Link } from 'react-scroll';
import NavBar from '../NavBar/NavBar';
import { Formik, Form, Field } from 'formik'
import './support.css'

export default function Support() {
    
    var [render, setRender] = useState({
        Home: false,
        WorkTeam: false,
        Networks: false,
        Advertising: false,
        Write: false
    })

    const handleClick = (e, bool) => {
        e.preventDefault();
        if (bool) setRender({...render, [e.target.id]: true})
        else setRender({...render, [e.target.id]: !render[e.target.id]})
    }

    const handleMinimize = () => {
        setRender({
        Home: false,
        WorkTeam: false,
        Networks: false,
        Advertising: false,
        Write: false})
    }

    return (
        <>
        <NavBar />
        <div className="formContainer">
            <ul style={{display: 'column', listStyle: 'none', justifyContent: 'space-around'}}>
                <li><Link smooth="true" to="Home" id="Home" onClick={(e) => handleClick(e, true)}>What is BookStore?</Link></li>
                <li><Link smooth="true" to="WorkTeam" id="WorkTeam" onClick={(e) => handleClick(e, true)}>Team Work</Link></li>
                <li><Link smooth="true" to="Networks" id="Networks" onClick={(e) => handleClick(e, true)}>Networks</Link></li>
                <li><Link smooth="true" to="Advertising" id="Advertising" onClick={(e) => handleClick(e, true)}>Advertising</Link></li>
                <li><Link smooth="true" to="Write" id="Write" onClick={(e) => handleClick(e, true)}>Write us!</Link></li>
            </ul>
        </div>
        <div>
            <h1 id="Home" onClick={(e) => handleClick(e)}>What is BookStore?</h1>
            {
            render.Home && <p> 
                BookStore is a online retailer of all kind of books. In our store 
                you can find novels, sciencie fiction, humor, academic, and all the categories you can imagine. <br /><br />
                We have titles like Will, 12 Rules of life, A line to kill, with authors like Stephen King,
                Yuval Noah Harari and Jordan B. Peterson. You must see our store, click here to go there!.
            </p>}
        </div>
        <div>
            <h1 id="WorkTeam" onClick={(e) => handleClick(e)}>Can you tell me about the work team behind?</h1>
            {
            render.WorkTeam && <p>
                Of course! We are students at Henry's bootcamp. We are studying to be Full Stack Web Developers, by the moment
                you can see us like juniors web page developers. As you can see, our web is awsome.
                <br /> 
                The team is:<br /><br />
                 <li>Christian Cordoba</li><br />
                 <li>Alvaro Cordoba</li><br />
                 <li>Federico Garcia</li><br />
                 <li>Camila Castillo</li><br />
                 <li>Gaston Cajal Skaf</li><br />
                 <li>Ignacion Burgos</li><br />
                 <li>Jorge Torres</li><br />
                 <li>Gonzalo Rumi</li><br />
            </p>}
        </div>
        <div>
            <h1 id="Networks" onClick={(e) => handleClick(e)}>Any social network to follow you?</h1>
            {
            render.Networks && <p>
                Yes! You can follow us on Facebook (bookStore), Instagram (@bookstore) and LinkedIn (bookstore).
                Every day we upload content about our store, new books, new coleccions and more! 
            </p>}
        </div>
        <div>
            <h1 id="Advertising" onClick={(e) => handleClick(e)}>Do you sell advertising on your site?</h1>
            {
            render.Advertising && <p> 
                By the moment we only focus on offers you the most complete coleccion of books! Maybe later. If you want to 
                buy some space in out page to put your advertising there, you contact us at the end of this section, by sending
                an email whit your offer. We will consider the option and we will contact you in case of accept the offer.
            </p>}
        </div>
        <div>
            <h1 id="Write" onClick={(e) => handleClick(e)}>How can i do to contact you directly?</h1>
            {
            render.Write && 
            <div>
                <p> 
                    Down below you have the option to send us an email, and we will response you quickly. You can 
                    answer what ever you want. In spite of that, the best way is being a member of our community, 
                    we can follow all your request closer. If you are not register in our page yet, 
                    we recomends you to do it now clicking here.
                </p>
                <h2>Write us!</h2>
                    <Formik
                    initialValues={{
                        name: "",
                        email : "",
                    }}
                    validate={(valores) => {

                        let errors = {};

                        if (!valores.email) {
                        errors.email = 'Email has been required!';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valores.email)) {
                        errors.email = 'Invalid email address';
                        }
                        if(!valores.name){
                        errors.password = 'Name has been required!'
                        }

                        if(!valores.content){
                            errors.content = 'At least your question must be longer than 100 characters!'
                            }
                        return errors;
                    }}

                    onSubmit={(valores, {resetForm}) => {
                        console.log("valores", valores)
                        resetForm()
                    }}>
                        
                        {({touched, errors}) => (
                        
                        <Form> 

                            <label>Email</label>                  
                            <Field type="text" name="email" placeholder="Email"/>
                            {touched.email && errors.email && <span>{errors.email}</span>}

                            <label>Name</label>                  
                            <Field type="text" name="name" placeholder="Name"/>
                            {touched.name && errors.name && <span>{errors.name}</span>}

                            <Field type="text" name="content" placeholder="Write your question here!"/>
                            {touched.content && errors.content && <span>{errors.content}</span>}

                            <button type="submit">Send!</button>

                        </Form>
                        )}

                    </Formik>
            </div>
            }
        </div>
        <button type="button" onClick={(e) => handleMinimize()}>Minimize all tags</button>
        </>
    )
}