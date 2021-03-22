import './faq.css';

function FAQ() {
  return (
    <div class='searchbar'>
      <h1>FAQ Page</h1>
      <form method='' action=''>
        <input className='content' type='text' name='search' placeholder='Search all contents'></input>
        <input className='button' type='submit' value='search'></input>
      </form>
      <table class='questiontable'>
        <tr class='first_row'>
          <th style={{ fontSize: '12px;' }}>Questions</th>
          <th style={{ fontSize: '12px;' }}>Answer</th>
        </tr>
      </table>
    </div>
  );
}
export default FAQ;
