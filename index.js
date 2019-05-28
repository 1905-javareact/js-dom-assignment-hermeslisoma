// Use the provided index.html
// -----------------------------------------------------------------------------------

// 1. USA
// Define function getUSA()
// Find the html element that contains "USA"
// Print that element's contents.

let getUSA = () => {
    [...document.querySelectorAll('*') ].forEach(v => {
        if(v.innerText === 'USA')
            console.log(v.innerText);
    });   
}

getUSA()

// 2. Sales
// Define function getPeopleInSales()
// Print the names of all the people in the sales department.

let getPeopleInSales = () => {
    [...document.getElementsByClassName('empName')].forEach(e => {     
        if(e.nextElementSibling.innerText === 'Sales')
            console.log(e.innerText)
    });   
}
getPeopleInSales()

// 3. Click Here
// Define function getAnchorChildren()
// Find all anchor elements with a <span> child.
// Print the contents of <span>

let getAnchorChildren = () => {
    [...document.querySelectorAll("a span")].forEach(e => console.log(e.innerText))
}

getAnchorChildren()

// 4. Hobbies
// Define function getHobbies()
// Find all checked options in the 'skills' select element.
// Print the value and the contents.

let getHobbies = () => {    
    [...document.getElementsByName('skills')].forEach(e => {
       [...e.children].forEach(s => {
            if(s.getAttribute('selected') !== null){
                console.log(`${s.getAttribute('selected')} - ${s.innerText}`);              
            }   
       })        
    });    
}

getHobbies()

// 5. Custom Attribute
// Define function getCustomAttribute()
// Find all elements with "data-customAttr" attribute
// Print the value of the attribute.
// Print the element that has the attribute. 

let getCustomAttribute = () => {
    [...document.querySelectorAll('[data-customAttr]')].forEach(e =>
        console.log(`${e.getAttribute('data-customAttr')} - ${e.tagName}`))
    
}

getCustomAttribute()

// 6. Sum Event
// NOTE: Write unobtrusive Javascript
// Regarding these elements:
// 	<input id="num1" class="nums" type="text"/>
// 	<input id="num2" class="nums" type="text"/>
// 	<h3>Sum: <span id="sum"></span></h3>  
// Define onchange event handler.
// Add <input> element values.
// Put the sum in the <span> element.
// If values cannot be added, put "Cannot add" in the <span> element

let sumNumbers = () => {
    [...document.getElementsByClassName('nums')].forEach(n => {
        n.addEventListener('change',() => {
            sumCalc()         
        })       
    }) 
}

let sumCalc = () => {
    let sum = 0;
    [...document.getElementsByClassName('nums')].forEach(v => {
        if(!isNaN(v.value) && v.value.length!=0)
            sum += parseFloat(v.value)
        else sum = 'cannot add'
    })
    document.getElementById('sum').innerText = sum
}

sumNumbers()

// 7. Skills Event
// NOTE: Write unobtrusive Javascript
// When user selects a skill, create an alert with a message similar to:
// 	"Are you sure CSS is one of your skills?"
// NOTE: no alert should appear when user deselects a skill.

let alertSkill = () => {
    [...document.getElementsByTagName('select')].forEach(s => {
        if(s.getAttribute('name') === "skills")
                s.addEventListener('change', () => {
                    alert(`Are you sure ${s.options[s.selectedIndex].text} is one of your skills?`)
                })
    })
}

alertSkill()


// 8. Favorite Color Event
// NOTE: Write unobtrusive Javascript
// NOTE: This is regarding the favoriteColor radio buttons.
// When a user selects a color, create an alert with a message similar to:
// 	"So you like green more than blue now?"
// In this example, green is the new value and blue is the old value.
// Make the background color (of all favoriteColor radio buttons) the newly selected favoriteColor

let alertColor = () => {
    let color = document.getElementsByName('favoriteColor');
    let prev = null;
    [...color].forEach(c => {
        c.addEventListener('change', () => {
            let tmp, msg = ''
            if(prev)
                tmp = prev.value
       
            if(c !== prev)
                prev = c
            
            if(!tmp)
                msg += `So you like ${prev.value} more now?`  
            else msg += `So you like ${prev.value} more than ${tmp} now?`       
            alert(msg);           
            [...color].forEach(ch => {
                let label = document.createElement('label')
                let str = ch.value.substr(0,1).toUpperCase() + ch.value.substr(1)              
                let node = document.createTextNode(str)               
                ch.nextSibling.remove()
                ch.nextElementSibling.innerText = ''
                label.appendChild(node)
                let form = document.getElementById("firstForm")
                form.insertBefore(label, ch.nextElementSibling)
                ch.nextElementSibling.style.backgroundColor = prev.value
            })
        })       
    })  
}

alertColor()

// 9. Show/Hide Event
// NOTE: Write unobtrusive Javascript
// When user hovers over an employees name:
// 	Hide the name if shown.
// 	Show the name if hidden.

let toggleEmployee = () => {   
    [...document.getElementsByClassName('empName')].forEach(e => {
        e.addEventListener('mouseover', () => {
            if(e.style.opacity != 0)
                e.style.opacity = 0
            else e.style.opacity = 1        
        })
    })
}

toggleEmployee()

// 10. Current Time
// Regarding this element:
// 	<h5 id="currentTime"></h5>
// Show the current time in this element in this format: 9:05:23 AM
// The time should be accurate to the second without having to reload the page.

let currentTime = () => {
    let today = new Date()
    let hours = today.getHours()
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()
    let ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12 
    minutes = minutes < 10 ? '0'+minutes : minutes
    seconds = seconds < 10 ? '0'+seconds : seconds
    let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm
    document.getElementById('currentTime').innerText = strTime
    setTimeout(currentTime, 500)
}

currentTime()

// 11. Delay
// Regarding this element:
// 	<p id="helloWorld">Hello, World!</p>
// Three seconds after a user clicks on this element, change the text to a random color.

let randomColor = () => {
    setTimeout(() => {
        let letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }        
        document.getElementById('helloWorld').style.color = color
    },3000)   
}

randomColor()

// 12. Walk the DOM
// Define function walkTheDOM(node, func)
// This function should traverse every node in the DOM. Use recursion.
// On each node, call func(node).
function walkTheDom(node, func){
    func(node)
    node = node.firstChild
    while(node){
        walkTheDom(node, func)
        node = node.nextSibling
    }
}
