import './contact.css';

function Contact() {
  return (
    <div style={{ textAlign: 'center' }}>
      
        <h1 class='h1_cu'>Contact Us</h1>
        <p class='p1_cu'>
          Get help from our experts in any of these places. <br></br>
          <strong>Note</strong>: We don’t offer phone support.
        </p>
        <h4 class='h_cu'>Messina Community</h4>
        <p class='p1_cu'>
          {' '}
          Post or search on our Community, where listeners help out and share ideas.<br></br>
          Go to the Spotify Community<br></br>
          Tip: The most knowledgeable Community members are called Rock Stars. You can also tweet them @AskRockStars.
        </p>
        <h4 class='h_cu'>Chat and Email</h4>
        <p class='p1_cu'>
          Chat with us through our contact form. <br></br>
          If no one’s available, we’ll get back to you on email. You can also e-mail at either ah3288@nyu.edu, yr35@nyu.edu, rjs724@nyu.edu,gyo202@nyu.edu 
        </p>
        <div class='contact' style={{ textAlign: 'left', display: 'inline-block' }}>
        <form>
          <label for='first'>
            <span>First Name</span>
            <input type='text' id='first' />
          </label>
          <label for='last'>
            <span>Last Name</span>
            <input type='text' id='last' />
          </label>
          <br/><br/>
          <label for='comment'>
            <span>Comments</span>
            <textarea id='comment'></textarea>
          </label>
          <br/><br/>
          <center><input className="submitButton" type="submit"/></center>
        </form>
        
      </div>
      
    </div>
  );
}

export default Contact;
