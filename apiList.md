# LIST OF ALL APIs 
AuthRouter
- post /signup
- post /login
- post /logout

## profileRouter
- get /profile/view
- patch /profile/edit
- patch /profile/password

## connectionRequestRouter
- post /request/send/intersted/:id
- post /request/send/ignore/:id
- POST /request/send/:status/:toUserId


- post /request/review/accept/:requestId 
- post /request/review/reject/:requestId
- post /request/review/:status/:requestId



## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed -gets you the profiles of other users in platform


status : ignore,interested, reject accept
