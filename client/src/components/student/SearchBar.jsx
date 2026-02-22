import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ data }) => {

  const navigate = useNavigate()

  const [input, setInput] = useState(data ? data : '')

  const onSearchHandler = (e) => {
    e.preventDefault()
    navigate('/course-list/' + input)
  }

  return (
    <form onSubmit={onSearchHandler} className="max-w-xl w-full flex items-center bg-white border border-gray-500/20 rounded overflow-hidden">
      <img className="md:w-auto w-10 px-3" src={assets.search_icon} alt="search_icon" />
      <input 
        onChange={e => setInput(e.target.value)} 
        value={input} 
        type="text" 
        className="w-full h-full outline-none text-gray-500/80 py-3" 
        placeholder="e.g. Binary Search, React hooks, System Design..." 
      />
      <button 
        type='submit' 
        className="bg-forge-signal text-white md:px-10 px-4 py-3 whitespace-nowrap shrink-0">
        Find courses
      </button>
    </form>
  )
}

export default SearchBar