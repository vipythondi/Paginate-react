import './styles/App.css';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
function App() {

  const [people, setPeople] = useState([]);
  const [pageNumber, setPageNumber] = useState(0)
  const [search, setSearch] = useState('')

  const peoplePerPage = 3
  // const peoplePerPage = 1
  // const peoplePerPage = 5
  // const peoplePerPage = people.length
  const pagesVisited = pageNumber * peoplePerPage

  const filteredPeople = people.filter(person => {
    return person.firstName.toLowerCase().includes(search.toLocaleLowerCase()) 
    || person.lastName.toLowerCase().includes(search.toLocaleLowerCase())
  })

  const displayPeople = filteredPeople.slice(pagesVisited, pagesVisited + peoplePerPage)
  .map(person => {
     return(
       <div className="Member">
          <div> <img src={person.avatar.url} /></div>
          <div>{person.id}</div>
          <div>{person.firstName}</div>
          <div>{person.lastName}</div>
          <div>{person.email}</div>
          <div>{person.company.name}</div>
          <div>{person.company.department}</div>
          <div>{person.company.startDate}</div>
       </div>
     )

  })


  const pageCount = Math.ceil(people.length/peoplePerPage)
  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  useEffect(() => {
    fetch('http://apis.chromeye.com:9191/people')
      .then(response => response.json())
      .then(people => setPeople(people))
  }, []);


  return (
    <div className="App">
      <div className="information">
        <input type="text" placeholder="Enter Keyword" onChange={ e => setSearch(e.target.value)}></input>
        <ReactPaginate
          previousLabel = {"<"}
          nextLabel = {">"}
          pageCount = {pageCount}
          onPageChange={changePage}
          containerClassName={"paginate"}
          disabledClassName={"disable"}
          activeClassName={"active"}
          previousClassName={"previous"}
          nextClassName={"next"}
        />
        <select className="switchNumber">
          <option value="perOne" >-- 1 --</option>
          <option value="perThree" selected="selected">-- 3 --</option>
          <option value="perFive" >-- 5 --</option>
          <option value="All">-- All --</option>
        </select>
      </div>
      <div className="MembersSections">
        <span>Avatar</span>
        <span>ID</span>
        <span>First Name</span>
        <span>Last Name</span>
        <span>Email</span>
        <span>Company</span>
        <span>Department</span>
        <span>Start Date</span>
      </div>
      {displayPeople}
    </div>
  );
}

export default App;
