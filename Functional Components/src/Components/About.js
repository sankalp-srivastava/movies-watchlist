import React from 'react'

export default function About() {
  return (
    <div className='my-container'>
    <div className="bgimage" style={{filter:'blur(12px)'}}></div>
    <div className='aboutpage '>
      <h1 className='shadow1' style={{ textAlign: 'center', color: 'white', paddingTop: '1rem' }}>Movies Watchlist</h1>
      <h4 className="shadow1">
        Overview <hr />
      </h4>
      <p className='shadow1'>
        A React App which shows trending movies and Tv show and information related to them such as Title, Genre, Rating, Original Language, Cast etc.
        You can add your likes to your favorites list just by pressing Add to Favourites. The list is stored locally on your computer,
        so it will still be present next time you visit.
      <br/>
      The Website has support to touch gestures on carousel and switching tabs on home page.
      </p>
      <h4 className="shadow1">
        Libraries Used <hr />
      </h4>

      <ul className="shadow1">
        <li>React</li>
        <li>React Router DOM</li>
        <li>Material UI</li>
        <li>Bootstrap 5</li>
        <li>Axois</li>
        <li>React swipeable etc.</li>
      </ul>

      <h4 className="shadow1">
        Wondering How This Is Made ? Checkout The Code Here <hr />
      </h4>
      <p className="shadow1">
        The code is present at : <a href='https://github.com/sankalp-srivastava/movies-watchlist' target='_blank' rel="noreferrer" > <img src="	https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Github Badge" style={{ borderRadius: '17px' }} /> </a>
        <br /> If you have any feedback/Improvement or want to contribute, Raise an Issue in Github.
      </p>
      <h4 className="shadow1">
        Connect with me
      </h4>
      <div className="shawdow1">
        My Social Media Handles :
        <div align="center">
          <div>
            <a href="mailto:raunaksrivastava22@gmail.com" target="_blank" rel="noreferrer" >
              <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" className='badges' alt="Twitter Badge" style={{ borderRadius: '17px' }} />
            </a>
            

            
            <a href="https://www.linkedin.com/in/sankalpsrivastava-2605/" target="_blank" rel="noreferrer">
              <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" className='badges' alt="LinkedIn Badge" style={{ borderRadius: '17px' }}/>
            </a>
            <a href='https://github.com/sankalp-srivastava/' target='_blank' rel="noreferrer" > 
            <img src="	https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" className='badges' alt="Github Badge" style={{ borderRadius: '17px' }} /> 
            </a>
          </div>
          </div>


          <hr />
      </div>
      <h5 style={{textAlign:'center'}} className="shadow1">Made with <span style={{color: "#e25555"}}>&hearts;</span> | Coded by Sankalp Srivastava</h5>
      <hr />
    </div>
  </div>
  )
}
