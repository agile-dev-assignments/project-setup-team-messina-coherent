import './faq.css';

function FAQ() {
  return (
    <div className='searchbar'>
      <div className='contentOR'>
        <p className='or' style={{color: 'white', fontWeight: '700'}}>
          Frequently Asked Questions
        </p>
      </div>
      <h3>What can I do once I sign in?</h3>
      <p>
        Once you sign in you can acesss the “My Taste” page, alogn with the “By Weather” and “By Mood” playlist pages.
      </p>
      <hr/>
      <h3>What is the “My Taste” page?</h3>
      <p>
        This page will give you a breakdown of your entire Spotify library, by genre.
      </p>
        <hr/>
      <h3>What are the “By Weather” and “By Mood” pages?</h3>
      <p>
        These pages will, based off the genre breakdown of your library, give you playlists
        based off the weather of a specific location,
        or one of our several moods we list. We feel it this gives the user a much more personal experience.
      </p>
      <hr/>
      <h3>How do I contact the developers if I have any more questions?</h3>
      <p>
        You can contact us using the form that is listed in the <a href='/contact'>Contact Page</a>.
      </p>
    </div>
  );
}
export default FAQ;
