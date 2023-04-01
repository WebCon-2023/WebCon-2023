# CSS Documentation

## Introduction

CSS (Cascading Style Sheets) is a style sheet language used to describe the presentation of a document written in HTML or XML. It allows developers to separate the document structure from the presentation, which provides more control over the visual appearance of a web page.

## Selectors

Selectors are used to select the HTML element(s) that you want to style. Here are some examples of selectors:

* *'element'*: selects all elements of a specific type (e.g., *'p'* selects all *'p'* elements).
* *'.class'*: selects all elements with a specific class (e.g., *'.example'* selects all elements with the class *'example'*).
* *'#id'*: selects an element with a specific ID (e.g., *'#header'* selects the element with the ID *'header'*).
* *'[attribute=value]'*: selects elements with a specific attribute and value (e.g., *'[href="https://www.google.com"]'* selects all elements with the href attribute equal to *'https://www.google.com'* ).
  
## Properties

Properties are used to define the style of the selected element(s). Here are some common properties and their values:

* *'color'*: specifies the text color (e.g., *'color: red'*).
* *'background-color'*: specifies the background color (e.g., *'background-color: blue'*).
* *'font-size'*: specifies the font size (e.g., *'font-size: 16px'*).
* *'font-family'*: specifies the font family (e.g., *'font-family: Arial, sans-serif'*).
* *'text-align'*: specifies the text alignment (e.g., *'text-align: center'*).
* *'padding'*: specifies the padding around the element (e.g., *'padding: 10px'*).
* *'margin'*: specifies the margin around the element (e.g., *'margin: 20px'*).
  
## Box Model

The Box Model is a fundamental concept in CSS that defines the layout of an element. It consists of four parts: margin, border, padding, and content.

1. Margin: the space between the element and the outside edge of its container.
2. Border: a line around the element that separates it from its margin.
3. Padding: the space between the element and its border.
4. Content: the actual content of the element (e.g., text or images).

## Units

Units are used to specify the size of an element or a property value. Here are some common units:

* *'px'*: pixels (e.g., *'font-size: 16px'*).
* *'%:'* percentage (e.g., *'width: 50%'*).
* *'em'*: relative to the font-size of the element (e.g., *'font-size: 1.2em'*).
* *'rem'*: relative to the font-size of the root element (e.g., *'font-size: 1.2rem'*).
* *'vw'*: relative to the viewport width (e.g., *'width: 50vw'*).
* *'vh'*: relative to the viewport height (e.g., *'height: 50vh'*).
  
## Media Queries

Media queries are used to apply different styles for different devices or screen sizes. Here's an example of a media query:

```css
Copy code
@media screen and (max-width: 600px) {
  body {
    background-color: yellow;
  }
}
```

This media query applies the style background-color: yellow to the body element when the screen width is less than or equal to 600 pixels.

## Conclusion

CSS is an essential component of web development. It enables designers to style their web pages and make them visually appealing. By understanding the various CSS properties and how they interact with each other, you can create beautiful and responsive layouts. In this documentation, we covered the basics of CSS, including selectors, properties, values, the box model, and more. With this knowledge, you should be able to start writing CSS and customizing your web pages. As you continue to work with CSS, you'll find that there are many more advanced techniques and properties to explore. Keep learning and experimenting to take your web design skills to the next level.
