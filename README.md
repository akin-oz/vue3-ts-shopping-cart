# Shopping Cart

![Quality Gate](/public/sonarqube/quality-gate.svg "quality-gate") 
![Coverage](/public/sonarqube/coverage.svg "coverage") 
![Maintainability](/public/sonarqube/maintainability.svg "maintainability") 
![Reliability](/public/sonarqube/reliability.svg "reliability") 
![Security](/public/sonarqube/security.svg "security") 

![Bugs](/public/sonarqube/bugs.svg "bugs") 
![Code Smells](/public/sonarqube/code-smells.svg "code-smells") 
![Duplicated Lines](/public/sonarqube/duplicated.svg "duplicated") 
![Lines](/public/sonarqube/lines.svg "lines") 
![Technical Debt](/public/sonarqube/tech-debt.svg "tech-debt") 
![Vulnerabilities](/public/sonarqube/vulnerabilities.svg "vulnerabilities") 
## Project setup
```
docker build . -t vue3-ts-shopping-cart
docker run -d -p 8080:80 vue3-ts-shopping-cart
```
Open in browser window on `localhost:8000`

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Generate overall coverage report
```
npx nyc report --reporter=text-summary
```

### Lints and fixes files
```
npm run lint
```

### Build task for production ready output
```
npm run build
```

## Developing Process

Kanban board of the tasks can be found at [Github Projects](https://github.com/zoztorun/vue3-ts-shopping-cart/projects/1)