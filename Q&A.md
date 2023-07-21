# React Knowledge Q&A

1. **What is the difference between Component and PureComponent?**
   - Components can be either functional or class, and manage their state and props. They re-render whenever there is a change in their state or props.
   - PureComponent is a class component provided by React that performs a shallow comparison of its props and state to determine if it needs to re-render. If the props and state haven't changed, it won't re-render, which can lead to performance improvements.

   **Give an example where it might break my app**
   Let's say you have a PureComponent that receives an array of data as a prop. If you modify the array in place (for example using `push`, `pop`, or `splice`), the PureComponent won't detect the change, so it won't trigger a re-render, and your component won't display the correct data.

2. **Context + ShouldComponentUpdate might be dangerous. Why is that?**
   Because using Context changes can trigger re-renders in components that shouldn't be updated when we are also using ShouldComponentUpdate.

3. **Describe 3 ways to pass information from a component to its PARENT**
   - Props: The most common way to pass information from child to parent is by passing a callback function from the parent to the child as a prop. The child component can then call this function with the necessary information when it's needed.
   - Context: If the parent component is wrapped in a Context Provider, the child can access the context and update values directly, which indirectly communicates with the parent component.
   - Refs: You can also use refs to get a reference to the child component from the parent and access its properties and methods directly.

4. **Give 2 ways to prevent components from re-rendering**
   - Use React.memo(): Wrapping functional components with React.memo() to memoize the result and prevent re-rendering if the component's props haven't changed.
   - PureComponent: PureComponent to optimize rendering and prevent unnecessary updates based on changes in props and state.

5. **What is a fragment and why do we need it?**
   They are useful when you need to return multiple elements from a component without creating an additional wrapping element.

   **Give an example where it might break my app**
   If you use fragments excessively within your component hierarchy, readability and maintenance would be problematic. But so far it hasn't break an app for me.

6. **Give 3 examples of the HOC pattern**
   - withAuth: An HOC that checks if the user is logged in before rendering the wrapped component.
   - withRouter: An HOC that provides access to the router's history, location, and match objects to a component that is not directly rendered by a Route component.
   - withLoading: An HOC that shows a loading spinner while data is being fetched and then renders the wrapped component with the data.

7. **What's the difference in handling exceptions in promises, callbacks, and async…await?**
   - Promises: You can use `.catch()` to handle errors in promises. If any error occurs in the chain, it will jump to the nearest `.catch()` block, allowing better error handling.
   - Callbacks: When using callbacks, you typically have an error-first callback pattern, where the first argument of the callback is reserved for errors. You can check for an error in the callback function and take appropriate actions.
   - async/await: When using async/await, you can wrap the await calls inside a try-catch block. Any errors thrown within the try block will be caught by the catch block, allowing you to handle the exceptions better.

8. **How many arguments does setState take...**
   - `setState` can take two types of arguments:
     1. An object: You pass an object that represents the new state you want to set. React will merge this new state with the current state.
     2. A function: You pass a function that receives the previous state as an argument and returns an object representing the new state. This is useful when you want to set the state based on the previous state.

   **and why is it async** When you call `setState`, React doesn't immediately update the state and re-render the component. Instead, it jons multiple `setState` calls and performs a single update, this allows React to avoid unnecessary re-renders.

9. **List the steps needed to migrate a Class to Function Component**
   - Step 1: I identify the component's state and props usages.
   - Step 2: I create a new functional component and copy the JSX from the class component into it.
   - Step 3: If there is state, I use the `useState` hook to handle state in the functional component.
   - Step 4: If there are lifecycle methods, I us `useEffect` to handle side effects or mimic the lifecycle behavior. (I also have use libraries like rooks to handle lifecycle)
   - Step 5: Remove the `render()` method from the component.

10. **List a few ways styles can be used with components**
    - Inline styles: You can use inline styles directly in your JSX components using the `style` attribute.
    - CSS Modules: With CSS Modules, you can create a separate CSS file for each component and import it into the component file. The CSS class names will be locally scoped to avoid conflicts.
    - Libraries: Bootstrap, Styled-components, Material UI, etc... that have prebuilt styles you can add to components.

11. **How to render an HTML string coming from the server**
    To render an HTML string coming from the server, you should be cautious as it can expose your app to security vulnerabilities like cross-site scripting (XSS) attacks. However, if you have trusted HTML content, you can use the `dangerouslySetInnerHTML` attribute in React.

   Example: Actually, there is an actual `dangerouslySetInnerHTML` usage in my code for this porject, used it to highlight what the user seachs in the card component. You can check the `PersonCard` component as an example.
