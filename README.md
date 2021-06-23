###Requirements
- Develop a web application
- Use React for the frontend
- Use Java/Spring Boot for the backend
- Use any relational database

  
  What should be developed:
1. Registering residences
- A residence register with five attributes: zip code, number, latitude, longitude and
  number of residents
- Include the validation of the fields in the form
2. Heat map
- A heat map showing all the residences registered, taking into account the number of
  residents
- The map can be Google, Leaflet or any other map feature
- No login screen is required

### Solution description - Used Technologies:
- Back-end
  - Java 11
  - Spring/Spring Boot(web, testing, JPA persistence starters)
  - Lombok - Automatically generate constructors / getters / setters (reduce boilerplate code)
  - H2 in-memory database (used for convenience, can easily be replaced, just by configuration)
  - Maven
- Front-end
  - ReactJs
  - Node
  - Various map APIs: leaflet, leaflet.heat, leaflet-geosearch
  - bootstrap, reactstrap (ui tools)
  - all dependencies are available in `package.json`

###### Backend
The back-end is a CRUD application built around the 'residence' entity. Spring Boot really helps getting up and running very fast regarding implementation, config and dependencies.
The implementation is pretty standard, it defines an entity: Residence, a controller: ResidencesController, a service, a DAO, etc. I believe it follows the best practices for this type of a project.
It basically behaves as a REST API and could easily be developed independently.
I have provided a few integration tests. They are defined in:
```
CognyteChallengeApplicationTests.java
```
The application is pretty trivial right now and I did not see any use for defining unit tests. Of course these can be defined once the application gets more complicated, more functionalities are added.
###### Frontend
The front-end was created using create-react-app tool chain. It is a SPA (Single Page Application)
All the fontend files are under the 'fontend' folder in the [repository_directory].
The main components are: `ResidenceForm`, `ResidencesList`, `MyHeatMap` and `AppNavBar` which should be pretty self explanatory.
It uses various map APIs: leaflet, leaflet.heat, leaflet-geosearch
For dev purposes you’ll need to have Node on your local development machine (but it’s not required on the server)
How to use the React app in development mode?

1) Run "npm install" in the main 'frontend' folder
2) Run "npm start" to view the project

For the front end I defined just a small test, from lack of time, but this can be improved.
```
App.test.js
```
### How to run
After project was checked out from git hub, go to the [repository_directory] and run the following command in a command prompt:
###### On Windows
```
mvnw spring-boot:run
```
###### On Unix
```
./mvnw spring-boot:run
```
Something like following should be displayed in the console:
```
2021-06-23 01:57:31.646  INFO 34920 --- [           main] o.s.b.a.w.s.WelcomePageHandlerMapping    : Adding welcome page: class path resource [static/index.html]
2021-06-23 01:57:31.731  INFO 34920 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2021-06-23 01:57:31.739  INFO 34920 --- [           main] c.c.c.CognyteChallengeApplication        : Started CognyteChallengeApplication in 2.62 seconds (JVM running for 2.925)
2021-06-23 01:57:55.795  INFO 34920 --- [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2021-06-23 01:57:55.796  INFO 34920 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2021-06-23 01:57:55.801  INFO 34920 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
```
Open a browser and type in the following url:
```
localhost:8080
```
Here is a small clip that describes the first steps in using the app:
https://www.screencast.com/t/5VFL3oDf

When creating/editing a residence, there is a helper geocode API that returns the zip code and latitude, longitude coordinates given a valid address. This can be a zip code, a street name or any valid address string.

http://localhost:8080/residences

### How to package for a potential deploy
If you want to build the project, run the following mvnw command:
###### On Windows
```
mvnw package
```
###### On Unix
```
./mvnw package
```

### Self evaluation - strong points and potential improvements
The frontend can be decoupled from the back-end. They can reside on different servers/containers.
In real life the backend could be a simple microservice with the help of Spring/Spring Boot that behaves as a REST Api.
They are bundled together, at build time with the help of Maven, as that was the request.
Things to improve:
- extend the geocode api with an autocomplete list and a map layer where user can visualise what new residence address it wants to add; 
- write more tests, both for the frontend and back end;
- handle more exceptions scenarios;
- replace H2 database with MySql or PostgreSql - that is easy to achieve, just by configuration
