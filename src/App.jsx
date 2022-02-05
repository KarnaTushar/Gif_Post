import './App.css';
import axios from 'axios'
import { useState} from 'react'
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

  //send get request on tenor api 
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

  // checks for errors and pushes from data in local list of submitted posts
  const handlePost = () => {
    console.log(postList)
    if (!post.postMessage || !post.postGif) {
      if (!post.postMessage) {
        alert('enter an message for your post')
      } else if (!post.postGif) {
        alert('select an appropriate gif for your post')
      }
    } else {
      postList.push(post)
    }

    setPostMessgae("")
    setPostGif(null)
    setIsLoading(true)
    setInputValue("")
  }


  //renedrs response gifs
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

  //renders list of created post
  const posts = postList.map(element => (
    <li key={element.id} style={{ listStyleType: "none" }} >
      <div class="max-w-sm m-3 border rounded overflow-hidden shadow-lg">
        <img class="w-full" src={element.postGif} alt="Sunset in the mountains" />
        <div class="px-6 py-4">
          <p class="text-gray-700 text-base">
            {element.postMessage}
          </p>
        </div>
      </div>
    </li>
  ))

  return (
    <>
      <div class="flex items-center bg-indigo-500 text-white text-sm font-bold px-4 py-3" role="alert">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
        <p>To search new gifs, click on cross mark to remove previous results</p>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/3 ml-auto h-12">
          {posts}
        </div>
        <div class="w-1/3 mt-3 mr-auto h-12">
          <div>
            <form class="w-full max-w-sm">
              <div class="flex items-center border-b border-indigo-500 py-2">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setInputValue(e.target.value)} value={inputValue}
                />
                {inputValue ? <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"
                  onClick={() => handleClear()}>
                  <img src={require('./assets/cross.svg').default} />
                </button> : null}
                <button class="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded" type="button"
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
                <div class="flex items-center border-b border-indigo-500 py-2">
                  <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Post URL"
                    onChange={(e) => setPostMessgae(e.target.value)} value={postMessage}
                  />
                </div>
              </form>
              <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold my-3 mx-3 py-2 px-4 border border-blue-700 rounded"
                onClick={() => handlePost()}
              >
                Add
              </button>
              <button class="bg-transparent hover:bg-red-500 text-red-700 ml-2 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
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