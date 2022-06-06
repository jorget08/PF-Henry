import React, { useRef, useState } from 'react';
import { Link } from 'react-scroll';
import NavBar from '../NavBar/NavBar';
import { Formik, Form, Field } from 'formik'
import './support.css'
import { scrollToTop } from 'react-scroll/modules/mixins/animate-scroll';
import { postSupport } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Footer from '../Footer/Footer';

export default function Support() {

    const dispatch = useDispatch()

    const scroll0 = useRef()
    const scroll1 = useRef()
    const scroll2 = useRef()
    const scroll3 = useRef()
    const scroll4 = useRef()
    const scroll5 = useRef()

    var [render, setRender] = useState({
        Home: false,
        WorkTeam: false,
        Networks: false,
        Advertising: false,
        Write: false,
        Payment: false
    })

    const handleClick = (e, bool) => {
        e.preventDefault();
        if (bool) setRender({ ...render, [e.target.id]: true })
        else setRender({ ...render, [e.target.id]: !render[e.target.id] })
    }

    const handleMinimize = (e) => {
        e.preventDefault()
        setRender({
            Home: false,
            WorkTeam: false,
            Networks: false,
            Advertising: false,
            Write: false,
            Payment: false
        })
    }

    return (
        <>
            <NavBar />
            <div className="options">
                <ul style={{ display: 'column', listStyle: 'none', justifyContent: 'space-around' }}>
                    <h3 className='minitag'><Link id="Home" onClick={(e) => { scroll0.current.scrollIntoView({ behavior: "smooth" }); handleClick(e, true) }}>- What is BookStore?</Link></h3>
                    <h3 className='minitag'><Link id="WorkTeam" onClick={(e) => { scroll1.current.scrollIntoView({ behavior: "smooth" }); handleClick(e, true) }}>- Team Work</Link></h3>
                    <h3 className='minitag'><Link id="Networks" onClick={(e) => { scroll2.current.scrollIntoView({ behavior: "smooth" }); handleClick(e, true) }}>- Networks</Link></h3>
                    <h3 className='minitag'><Link id="Payment" onClick={(e) => { scroll3.current.scrollIntoView({ behavior: "smooth" }); handleClick(e, true) }}>- Payment metods</Link></h3>
                    <h3 className='minitag'><Link id="Advertising" onClick={(e) => { scroll4.current.scrollIntoView({ behavior: "smooth" }); handleClick(e, true) }}>- Advertising</Link></h3>
                    <h3 className='minitag'><Link id="Write" onClick={(e) => { scroll5.current.scrollIntoView({ behavior: "smooth" }); handleClick(e, true) }}>- Write us!</Link></h3>
                </ul>
            </div>
            <div className="formContainer">
                <div className="conttext">
                    <h1 ref={scroll0} id="Home" onClick={(e) => handleClick(e)}>What is BookStore?</h1>
                    {
                        render.Home && <p className='text'>
                            BookStore is a online retailer of all kind of books. In our store
                            you can find novels, sciencie fiction, humor, academic, and all the categories you can imagine. <br /><br />
                            We have titles like Will, 12 Rules of life, A line to kill, with authors like Stephen King,
                            Yuval Noah Harari and Jordan B. Peterson. You must see our store, click here to go there!.
                            <br /><br />
                        </p>
                    }

                </div>
                <div className="conttext">
                    <h1 ref={scroll1} id="WorkTeam" onClick={(e) => handleClick(e)}>Can you tell me about the work team behind?</h1>
                    {
                        render.WorkTeam && <p className='text'>
                            Of course! We are students at Henry's bootcamp. We are studying to be Full Stack Web Developers, by the moment
                            you can see us like juniors web page developers. As you can see, our web is awsome.
                            <br /><br />
                            The team is:<br /><br />
                            <li>Christian Cordoba</li><br />
                            <li>Alvaro Cordoba</li><br />
                            <li>Federico Garcia</li><br />
                            <li>Camila Castillo</li><br />
                            <li>Gaston Cajal Skaf</li><br />
                            <li>Ignacion Burgos</li><br />
                            <li>Jorge Torres</li><br />
                            <li>Gonzalo Rumi</li><br />
                            <br />
                        </p>}

                </div>
                <div className="conttext">
                    <h1 ref={scroll2} id="Networks" onClick={(e) => handleClick(e)}>Any social network to follow you?</h1>
                    {
                        render.Networks && <p className='text'>
                            Yes! You can follow us on Facebook (bookStore), Instagram (@bookstore) and LinkedIn (bookstore).
                            Every day we upload content about our store, new books, new coleccions and more!
                            <br /><br />
                        </p>}

                </div>
                <div className="conttext">
                    <h1 ref={scroll3} id="Payment" onClick={(e) => handleClick(e)}>Which are the payment metods availables?</h1>
                    {
                        render.Payment && <p className='text'>
                            You can pay through PayPal. At this moment, we are developing a
                            new feature that will allow to our users to pay whit cryptocurrency!
                            <br /><br />
                        </p>}
                </div>
                <div className="conttext">
                    <h1 ref={scroll4} id="Advertising" onClick={(e) => handleClick(e)}>Do you sell advertising on your site?</h1>
                    {
                        render.Advertising && <p className='text'>
                            By the moment we only focus on offers you the most complete coleccion of books! Maybe later. If you want to
                            buy some space in our page to put your advertising there, you contact us at the end of this section, by sending
                            an email whit your offer. We will consider the option and we will contact you in case of accept it.
                            <br /><br />
                        </p>}
                </div>
                <div className="conttext">
                    <h1 ref={scroll5} id="Write" onClick={(e) => handleClick(e)}>How can i do to contact you directly?</h1>
                    {
                        render.Write &&
                        <div>
                            <p className='text'>
                                Down below you have the option to send us an email, and we will response you quickly. You can
                                ask what ever you want. In spite of that, the best way to clean all your doubts is being a
                                member of our community, we can follow all your request closer. If you are not register
                                in our page yet, we recomends you to do it now clicking here.
                            </p>
                            <h2>Write us!</h2>
                            <Formik
                                initialValues={{
                                    name: "",
                                    email: "",
                                    comment: ""
                                }}
                                validate={(valores) => {

                                    let errors = {};

                                    if (!valores.email) {
                                        errors.email = 'Email has been required!';
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valores.email)) {
                                        errors.email = 'Invalid email address';
                                    }
                                    if (!valores.name) {
                                        errors.password = 'Name has been required!'
                                    }

                                    if (!valores.comment) {
                                        errors.comment = 'At least your question must be longer than 100 characters!'
                                    }
                                    return errors;

                                }}

                                onSubmit={(valores, { resetForm }) => {
                                    dispatch(postSupport(valores))
                                    alert("Query sent!")
                                    resetForm()
                                }}>

                                {({ touched, errors }) => (
                                    <div className='formContainer'>
                                        <Form>
                                            <div className='formInfo'>
                                                <div className='description'>
                                                    <label>Name </label>
                                                    <Field type="text" name="name" placeholder="Name" />
                                                    {touched.name && errors.name && <span>{errors.name}</span>}
                                                </div>
                                                <div className='description'>
                                                    <label>Email </label>
                                                    <Field type="text" name="email" placeholder="Email" />
                                                    {touched.email && errors.email && <span>{errors.email}</span>}
                                                </div>
                                                <div className='description'>
                                                    <label>What you want to tell us?</label>
                                                    <Field type="text" name="comment" className="description" as="textarea" placeholder="Write your question here!" />
                                                    {touched.comment && errors.comment && <span>{errors.comment}</span>}
                                                </div>
                                                <button type="submit">Send!</button>

                                            </div>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    }
                </div>
                <div className='descriptionS'>
                    <button type="button" className="minimize" onClick={(e) => { handleMinimize(e) }}>Minimize all tags</button>
                </div>
            </div>
            <Footer />
        </>
    )
}