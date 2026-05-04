### Subject Behaviour

- whenever we have sent to data one component to another component and both of component doesn't have relationship create subject and behaviour subject 

Subject - but subject cannot have default initialized value

Behaviour Subject - can have a default value

Example usecase of subject and behaviour subject - 
let say I'm login my navbar component already loaded once i logged in I'm navigate to different application but in navbar user details is not getting updated in logged-in under for that in login component, I created the subject in my common service for login component I emitting the value then in my navbar(header) component I subscribing that in navbar again I read the local storage data that how the log button and the logged in user is getting visible without refresh 