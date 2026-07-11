<!-- Live Link: https://ultimez-task-experienced.vercel.app/ -->

# Requirements and Output

## Login

Here is the Login API where you need to integrate with both the fields

    API URL: https://lobster-app-ddwng.ondigitalocean.app/user/login

Headers

    api_key : Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH

Request Payload Object

    {
    	"login_id":"developer@gmail.com"
    	"password":"123123"
    }

## Register page

Here is the Register API where you need to integrate with all the fields. This contains the data for login if you are a New User by adding UserName and Password.

    API URL: https://lobster-app-ddwng.ondigitalocean.app/user/register

Headers

    api_key : Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH

Request Payload Object

    {
      "full_name":"jhon",
      "username":"jhon",
      "referral_id" :"developer",
      "email_id":"jhon@tgmail.com",
      "country_row_id":"101",
      "mobile_number":"8798568912",
      "password":"123123"
    }

## Dashboard

After Login-in, the data will be in the response, where you need to display the response with the following field in a table.

    - Fullname
    - Username
    - Country
    - Email id
    - Mobile number
    - Referral id

## Conditions

    - Proper validations according to the given fields.

## What we are looking for?

    - Best cases of Space and Time Complexity
    - Simple, Organised, Readable code with comments
    - Document of Test cases

## Code Submit

    - The challenge should be delivered as a link to a public git repository (github.com or bitbucket.com are preferred).
    - Need to deploy it on any server where we can test this and see the demo. E.g., (https://vercel.com).
    - Once complete share the following details with hr@ultimez.com
    	- Hosted link
    	- Document of Test cases
    	- Git repository link
