import './faq.css';

function faq(){
    return(
    <div class="searchbar">
        <h1>FAQ Page</h1>
        <form method="" action="">
            <input class="content" type="text" name="search" placeholder="Search all contents"></input>
            <input class="button" type="submit" value="search"></input>
        </form>
        <table class='questiontable'>
            <tr class='first_row'>
                <th style='font-size:12px;'>Questions</th>
                <th style='font-size:12px;'>Answer</th>
            </tr>
        </table>
       </div>
    );
}
export default faq;