import './footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='row'>
        <div className='column'>
          <a href="/about">About Us</a>
          <br/><br/>
          <a href="/faq">FAQs</a>
        </div>
        <div className='column'>
          <a href="/contact">Contact Us</a>
          <br/><br/>
          <a href="/privacy">Privacy Policy</a>
        </div>

      </div>
    </div>
  );
}

export default Footer;
