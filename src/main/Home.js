import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './card.css';

function Article({ imageUrl, title, content, link }) {
  return (
    <article>
      <div className="article-wrapper">
        <figure>
          <img src={imageUrl} alt="" />
        </figure>
        <div className="article-body">
          <h2>{title}</h2>
          <p>{content}</p>
          {/* Use Link instead of a standard anchor tag */}
          <Link to={link} className="read-more">
            Read more <span className="sr-only">about {title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Articles() {
  return (
    <section className="articles">
      <Article
        imageUrl="https://wallpapercave.com/wp/wp5634726.jpg"
        title="Virat"
        content="Virat Kohli also called as KING OF WORLD CRICKET. Virat Kohli is an Indian international cricketer and the former captain of the Indian national cricket team. He is a right-handed batsman and an occasional medium-fast bowler."
        link="/virat" // Set the link to redirect to Virat.js
      />
      <Article
        imageUrl="https://images.mid-day.com/images/images/2021/jun/rohot-june-fifteen_d.jpg"
        title="Rohit"
        content="Rohit Sharma also called as HIT-MAN of cricket for his stunner hitting of the ball.Rohit Gurunath Sharma is an Indian international cricketer  He is a right-handed batsman. "
        link="/rohit" // Set the link to redirect to Rohit.js
      />
      <Article
        imageUrl="https://wallpapers.com/images/featured/ms-dhoni-hd-mz2zm0u2wro5f9mw.webp"
        title="Dhoni"
        content="Dhoni was one of the greatest captain. Mahendra Singh Dhoni is an Indian professional cricketer. He is a right handed batter and a wicket-keeper."
        link="/dhoni" // Set the link to redirect to Dhoni.js
      />

    </section>
  );
}
