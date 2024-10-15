# BrighteEats GraphQL API

## How to run the project
 ```
    1. create an .env file using .env.example template
    2. npm install 
    3. npm run dev
 ```

 # Sample Requests

## Register
```
    mutation {
        register(
            name: "John Doe", 
            email: "DJ@gmail.com", 
            mobile: "09123456789", 
            postcode: "3022", 
            service: 1
            ) 
            {
                name
                email
                mobile
                postcode
                service
            }
        }`
```

## Get leads
 ```
  query { 
      leads {
          id 
          name 
          email 
          mobile 
          postcode 
          service  
        } 
    }"

 ```

 ## Get lead
 ```
  query { 
      lead (name: "John Doe") {
          id 
          name 
          email 
          mobile 
          postcode 
          service  
        } 
    }"

 ```

## How to run unit test
```
    1. npm run test
```

