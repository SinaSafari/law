# lawer


## Entities and model fields
> for detail look the code and these are not final
- User 
    - fullname
    - email
    - password

- Documents
    - docID
    - title
    - report


## Access scope (not implemented)
There are two main access scope
1. admin (full control)
2. client (that is called user in the app)

## Routes
- auth
    - register: ```POST /api/v1/register```
    - login: ```POST /api/v1/login```

- users
    - get all users: ```GET /api/v1/users``` (admin)

- documents
    - get all documents: ```GET /api/v1/docuemnts ``` (admin)
    - get all a user's documents: ```GET /api/v1/document/:userId``` (admin & logged in user)
    - get a single document: ```GET /api/v1/document/:userId/:docId``` (admin and logged in user)
    - create a document: ```POST /api/v1/docuemnts``` (admin)
    - update a document: ```PUT /api/v1/document/:userId/:docId``` (admin)
    - delete a document: ```DELETE /api/v1/document/:userId/:docId``` (admin)


## Todo
- [ ] add admin and user auth middleware
- [ ] add more details about Document model
- [ ] file upload (photos and pdf files) (if needed)
- [ ] set express static route for serving react app
