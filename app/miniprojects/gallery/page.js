'use client'
import React from 'react';
import './index.scss';
import {Collection} from './Collection.tsx'

function App() {
    const [isLoading, setIsLoading] = React.useState(true)
    const [categories, setCategories] = React.useState([]);
    const [categoryId, setCategoryId] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState('');
    const [collections, setCollections] = React.useState([]);
    
    React.useEffect(() => {
        setIsLoading(true);
        fetch('/data.json')
        .then((response) => response.json())
        .then((json) => {
            console.log('Fetched data:', json);
            setCollections(json.collections || []);
            setCategories(json.categories || [])
            
        })
        .catch((error) => {
            console.warn(error); 
            alert('Fetching data error')
        }).finally(() => setIsLoading(false))
    }, [])

    const filteredCollections = collections.filter((obj) => {
        const matchesSearch = obj.name.toLowerCase().includes(searchValue.toLowerCase());
        const matchesCategory = categoryId === 0 || obj.category === categoryId;
        return matchesSearch && matchesCategory;
    });
    
  return (
    <div className="App">
      <h1>Gallery with photos from my life</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li onClick={()=> setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>
          ))}
        </ul>
        <input 
            value={searchValue} 
            onChange={e => setSearchValue(e.target.value)} 
            className="search-input" placeholder="Search by name" 
        />
      </div>
      <div className="content">

        {isLoading ? 
            (<h2>Loading..</h2>

            ) : (filteredCollections.map((obj, index) => (
            <Collection
                key={index}
                name={obj.name}
                images={obj.photos}
            />
        )))}
        
      </div>
    </div>
  );
}

export default App;