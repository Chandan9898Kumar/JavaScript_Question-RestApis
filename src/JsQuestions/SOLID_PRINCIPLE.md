# SOLID Principles ⚖

SOLID is an acronym that represents a set of five design principles for writing maintainable and scalable software.and are considered foundational concepts in object-oriented programming and design. The SOLID principles aim to create robust, flexible, and easily maintainable software by promoting clean and efficient code organization.

## Why Do We Use SOLID? 🎁

1. **Maintainability:** SOLID principles enhance code maintainability by providing a clear structure, reducing code smells, and making it easier to add or modify features.
2. **Scalability:** As the codebase grows, adhering to SOLID principles helps manage complexity and ensures that the system remains scalable and adaptable to changes.
3. **Collaboration:** A codebase following SOLID principles is more accessible and understandable, facilitating collaboration among developers and making it easier for new team members to grasp the code.

## Things to Remember When Using SOLID ⚠

1. **Gradual Adoption:** Implement SOLID principles gradually to existing codebases. Refactoring all code at once might not be practical.
2. **Real-world Applicability:** Apply the principles judiciously. There are scenarios where breaking a principle is a better choice for specific reasons.
3. **Balance and Context:** Achieving a balance between SOLID principles may require trade-offs. Consider the specific context of your application and team.

## What are SOLID? 👀

- [S - Single Responsibility Principle (SRP) 🕺](#single-responsibility-principle-)
- [O - Open/Closed Principle (OCP) 🚪🔒](#openclosed-principle-)
- [L - Liskov Substitution Principle (LSP) 🧩](#liskov-substitution-principle-)
- [I - Interface Segregation Principle (ISP) 🧍‍♂️🤝🧍‍♀️](#interface-segregation-principle-)
- [D - Dependency Inversion Principle (DIP) 🔄](#dependency-inversion-principle-)

## Single Responsibility Principle 🕺

The Single Responsibility Principle is one of the SOLID principles of object-oriented design. It states that a class should have only one reason to change, meaning it should have only one responsibility. Each class should focus on doing one thing and doing it well. This principle aims to enhance maintainability, readability, and flexibility in software development.

> "A class should have only one reason to change." -- Robert C. Martin

### Code in TS:

#### Bad Example (Violating SRP) ‼️

```ts
class UserManager {
  getUsers(): User[] {
    /* ... */
  }
  saveUser(user: User): void {
    /* ... */
  }
  deleteUser(userId: string): void {
    /* ... */
  }
  renderUser(user: User): void {
    /* ... */
  } // Rendering logic in UserManager
}
```

> In this bad example, the `UserManager` class is responsible for both managing user data (get, save, delete) and rendering users. This violates the `Single Responsibility Principle` because a class should have only one reason to change, and mixing data management with rendering introduces multiple responsibilities.

#### Good Example (With SRP) ✅

```ts
class UserManager {
  getUsers(): User[] {
    /* ... */
  }
  saveUser(user: User): void {
    /* ... */
  }
  deleteUser(userId: string): void {
    /* ... */
  }
}

class UserRenderer {
  renderUser(user: User): void {
    /* ... */
  }
}

class User {
  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}
}

const userManager = new UserManager();
const userRenderer = new UserRenderer();

const users = userManager.getUsers();
users.forEach(userRenderer.renderUser);
```

> In this good example, responsibilities are separated into distinct classes. `UserManager` is responsible for managing user data, and `UserRenderer` is responsible for rendering users. This adheres to the `Single Responsibility Principle`, making each class focused on a single task and improving maintainability.

### Advantages of the SRP 🪄:

- **Readability:** Clear responsibilities in each class improve code readability.
- **Maintainability:** Changes in one area don't affect unrelated parts, enhancing maintainability.
- **Testing:** Single responsibilities make classes easier to test.
- **Reusability:** Modular classes with single responsibilities are more reusable and adaptable.

## Open/Closed Principle 🚪🔒

The Open/Closed Principle is a SOLID design principle that suggests a class should be open for extension but closed for modification. This means that a class's behavior can be extended without altering its source code, promoting the addition of new features or functionalities without changing existing ones.

> "The Open-Closed Principle states that "software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification." -- Robert C. Martin

### Code in TS:

#### Bad Example (Violating OCP) 🆘

```ts
class Discount {
  giveDiscount(customerType: string): number {
    if (customerType === "Regular") {
      return 10;
    } else if (customerType === "Premium") {
      return 20;
    }
  }
}
```

> In this bad example, if we want to introduce a new type of customer, let's say a "Gold" customer with a different discount, we would have to modify the `giveDiscount` method in the `Discount` class.

#### Good Example (With OCP) ✅

```ts
interface Customer {
  giveDiscount(): number;
}

class RegularCustomer implements Customer {
  giveDiscount(): number {
    return 10;
  }
}

class PremiumCustomer implements Customer {
  giveDiscount(): number {
    return 20;
  }
}

class GoldCustomer implements Customer {
  giveDiscount(): number {
    return 30;
  }
}

class Discount {
  giveDiscount(customer: Customer): number {
    return customer.giveDiscount();
  }
}
```

> In this good example, the `Open-Closed Principle` is adhered to. New customer types, like `GoldCustomer`, can be added without modifying existing code. Each customer type implements the `Customer` interface, and the `Discount` class is open for extension but closed for modification.

### Advantages of the OCP 🪄:

- **Flexible Extension:** Easily add new features or functionalities without modifying existing code.
- **Reduced Bug Risk:** Minimize the risk of introducing bugs in already functional code.
- **Enhanced Code Stability:** Existing code remains stable and reliable as new components are added.

## Liskov Substitution Principle 🧩

The Liskov Substitution Principle is a SOLID design principle that states objects of a superclass should be replaceable with objects of its subclass without affecting the correctness of the program. In simpler terms, a derived class should be able to substitute its base class without causing errors.

> A `subtype` should behave like a `supertype` as far as you can tell by using the `supertype` methods.

### Code in TS:

#### Bad Example (Violating LSP) 🆘

```ts
abstract class Bird {
  abstract fly(): void;
}

class Penguin extends Bird {
  public fly(): void {
    // ??? (Penguins cannot fly)
  }
}
```

> This example violates the Liskov Substitution Principle. The `Bird` abstract class declares an abstract method `fly()`, indicating that all birds should be able to fly. However, the Penguin class, being a bird, does not fulfill this contract appropriately.

#### Good Example (With LSP) ✅

```ts
abstract class Bird {
  abstract move(): void;
}

class Sparrow extends Bird {
  public move(): void {
    console.log("Chirp chirp");
  }
}

class Penguin extends Bird {
  public move(): void {
    console.log("Swimming");
  }
}

// Function utilizing LSP
function performMove(bird: Bird): void {
  bird.move();
}

const sparrow = new Sparrow();
const penguin = new Penguin();

performMove(sparrow); // Chirp chirp
performMove(penguin); // Swimming
```

> In this good example, the `Sparrow` and `Penguin` classes correctly adhere to the Liskov Substitution Principle. When substituting instances of these classes for the `Bird` abstract class, the `performMove` function behaves as expected, demonstrating consistency in the behavior of all bird subclasses.

### Advantages of the LSP 🪄:

- **Consistent Behavior:** Substituting derived classes ensures consistent behavior, promoting predictability.
- **Maintenance Ease:** Adding new subclasses is possible without modifying existing code, enhancing maintainability.
- **Interchangeability:** Base and derived class objects can be used interchangeably, providing flexibility.
- **Extensibility Support:** Facilitates the creation of new subclasses without disrupting existing code, supporting extensibility.

## Interface Segregation Principle 🧍‍♂🤝🧍‍♀

The Interface Segregation Principle is a SOLID design principle that suggests a class should not be forced to implement interfaces it does not use. In simpler terms, it encourages breaking large interfaces into smaller, more specific ones, preventing classes from being burdened with methods they don't need.

> "No client should be forced to depend on interfaces they do not use." - Robert C. Martin

### Code in TS:

#### Bad Example (Without ISP) 🆘

```ts
// Interface: Worker
interface Worker {
  work(): void;
  eat(): void;
}

// Class 1: Robot (implements Worker)
class Robot implements Worker {
  work(): void {
    console.log("Robot is working");
  }

  eat(): void {
    // Robots don't eat.
    console.log("Robot does not eat");
  }
}

// Class 2: Human (implements Worker)
class Human implements Worker {
  work(): void {
    console.log("Human is working");
  }

  eat(): void {
    console.log("Human is eating");
  }
}
```

> In this bad example, the `Worker` interface is broad and includes the `eat` method, which is irrelevant for the `Robot` class. This violates the `Interface Segregation Principle` because the `Robot` class is forced to implement a method it doesn't use.

#### Good Example (With ISP) ✅

```ts
// Interface: Worker
interface Worker {
  work(): void;
}

// Interface: Eater
interface Eater {
  eat(): void;
}

// Class 1: Robot (implements only Worker)
class Robot implements Worker {
  work(): void {
    console.log("Robot is working");
  }
}

// Class 2: Human (implements Worker and Eater)
class Human implements Worker, Eater {
  work(): void {
    console.log("Human is working");
  }

  eat(): void {
    console.log("Human is eating");
  }
}

// Class 3: Dog (implements only Eater)
class Dog implements Eater {
  eat(): void {
    console.log("Dog is eating");
  }
}
```

> In this good example, the `Worker` interface is focused only on the `work` method. Additionally, a separate `Eater` interface is introduced for classes that need an `eat` method. This adheres to the `Interface Segregation Principle`, as classes now implement only the interfaces relevant to their functionalities.

### Advantages of the ISP 🪄:

- **Reduced Dependency:** Smaller interfaces reduce dependencies, preventing classes from implementing unnecessary methods.
- **Enhanced Readability:** Classes only implement interfaces relevant to their functionality, improving code readability.
- **Flexibility:** Classes can evolve independently, allowing the addition of new interfaces without affecting unrelated classes.
- **Avoid "Fat" Interfaces:** Prevents creation of bloated interfaces, keeping them specific to their use cases.

## Dependency Inversion Principle 🔄

The Dependency Inversion Principle is a SOLID design principle that emphasizes high-level modules should not depend on low-level modules, but both should depend on abstractions. It promotes the use of abstractions (interfaces or abstract classes) to decouple higher-level and lower-level modules, fostering flexibility and maintainability.

> "High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions." - Robert C. Martin

### Code in TS:

```ts
// Abstraction (interface)
interface Switchable {
  turnOn(): void;
  turnOff(): void;
}

// Low-level module 1: Bulb
class Bulb implements Switchable {
  turnOn(): void {
    console.log("Bulb is on");
  }

  turnOff(): void {
    console.log("Bulb is off");
  }
}

// Low-level module 2: Fan
class Fan implements Switchable {
  turnOn(): void {
    console.log("Fan is on");
  }

  turnOff(): void {
    console.log("Fan is off");
  }
}

// High-level module utilizing DIP
class Switch {
  constructor(private device: Switchable) {}

  operate(): void {
    this.device.turnOn();
    // Additional operations if needed
    this.device.turnOff();
  }
}

// Usage
const bulb = new Bulb();
const fan = new Fan();

const switchForBulb = new Switch(bulb);
const switchForFan = new Switch(fan);

switchForBulb.operate(); // Bulb is on, Bulb is off
switchForFan.operate(); // Fan is on, Fan is off
```

> `Switchable` is the abstraction (interface) representing switchable devices. `Bulb` and `Fan` are low-level modules implementing the `Switchable` interface. `Switch` is the high-level module that depends on the abstraction (Switchable), adhering to `DIP`.

### Advantages of the DIP 🪄:

- **Flexibility:** Abstractions allow easy substitution of low-level modules without affecting high-level modules.
- **Reduced Coupling:** High-level and low-level modules are decoupled through abstractions, promoting a more maintainable and adaptable codebase.
- **Easier Testing:** Dependency inversion simplifies testing by allowing the use of mock objects for abstraction, facilitating unit testing.
