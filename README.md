#API Test Cases
#####**Author:** Evan Bechtol
#####**Description:** Review the API documented at https://dictionaryapi.docs.apiary.io/ and write a set of test cases using JavaScript, NodeJS, any JavaScript testing framework, preferably the Jest testing framework. The API endpoints covered are:
- Create a New Dictionary
- Delete a Dictionary
- Create or Modify a Key-Value Pair.

###Technologies Used
This project is using Node.JS v14.1.0, and Jest v26.6.3.

###Setup
Run the command `npm install` to install the required dependencies.

###Running Tests
*This API requires an Authorization header on all requests*. If you do not have the authorization key, you cannot run these tests.
1. Set your environment variables in the command line: `set baseUrl=https://dictionaryapi.docs.apiary.io/`, and `authKey=<your authorization token>`
2. Type `jest` in the Command line, to run the tests

###Notes from testing
- The API returns the header `x-powered-by`. This header can be used to exploit your system by identifying CVE's (common vulnerabilities and exposures).
- The API returns `access-control-allow-origin: *`. While this is fine for testing, this needs to be limited to specific, trusted sources in production
- The endpoint for "Create or Modify a Key-Value Pair" returns with status code `200` when ID and Key are provided, but no body. The response
- The documentation also says that the success response status code should be 201, but it is actually 200. This needs to be corrected
in either the API or the docs.
also is `{"error":"error"}`. In this case, better input validation could be used on the API enpoint to ensure that the request
contains a valid JSON body to update the key with. This was also not mentioned in the API docs, so those should be updated as well.
- Some tests depend on other operations to be performed prior to the test being run (ie. A dictionary must be created before it can be deleted).
This means that if the tests are not properly structured, you end up with test cases that are dependent on other test cases, which is not a sound approach.
I resolved this by creating a utility file, `requestUtil`, which extracts dependent test logic into a reusable service. 
This *reduces coupling between tests, and increases cohesion*, making our tests more robust!
 
###Application Structure
```
|-config
|-test
  |--createNewDictionary.test.js
  |--createOrModifyDictionary.test.js
  |--deleteDictionary.test.js
  |--requestUtil.js
|-README.md
```
