import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

const URL = 'https://g.tenor.com/v1/search'
const api_key = 'SOJY153QSH6V'
const responseGifData = []
const postList = []

function App() {
  const [inputValue, setInputValue] = useState("")
  const [postMessage, setPostMessgae] = useState("")
  const [postGif, setPostGif] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const post = {
    postMessage: postMessage,
    postGif: postGif,
    id: uuid()
  }

  const getGiifs = async () => {
    await axios.get(URL, {
      params: {
        q: inputValue,
        key: api_key
      }
    })
      .then(res => {
        responseGifData.push(...res.data.results)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  const handleSearch = () => {
    if (!inputValue) {
      alert('invalid search')
    } else {
      getGiifs()
    }
  }

  const handleClear = () => {
    responseGifData.length = 0
    setIsLoading(true)
    setInputValue("")
  }

  const handelCancel = () => {
    responseGifData.length = 0
    setIsLoading(true)
    setInputValue("")
    setPostGif("")
  }

  const handlePost = () => {
    console.log(postList)
    if (!post.postMessage || !post.postGif) {
      if (!post.postMessage) {
        alert('post message')
      } else if (!post.postGif) {
        alert('post url')
      }
    } else {
      postList.push(post)
    }

    setPostMessgae("")
    setPostGif(null)
    setIsLoading(true)
    setInputValue("")
  }

  const images = responseGifData.map(element => (
    <li key={element.id} onClick={() => {
      setPostGif(element.media[0].tinygif.url)
      responseGifData.length = 0
    }}
      style={{ listStyleType: "none" }}
    >
      <img style={{ height: 120, width: 120 }} alt="gifs" src={element.media[0].tinygif.url} />
    </li>
  ))

  const posts = postList.map(element => (
    <li key={element.id} style={{ listStyleType: "none" }} >
      <div class="max-w-sm m-3 rounded overflow-hidden shadow-lg">
        <img class="w-full" src={element.postGif} alt="Sunset in the mountains" />
        <div class="px-6 py-4">
          <p class="text-gray-700 text-base">
            {element.postMessage}
          </p>
        </div>
      </div>
    </li>
  ))

  useEffect(() => {
    console.log('refreshed')
    console.log(uuid())
  }, [])

  return (
    <>
      <div class="flex flex-wrap">
        <div class="w-1/3 ml-auto h-12">
          {posts}
        </div>
        <div class="w-1/3 mt-3 mr-auto h-12">
          <div>
            <form class="w-full max-w-sm">
              <div class="flex items-center border-b border-teal-500 py-2">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setInputValue(e.target.value)} value={inputValue}
                />
                {inputValue ? <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"
                  onClick={() => handleClear()}>
                  Clear
                </button> : null}
                <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button"
                  onClick={() => handleSearch()}
                >
                  Search
                </button>
              </div>
            </form>
            <div class="flex flex-wrap -mb-4">
              {images}
            </div>
            <div class="mt-4">
              <img alt="selectedGif" style={{ height: 120, width: 120, display: postGif ? "" : "none" }} src={postGif} />
            </div>
            <div>
              <form class="w-full max-w-sm">
                <div class="flex items-center border-b border-teal-500 py-2">
                  <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Post URL"
                    onChange={(e) => setPostMessgae(e.target.value)} value={postMessage}
                  />
                </div>
              </form>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold my-3 mx-3 py-2 px-4 border border-blue-700 rounded"
                onClick={() => handlePost()}
              >
                Add
              </button>
              <button class="bg-transparent hover:bg-blue-500 text-blue-700 ml-2 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => handelCancel()}
              >
                Cancel
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;