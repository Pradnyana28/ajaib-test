# Web Engineering Test - Ajaib

## Explain how Object-Oriented Programming works with a thorough understanding of the keyword this and the new keyword

Object Oriented programming works in a sense of Class and Object. It helps us to think or practice in term of real-world Objects.

The `new` keyword used to create an instance of an object. Meanwhile the `this` keyword made to bind the properties in a object to the newly created instance.

## What is the new class syntax and how to create instance methods, class methods?

The `new` keyword is used to create an instance of a user-defined object that has a constructor function.

Example on how to create instance methods:

```JavaScript
function Employee(name, address) {
    this.name = name;
    this.address = address;
}

const empl = new Employee('Kadek Pradnyana', 'Bali');

console.log(empl.name); // Output: "Kadek Pradnyana"
```

## Give an example of how to implement inheritance in ES2015 using extends and super

```JavaScript
class Employee {
    constructor(name, address, group) {
        this.name = name;
        this.address = address;
        this.group = group;
    }
}

class Admin extends Employee {
    constructor(name, address) {
        super(name, address, 'ADMIN');
    }
}

const empl = new Admin('Kadek Pradnyana', 'Bali');

console.log(empl); // Output: Admin { name: "Kadek Pradnyana", address: "Bali", group: "ADMIN" }
```

## Imagine refactoring an ES5 application to use ES2015, how would you go about it?

- Replace the `function` keywords with arrow function `() => {}`.
- For single parameter in a function, remove the parentheses. e.x `(name) => {}` to `name => {}`.
- Use linter to highlight the code that are using legacy style.
- But still to beware of some area that is required to use ES5 or if the latest one that still not supported by the browser.

## Give an example of how you structure applications with design patterns using closure and modules

```JavaScript
var namespace = (function () {
    // Private Properties
    var cart = [];

    function storeCart() {
        // Save to DB or make an API call
    }

    // Public properties
    return {
        addItem: function (items) {
            cart.push(items);
        },
        listItems: function () {
            return cart;
        },
        removeItem: function (index) {
            return cart.splice(index, 1);
        },
        save: function () {
            storeCart();
        }
    };
})();

// Add item
namespace.addItem({ name: 'Blossom', quantity: 1, price: 200 }); // Output: undefined

// List all items in the cart
namespace.listItems(); // Output: [ { name: 'Blossom', quantity: 1, price: 200 } ]

// Delete item by array's index
namespace.removeItem(0); // Output: { name: 'Blossom', quantity: 1, price: 200 }
```

## What are your preferred ways of testing your web application?

- Unit Testing:
  - Test all Classes and Functions that used and set the code coverage threshold
  - For frontend, test the app component
  - For frontend, creating a snapshot and add the component to storybook is a good additional
- Integration Testing:
  - Create tests to test the entire process of a feature
- End to End testing:
  - For frontend can use cypress or selenium for the automation or manual action
  - For backend or API can use cypress or any similar tool

## Which web server do you use? Why? Explain pros and cons of your choice.

I usually use Nginx at the moment because of the good performance of handling multiple connections and the configuration is quite easy.
- Pros
  - Easy configuration
  - Good performance of handling multiple connections
  - Better scalability
  - Better at handling static content
- Cons
  - Nginx does not support module creation

## What is your preferred production deployment process?

In this scenario, the features that want to be delivered to PRODUCTION should be tested through all testing environment such as DEV, STAGING or UAT.

NOTE: The assumption is we use `master` branch to deploy our code or repository.

- Deploy master branch to testing environment
- If there is any issue or feedback, developer should immediately resolve it
- Once everything is clear (no feedback and bug), perform a git release
- Deploy the created git tag to PRODUCTION

## Give an example of clean README.md documentation.

We can write the README.md as how we write a Journal. It means it'll be great if the README.md file contains:
- Page Index
- The proposal or the reason behind the solution
- How to use
  - Is it affect the  machine environment? Then specify the entire process of the respective environment. e.g. OSX, Linux, or Windows environment
- List of APIs or refer to another `.md` file
