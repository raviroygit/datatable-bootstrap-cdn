For changing autorefresh timer goto env.js and change autoRefreshInterval variable value. It accepts miliseconds
For changing API URL change baseUrl variable value
For charging apiKey change apiKey variable value


How to add new column in table
1. in HTML file e.g. index.html add new header tag like this
<th class="th-sm">Snoozed</th>
Header value can be anything user defined
See notes/index-html.png

2. In JS file e.g. index.js add new property in columns array like this 
{ id: 9, data: "snoozed" }
the data should have json property key.
See notes/header-json.png