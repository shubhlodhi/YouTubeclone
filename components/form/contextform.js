import { createContext } from "react";
// Creating the first context `usercontext` with an initial value

export const usercontext = createContext({
    update:"value",  // The context has a property `update` with an initial value of "value"
 

})
// Creating the first context `usercontext` with an initial value

export const newusercontext = createContext({
    new:false // The context has a property `new` with an initial value of false
}) 