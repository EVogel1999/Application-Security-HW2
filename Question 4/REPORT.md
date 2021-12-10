# Demonstrating the Vulnerability

The vulnerability of XSS comes from a mixture of malicious user input and displaying that input as HTML.  In VueJS, to set a value to the html you have to use the ```v-html``` tag.  This tag sets the html to whatever value the developer wants.  For the client, the insecure code is the following:
```
<p v-html="message.message"></p>
```
By using the write attack string, a malicious user could grab the unsuspecting user's cookies, send them to a forged site, or anything else they might want to do.

## Example

The original site can be seen below.  On the left side it takes user input to save in a database and on the right it displays the messages from the database.

Screenshot:
![Original Site](./img/Screen%20Shot%202021-12-09%20at%205.02.30%20PM.png)

In the XSS vulnerable site, the following script was added in the text field and saved to the database:
```
<img src="url" onerror=window.open('http://localhost:4200')>
```
http://localhost:4200 is the address and port of the forged site created.  Recent security measures has made it difficult to execute direct ```<script>...</script>``` tag code so instead this example executes code when an image fails to load.  When it fails to load a new window is opened.

Note that your browser may block popups and you will need to enable it for localhost to see the vulnerability.

Screenshot:
![Malicious Input](./img/Screen%20Shot%202021-12-09%20at%205.03.26%20PM.png)

As soon as the message saves and the message list is refreshed on screen the user's browser opens up a new window to the forged site.

Screenshot:
![Forged Website](./img/Screen%20Shot%202021-12-09%20at%205.03.34%20PM.png)

# Demonstrating the Fix

To fix this vulnerability, by default the user's data is bound to a string to display rather then the html of the site.  In VueJS this means using the ```{{ ... }}``` operator to display values.  The secure code is the following:

```
<p>{{ message.message }}</p>
```

## Example

As seen in the  screenshot, by using the ```{{ ... }}``` operator, the data saved by the malicious user ends up looking like a string and the code does not execute.

Screenshot:
![XSS Fix](./img/Screen%20Shot%202021-12-09%20at%205.06.15%20PM.png)