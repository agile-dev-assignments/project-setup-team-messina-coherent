var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  
const assert = require("assert");
describe("search", async function(){
    it("Should return an array of ids", async function(){
        try{
            var array=await search("Pop");
            console.log(array);
            assert.typeOf(array,"array");
        }
        catch(err){
            console.log("Something went wrong")
        }
    })
})