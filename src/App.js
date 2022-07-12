import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('')
  const [favorite, setFavorite] = useState([])
  const [myQuote, setMyQuote] = useState('')
  const [myQuoteList, setMyQuoteList] = useState([])

  // handle to get data from api
  const fetchQuote = async () => {
    const url = 'https://api.kanye.rest/'
    const res = await fetch(url)
    const result = await res.json()
    setQuote(result.quote)
  }

  // handle click to generate data
  const getQuote = () => {
    fetchQuote()
  }

  // handle click to add quote to favorite
  const addFavorite = () => {
    let isExist = favorite.some(item => item === quote)
    if (!isExist) {
      setFavorite([...favorite, quote])
    } else {
      alert('quote already exist')
    }
  }

  // handle to submit quote
  const submitQuote = (e) => {
    e.preventDefault()
    let isExistQuote = myQuoteList.some(item => item === myQuote)
    if (!isExistQuote) {
      setMyQuoteList([...myQuoteList, myQuote])
      setMyQuote('')
    } else {
      alert('quote already exist')
    }
  }

  // life cycle hit api when first rendering
  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="App">
      <img src="https://images.businessoffashion.com/profiles/asset/1797/43897e2e4a6d155d72dd9df352017b546ef9e229.jpeg" alt="" style={{ width: 300 }} />
      <h1 style={{ fontSize: 40, marginTop: 10 }}>Kanye-West Quote</h1>
      <h3>{quote}</h3>
      <button onClick={getQuote}>Get Quote</button>
      <button onClick={addFavorite}>Add Favorite</button>
      <ol>
        {favorite.map((item, idx) => (<li key={idx} style={{ listStyle: 'none' }}>{item}</li>))}
      </ol>
      <section style={{ textAlign: 'center', marginTop: 60, marginBottom: 60 }}>
        <hr style={{ maxWidth: "30%" }} />
        <h2>My Quotes</h2>
        <form>
          <input value={myQuote} type='text' onChange={(e) => setMyQuote(e.target.value)} />
          <button type="submit" onClick={submitQuote}>Submit</button>
        </form>
        <ol>
          {myQuoteList.map((item, idx) => (<li key={idx} style={{ listStyle: 'none' }}>{item}</li>))}
        </ol>
      </section>
    </div>
  );
}

export default App;
