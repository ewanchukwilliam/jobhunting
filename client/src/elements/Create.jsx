import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Create() {
    const [values, setValues] = useState({
        title: '',
        company: '',
        location: '',
        offer: '',
        description: ''
    })

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        axios.post('/add_user', values)
        .then((res)=>{
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }
  return (
    <div class='text-white text-start bg-gray-900 h-screen w-100 bg-green flex flex-col px-20 justify-center items-center bg-rounded'>
        <div class='bg-gray-700 h-full w-full mx-10 flex flex-col items-center'>
            <div class='flex flex-row justify-between items-center w-auto mt-10'>
            		<h3 class="text-6xl px-10">Add application</h3>
                <Link to='/' class='rounded-lg shadow-black bg-green-600 shadow-lg hover:-translate-y-2 transition px-5 py-3 mx-3'>Home</Link>
            </div>
            <form onSubmit={handleSubmit} class="py-2">
                <div class='form-group my-3 flex justify-between items-center'>
                    <label htmlFor='title'>Title</label>
                    <input class="rounded-md my-2 mx-2 bg-gray-600 h-8" type='text' name='title' required onChange={(e)=> setValues({...values, title: e.target.value})} />
                </div>
                <div class='form-group my-3 flex justify-between items-center'>
                    <label htmlFor='company'>Company</label>
                    <input class="rounded-md my-2 mx-2 bg-gray-600 h-8" type='company' name='company' required onChange={(e)=> setValues({...values, company: e.target.value})} />
                </div>
                <div class='form-group my-3 flex justify-between items-center'>
                    <label htmlFor='location'>Location</label>
                    <input class="rounded-md my-2 mx-2 bg-gray-600 h-8" type='text' name='location' required onChange={(e)=> setValues({...values, location: e.target.value})} />
                </div>
                <div class='form-group my-3 flex justify-between items-center'>
                    <label htmlFor='offer'>Offer</label>
                    <input class="rounded-md my-2 mx-2 bg-gray-600 h-8" type='text' name='offer' required onChange={(e)=> setValues({...values, offer: e.target.value})} />
                </div>
                <div class='form-group my-3 flex flex-col justify-between items-center'>
                    <label htmlFor='description'>Description</label>
                    <input class="rounded-md my-2 mx-2 bg-gray-600 h-10 w-60" type='text' name='description' required onChange={(e)=> setValues({...values, description: e.target.value})} />
                </div>
                <div class='form-group my-3 flex flex-col items-center'>
                    <button type='submit' class='rounded-lg shadow-black bg-red-600 shadow-lg hover:-translate-y-2 transition px-5 py-3 mx-3'>Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Create
