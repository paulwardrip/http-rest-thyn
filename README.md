# http-rest-thyn
Simple GET query:
<pre>
const rest = require("http-rest-thyn");

let endpoint = rest.get("http://website/path/endpoint");
endpoint.query({
    key: "value"
});
endpoint.headers({
    header: "header-value"
)};
endpoint.request((err, body)=>{
    
});
</pre>