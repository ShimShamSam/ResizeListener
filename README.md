# ResizeListener

ResizeListener is a JavaScript library that can detect changes in element size. It's lightweight, super fast, and cross-browser (it even works in IE5).
All changes in size are detected regardless of how they are triggered (CSS changes, content changes, window size changes, etc).
It's completely event-driven, so it doesn't need to constantly poll the DOM for size changes.
Try the [demo](https://shimshamsam.github.io/ResizeListener/).


## Usage

```javascript
var my_element = document.getElementById('my-element');

ResizeListener.add(my_element, function(data) {
	console.log(
		this,
		'Width: '  + data.last_width  + ' -> ' + data.width,
		'Height: ' + data.last_height + ' -> ' + data.height
	);
});
```


## How it works

Hidden elements are appended to the elements you want to monitor. These hidden elements exploit their scrollbar behavior when they change in size and react to the corresponding scroll events. The events are then aggregated and throttled using **requestAnimationFrame** (or **setTimeout** in older browsers) to make a fast and efficient way to listen for changes in element size.


## Limitations

* The elements being monitored are converted to **relative** position if they are **static**.
* Hidden elements are appended to the target element. Wiping these elements out (e.g. by setting innerHTML) will require you to re-add your callbacks.
* Elements that cannot contain children (&lt;img&gt;, &lt;hr&gt;, &lt;input&gt;, etc) will not work. However, you can wrap them in a container element and listen for changes on it instead.


## API


### ResizeListener.add(element, callback)

Adds a callback function to an element to be called when the element changes in size.
The callback is called with **this** being the element itself.
The callback is passed a single argument containing **width**, **height**, **last_width**, and **last_height** properties.

Argument  | Type                             | Description
--------- | ----                             | -----------
element   | HTMLElement &#124; HTMLElement[] | An HTMLElement or array of HTMLElements.
callback  | Function &#124; Function[]       | A callback function or array of callback functions


### ResizeListener.remove(element, [callback])

Removes a callback function from an element.
If no callback is provided, all callbacks are removed from the element.

Argument   | Type                             | Description
---------- | ----                             | -----------
element    | HTMLElement &#124; HTMLElement[] | An HTMLElement or array of HTMLElements.
[callback] | Function &#124; Function[]       | A callback function or array of callback functions
